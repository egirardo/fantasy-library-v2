import { Book } from "@/models/book";
import { User } from "@/models/user";
import { notFound } from "next/navigation";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { loadBookLog } from "./library";

export async function getBooks(): Promise<Book[]> {
    const path = join(process.cwd(), 'src', 'data', 'books.json');
    const data = await readFile(path, 'utf-8');

    const parsed: Book[] = JSON.parse(data);

    return parsed;
}

export async function getBookById(id: string): Promise<Book> {
    const books = await getBooks();
    const book = books.find((book) => String(book.id) === id);

    if (!book) {
        notFound();
    }
    return book;
}

export async function getSavedBooks(): Promise<Book[]> {
    const path = join(process.cwd(), 'src', 'data', 'users.json');
    const data = await readFile(path, 'utf-8');
    const parsed = JSON.parse(data);
    const savedBookIds = parsed.flatMap((user: User) => user.savedBooks);
    const books = await getBooks();
    return books.filter((book) => savedBookIds.includes(book.id));
}

// Derives currently-borrowed books from the log rather than a field on the user model,
// keeping the log as the single source of truth for all borrow/return history.
export async function getBorrowedBooks(userId: number): Promise<Book[]> {
    const logs = await loadBookLog();
    
    const returnedBookIds = new Set(
        logs
            .filter((e) => e.userId === userId && e.action === "returned")
            .map((e) => e.bookId)
    );

    const borrowedBookIds = logs
        .filter((e) => e.userId === userId && e.action === "borrowed" && !returnedBookIds.has(e.bookId))
        .map((e) => e.bookId);

    const books = await getBooks();
    return books.filter((book) => borrowedBookIds.includes(book.id));
}

// these functions take away the need to use API or routes files
