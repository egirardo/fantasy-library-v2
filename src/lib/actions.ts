"use server";
import * as path from "node:path";
import { readFile, writeFile } from "fs/promises";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { Book, BookStatus } from "@/models/book";
import { User } from "@/models/user";
import { redirect } from "next/navigation";
import { loadBookLog, checkoutBook, returnBook as libraryReturnBook } from "@/lib/library";
import { getSession } from "@/lib/session";

export type BorrowBookState = { success: boolean; message: string } | null;
export async function borrowBook(_prevState: BorrowBookState, formData: FormData): Promise<BorrowBookState> {
    try {
        const cookieStore = await cookies();
        const sessionCookie = cookieStore.get("session");
        if (!sessionCookie) {
            return { success: false, message: "You must be logged in to borrow a book." };
        }
        const sessionUser = JSON.parse(sessionCookie.value);

        const usersFilePath = path.join(process.cwd(), "src/data/users.json");
        const usersData = await readFile(usersFilePath, "utf-8");
        const users: User[] = JSON.parse(usersData);
        const user = users.find(u => u.id === sessionUser.id);
        if (!user) {
            return { success: false, message: "User not found." };
        }

        const booksFilePath = path.join(process.cwd(), "src/data/books.json");
        const booksData = await readFile(booksFilePath, "utf-8");
        const books: Book[] = JSON.parse(booksData);

        const bookId = parseInt(formData.get("bookId") as string);
        const book = books.find(b => b.id === bookId);
        if (!book) {
            return { success: false, message: "Book not found." };
        }

        const logEntries = loadBookLog();
        const { updatedBook } = checkoutBook(book, user, logEntries);

        const updatedBooks = books.map(b => b.id === updatedBook.id ? updatedBook : b);
        await writeFile(booksFilePath, JSON.stringify(updatedBooks, null, 2), "utf-8");

        revalidatePath("/books");

        return { success: true, message: `You have borrowed "${book.title}".` };
    } catch (e) {
        const message = e instanceof Error ? e.message : "Something went wrong. Please try again.";
        return { success: false, message };
    }
}

export type ReturnBookState = { success: boolean; message: string } | null;
export async function returnBook(_prevState: ReturnBookState, formData: FormData): Promise<ReturnBookState> {
    try {
        const cookieStore = await cookies();
        const sessionCookie = cookieStore.get("session");
        if (!sessionCookie) {
            return { success: false, message: "You must be logged in to return a book." };
        }
        const sessionUser = JSON.parse(sessionCookie.value);

        const usersFilePath = path.join(process.cwd(), "src/data/users.json");
        const usersData = await readFile(usersFilePath, "utf-8");
        const users: User[] = JSON.parse(usersData);
        const user = users.find(u => u.id === sessionUser.id);
        if (!user) {
            return { success: false, message: "User not found." };
        }

        const booksFilePath = path.join(process.cwd(), "src/data/books.json");
        const booksData = await readFile(booksFilePath, "utf-8");
        const books: Book[] = JSON.parse(booksData);

        const bookId = parseInt(formData.get("bookId") as string);
        const book = books.find(b => b.id === bookId);
        if (!book) {
            return { success: false, message: "Book not found." };
        }

        const logEntries = loadBookLog();
        const { updatedBook } = libraryReturnBook(book, user, logEntries, book.rating ?? 0);

        const updatedBooks = books.map(b => b.id === updatedBook.id ? updatedBook : b);
        await writeFile(booksFilePath, JSON.stringify(updatedBooks, null, 2), "utf-8");

        revalidatePath("/books");

        return { success: true, message: `You have returned "${book.title}".` };
    } catch (e) {
        const message = e instanceof Error ? e.message : "Something went wrong. Please try again.";
        return { success: false, message };
    }
}

