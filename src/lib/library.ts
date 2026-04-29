import * as fs from "node:fs";
import * as path from "node:path";
import { Book, BookStatus, IBookLogEntry, IBorrowedEntry, ILostEntry, IReturnedEntry, LogLevel } from "@/models/book";
import { User, UserUpdate } from "@/models/user";

export function describeStatus(status: BookStatus): string {
    switch (status) {
        case BookStatus.Available:
            return "Available";
        case BookStatus.CheckedOut:
            return "Checked Out";
        case BookStatus.Reserved:
            return "Reserved";
        case BookStatus.Lost:
            return "Lost";
    }
}

export function isBookAvailable(status: BookStatus): boolean {
    return status === BookStatus.Available;
}

export function canReserveBook(status: BookStatus): boolean {
    return status === BookStatus.Available || status === BookStatus.CheckedOut;
}

export function logAction(entries: IBookLogEntry[], entry: IBookLogEntry): IBookLogEntry[] {
    return [...entries, entry];
}

export function getLogField(entry: IBookLogEntry, key: keyof IBookLogEntry) {
    return entry[key];
}

export const BOOK_LOGS_FILE = path.join(process.cwd(), "src/data/book-logs.json");

export function loadBookLog(): IBookLogEntry[] {
    if (!fs.existsSync(BOOK_LOGS_FILE)) return [];
    const raw = fs.readFileSync(BOOK_LOGS_FILE, "utf-8");
    return raw.trim() ? JSON.parse(raw) : [];
}

export function saveBookLog(books: IBookLogEntry[]): void {
    fs.writeFileSync(BOOK_LOGS_FILE, JSON.stringify(books, null, 2));
}

export function addBookLog(entry: IBookLogEntry): IBookLogEntry {
    const entries = loadBookLog();
    const nextBookId = entries.length > 0 ? Math.max(...entries.map(e => e.entryId)) + 1 : 1;
    const newEntry = { ...entry, entryId: nextBookId } as IBookLogEntry;
    entries.push(newEntry);
    saveBookLog(entries);
    return newEntry;
}

export function updateBookLog(entry: IReturnedEntry): IBookLogEntry {
    const entries = loadBookLog();
    const entryIndex = entries.findIndex(e => e.entryId === entry.entryId);
    if (entryIndex === -1) return entry;
    const updatedEntry = { ...entries[entryIndex], ...entry } as IBookLogEntry;
    entries[entryIndex] = updatedEntry;
    saveBookLog(entries);
    return updatedEntry;
}

export function reserveBook(book: Book, user: User, logEntries: IBookLogEntry[]): { updatedBook: Book, updatedLogEntries: IBookLogEntry[] } {
    if (!canReserveBook(book.status)) {
        throw new Error("Book cannot be reserved");
    }
    const updatedBook = { ...book, status: BookStatus.Reserved };
    const newLogEntry: IBookLogEntry = {
        entryId: logEntries.length > 0 ? Math.max(...logEntries.map(e => e.entryId)) + 1 : 1,
        action: "reserved",
        timestamp: new Date(),
        level: LogLevel.Info,
        message: `${user.firstName} ${user.lastName} reserved the book.`,
        bookId: book.id,
        userId: user.id
    };
    addBookLog(newLogEntry);
    const updatedLogEntries = logAction(logEntries, newLogEntry);
    return { updatedBook, updatedLogEntries };
}

export function checkoutBook(book: Book, user: User, logEntries: IBookLogEntry[]): { updatedBook: Book, updatedLogEntries: IBookLogEntry[] } {
    if (book.status !== BookStatus.Available) {
        throw new Error("Book is not available for checkout");
    }
    const borrowedCount = logEntries.filter(e => e.userId === user.id && e.action === 'borrowed').length;
    const returnedCount = logEntries.filter(e => e.userId === user.id && e.action === 'returned').length;
    if (borrowedCount - returnedCount >= 3) {
        throw new Error("You cannot check out more than 3 books at a time, please return some books before checking out more.");
    }
    const updatedBook = { ...book, status: BookStatus.CheckedOut };
    const newLogEntry: IBorrowedEntry = {
        entryId: logEntries.length > 0 ? Math.max(...logEntries.map(e => e.entryId)) + 1 : 1,
        action: "borrowed",
        dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
        timestamp: new Date(),
        level: LogLevel.Info,
        message: `${user.firstName} ${user.lastName} borrowed the book.`,
        bookId: book.id,
        userId: user.id
    };
    addBookLog(newLogEntry);
    const updatedLogEntries = logAction(logEntries, newLogEntry);
    return { updatedBook, updatedLogEntries };
}

export function returnBook(book: Book, user: User, logEntries: IBookLogEntry[], rating: number): { updatedBook: Book, updatedLogEntries: IBookLogEntry[] } {
    if (book.status !== BookStatus.CheckedOut) {
        throw new Error("Book is not currently checked out");
    }
    const updatedBook = { ...book, status: BookStatus.Available, rating };
    const newLogEntry: IReturnedEntry = {
        entryId: logEntries.length > 0 ? Math.max(...logEntries.map(e => e.entryId)) + 1 : 1,
        action: "returned",
        returnedDate: new Date(),
        timestamp: new Date(),
        level: LogLevel.Info,
        message: `${user.firstName} ${user.lastName} returned the book.`,
        bookId: book.id,
        userId: user.id
    };
    addBookLog(newLogEntry);
    const updatedLogEntries = logAction(logEntries, newLogEntry);
    return { updatedBook, updatedLogEntries };
}

export function reportLostBook(book: Book, user: User, logEntries: IBookLogEntry[]): { updatedBook: Book, updatedLogEntries: IBookLogEntry[] } {
    if (book.status !== BookStatus.CheckedOut) {
        throw new Error("Book is not currently checked out");
    }
    const updatedBook = { ...book, status: BookStatus.Lost };
    const newLogEntry: ILostEntry = {
        entryId: logEntries.length > 0 ? Math.max(...logEntries.map(e => e.entryId)) + 1 : 1,
        action: "lost",
        timestamp: new Date(),
        level: LogLevel.Warning,
        message: `${user.firstName} ${user.lastName} reported the book as lost.`,
        bookId: book.id,
        userId: user.id,
        reportedDate: new Date(),
        fee: book.lateFee
    };
    updateUser(user.id, { debtOwed: (user.debtOwed ?? 0) + newLogEntry.fee });
    addBookLog(newLogEntry);
    const updatedLogEntries = logAction(logEntries, newLogEntry);
    return { updatedBook, updatedLogEntries };
}

export const USERS_FILE = path.join(process.cwd(), "src/data/users.json");

export function loadUsers(): User[] {
    if (!fs.existsSync(USERS_FILE)) return [];
    const raw = fs.readFileSync(USERS_FILE, "utf-8");
    return raw.trim() ? JSON.parse(raw) : [];
}

export function saveUsers(users: User[]): void {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

export function updateUser(id: number, updates: UserUpdate): User | null {
    const users = loadUsers();
    const userIndex = users.findIndex(u => u.id === id);
    if (userIndex === -1) return null;
    const updatedUser = { ...users[userIndex], ...updates } as User;
    users[userIndex] = updatedUser;
    saveUsers(users);
    return updatedUser;
}
