'use client';

import { reserveBook, cancelReservation } from "@/lib/actions";
import { useActionState } from "react";
import { BookStatus } from "@/models/book";

type Props = {
    bookId: number;
    isReserved: boolean;
    bookStatus: BookStatus;
};

export default function ReserveButton({ bookId, isReserved: initialIsReserved, bookStatus }: Props) {
    const [, reserveAction, reservePending] = useActionState(reserveBook, null);
    const [, cancelAction, cancelPending] = useActionState(cancelReservation, null);

    const pending = reservePending || cancelPending;

    if (initialIsReserved) {
        return (
            <form action={cancelAction}>
                <input type="hidden" name="bookId" value={bookId} />
                <button
                    type="submit"
                    disabled={pending}
                    className="bg-violet-600 hover:bg-violet-700 text-white py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
                >
                    {cancelPending ? "Cancelling..." : "Cancel Reservation"}
                </button>
            </form>
        );
    }

    return (
        <form action={reserveAction}>
            <input type="hidden" name="bookId" value={bookId} />
            <button
                type="submit"
                disabled={pending || bookStatus !== BookStatus.Available}
                className="bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {reservePending ? "Reserving..." : "Reserve"}
            </button>
        </form>
    );
}
