'use client';

import { borrowBook } from "@/lib/actions";
import { useActionState } from "react";

export default function BorrowButton({ bookId }: { bookId: number }) {
    const [state, action, pending] = useActionState(borrowBook, null);

    return (
        <form action={action} className="flex flex-col items-center gap-2">
            <input type="hidden" name="bookId" value={bookId} />
            {state && (
                <p className={`text-sm ${state.success ? "text-green-400" : "text-red-400"}`}>
                    {state.message}
                </p>
            )}
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
