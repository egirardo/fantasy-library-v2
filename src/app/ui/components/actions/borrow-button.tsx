'use client';

import { borrowBook, returnBook } from "@/lib/actions";
import { useActionState } from "react";
import { BookStatus } from "@/models/book";

type Props = {
    bookId: number;
    isBorrowed: boolean;
    bookStatus: BookStatus;
    isReservedByCurrentUser: boolean;
};

export default function BorrowButton({ bookId, isBorrowed: initialIsBorrowed, bookStatus, isReservedByCurrentUser }: Props) {
    const [, borrowAction, borrowPending] = useActionState(borrowBook, null);
    const [, returnAction, returnPending] = useActionState(returnBook, null);

    const pending = borrowPending || returnPending;

    if (initialIsBorrowed) {
        return (
            <form action={returnAction}>
                <input type="hidden" name="bookId" value={bookId} />
                <button
                    type="submit"
                    disabled={pending}
                    className="bg-violet-600 hover:bg-violet-700 text-white py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
                >
                    {returnPending ? "Returning..." : "Return"}
                </button>
            </form>
        );
    }

    return (
        <form action={borrowAction}>
            <input type="hidden" name="bookId" value={bookId} />
            <button
                type="submit"
                disabled={pending || (bookStatus !== BookStatus.Available && !(bookStatus === BookStatus.Reserved && isReservedByCurrentUser))}
                className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {borrowPending ? "Borrowing..." : "Borrow"}
            </button>
        </form>
    );
}
