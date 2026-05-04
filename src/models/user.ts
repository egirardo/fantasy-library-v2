export type User = {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    debtOwed?: number,
    savedBooks?: number[],
}

export type NewUser = Omit<User, 'id'>;

export type UserUpdate = Partial<User>;

// Runtime view type only — not persisted to users.json.
// Constructed by joining User with their current borrow history from book-logs.
export interface UserLog extends User {
    borrowedBooks: {bookId: number, dueDate: string, borrowedDate: string}[],
    debtOwed: number,
};