'use client';

import { borrowBook, returnBook } from "@/lib/actions";
import { useActionState } from "react";
import { BookStatus } from "@/models/book";

type Props = {
    bookId: number;
    isBorrowed: boolean;
    bookStatus: BookStatus;
};

export default function BorrowButton({ bookId, isBorrowed: initialIsBorrowed, bookStatus }: Props) {
    const [borrowState, borrowAction, borrowPending] = useActionState(borrowBook, null);
    const [returnState, returnAction, returnPending] = useActionState(returnBook, null);

    const isBorrowed = borrowState?.success ? true : returnState?.success ? false : initialIsBorrowed;
    const pending = borrowPending || returnPending;

    if (isBorrowed) {
        return (
            <form action={returnAction}>
                <input type="hidden" name="bookId" value={bookId} />
                <button
                    type="submit"
                    disabled={pending}
                    className="bg-violet-600 hover:bg-violet-700 text-white py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
                >
                    {pending ? "Returning..." : "Return"}
                </button>
            </form>
        );
    }

    return (
        <form action={borrowAction}>
            <input type="hidden" name="bookId" value={bookId} />
            <button
                type="submit"
                disabled={pending || bookStatus !== BookStatus.Available}
                className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {pending ? "Borrowing..." : "Borrow"}
            </button>
        </form>
    );
}
