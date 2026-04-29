import { Book } from "@/models/book";
import { notFound } from "next/navigation";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

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

// these functions take away the need to use API or routes files