export async function saveBook(bookId: number, prevState: boolean): Promise<boolean> {
    try {
        const session = await getSession();
        if (!session) return prevState;

        const filePath = path.join(process.cwd(), "src/data/users.json");
        const data = await readFile(filePath, "utf-8");
        const users: User[] = JSON.parse(data);

        const user = users.find(u => u.id === session.id);
        if (!user) return prevState;

        const saved = user.savedBooks ?? [];
        const alreadySaved = saved.includes(bookId);
        const updatedSaved = alreadySaved
            ? saved.filter(id => id !== bookId)
            : [...saved, bookId];

        const updatedUsers = users.map(u =>
            u.id === user.id ? { ...u, savedBooks: updatedSaved } : u
        );
        await writeFile(filePath, JSON.stringify(updatedUsers, null, 2), "utf-8");

        revalidatePath("/profile");
        return !alreadySaved;
    } catch {
        return prevState;
    }
}

export type AddBookState = { success: boolean; message: string } | null;
export async function addBook(_prevState: AddBookState, formData: FormData): Promise<AddBookState> {
    try {
        const filePath = path.join(process.cwd(), "src/data/books.json");

        const data = await readFile(filePath, "utf-8");
        const books: Book[] = JSON.parse(data);

        const newBook: Book = {
            id: books.length + 1,
            title: formData.get("title") as string,
            author: formData.get("author") as string,
            year: parseInt(formData.get("year") as string),
            description: formData.get("description") as string,
            rating: parseFloat(formData.get("rating") as string),
            cover: formData.get("cover") as string,
            loanDays: parseInt(formData.get("loanDays") as string),
            lateFee: parseFloat(formData.get("lateFee") as string),
            status: BookStatus.Available
        };

        books.push(newBook);

        await writeFile(filePath, JSON.stringify(books, null, 2), "utf-8");

        revalidatePath("/books");

        return { success: true, message: `"${newBook.title}" has been added to the library.` };
    } catch {
        return { success: false, message: "Something went wrong. Please try again." };
    }
}

export type RegisterUserState = { success: boolean; message: string } | null;
export async function registerUser(_prevState: RegisterUserState, formData: FormData): Promise<RegisterUserState> {
    try {
        const filePath = path.join(process.cwd(), "src/data/users.json");

        const data = await readFile(filePath, "utf-8");
        const users: User[] = JSON.parse(data);

        const hashedPassword = await bcrypt.hash(formData.get("password") as string, 10);

        const newUser: User = {
            id: users.length + 1,
            firstName: formData.get("firstName") as string,
            lastName: formData.get("lastName") as string,
            email: formData.get("email") as string,
            password: hashedPassword,
        };

        users.push(newUser);

        await writeFile(filePath, JSON.stringify(users, null, 2), "utf-8");

        revalidatePath("/register");

        return { success: true, message: `User "${newUser.firstName}" has been registered successfully.` };
    } catch (e) {
        console.log(e);
        return { success: false, message: "Something went wrong. Please try again." };
    }
}

export type LoginUserState = { success: boolean; message: string } | null;
export async function loginUser(_prevState: LoginUserState, formData: FormData): Promise<LoginUserState> {
    let redirectUrl: string | null = null;

    try {
        const filePath = path.join(process.cwd(), "src/data/users.json");

        const data = await readFile(filePath, "utf-8");
        const users: User[] = JSON.parse(data);

        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        const user = users.find(u => u.email === email);

        if (!user) {
            return { success: false, message: "Invalid email or password." };
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return { success: false, message: "Invalid email or password." };
        }

        const cookieStore = await cookies();
        cookieStore.set("session", JSON.stringify({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
        }), { httpOnly: true, path: "/" });

        redirectUrl = `/books?message=${encodeURIComponent(`Welcome back, ${user.firstName}!`)}`;

    } catch {
        return { success: false, message: "Something went wrong. Please try again." };
    }

    if (redirectUrl) redirect(redirectUrl);
    return null;
}

export async function logoutUser() {
    const cookieStore = await cookies();
    cookieStore.delete("session");
    redirect("/login");
}
