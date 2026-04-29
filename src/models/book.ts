export interface Book {
    id: number,
    title: string,
    author: string,
    year: number,
    description: string,
    rating?: number,
    cover: string,
    loanDays: number,
    lateFee: number,
    status: BookStatus
};


export enum LogLevel {
  Info = "INFO",
  Warning = "WARNING",
  Error = "ERROR",
}

export interface ILogEntry {
    entryId: number
    timestamp: Date
    level: LogLevel
    message: string
    bookId: number
    userId: number
}

export interface IBookLogEntry extends ILogEntry {
    action: "borrowed" | "returned" | "lost" | "reserved";
}

export interface IBorrowedEntry extends IBookLogEntry {
    dueDate: Date;
}

export interface IReturnedEntry extends IBookLogEntry {
    returnedDate: Date;
}

export interface ILostEntry extends IBookLogEntry {
    reportedDate: Date;
    fee: number;
}

export enum BookStatus {
    Available = "AVAILABLE",
    CheckedOut = "CHECKED_OUT",
    Reserved = "RESERVED",
    Lost = "LOST"
}
