'use client';

import { borrowBook, returnBook } from "@/lib/actions";
import { useActionState } from "react";

type Props = {
    bookId: number;
    isBorrowed: boolean;
};

export default function BorrowButton({ bookId, isBorrowed: initialIsBorrowed }: Props) {
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
                disabled={pending}
                className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
            >
                {pending ? "Borrowing..." : "Borrow"}
            </button>
        </form>
    );
}
