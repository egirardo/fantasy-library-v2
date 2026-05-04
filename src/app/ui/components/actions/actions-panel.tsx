import { type SessionUser } from "@/lib/session";
import SaveButton from "./save-button";
import BorrowButton from "./borrow-button";
import Link from "next/link";
import { BookStatus } from "@/models/book";
import { getBookById } from "@/lib/books";
import { describeStatus, loadBookLog } from "@/lib/library";
import ReserveButton from "./reserve-button";

const statusColors: Record<BookStatus, string> = {
    [BookStatus.Available]: "text-green-400",
    [BookStatus.CheckedOut]: "text-orange-400",
    [BookStatus.Reserved]: "text-yellow-400",
    [BookStatus.Lost]: "text-white",
};

type Props = {
    bookId: number;
    initialSaved: boolean;
    session: SessionUser | null;
};

const loginMessage = (
    <p className="text-sm text-zinc-400 italic">
        <Link href="/login" className="text-blue-400 hover:underline">Login</Link> to save, reserve, or borrow this book
    </p>
);

export default async function ActionsPanel({ bookId, initialSaved, session }: Props) {
    const book = await getBookById(JSON.stringify(bookId));
    // Borrow/reserve state is derived from the log rather than stored on the user —
    // a book is currently borrowed/reserved if the user has more "borrowed"/"reserved"
    // entries than "returned"/"cancelled" entries for it.
    const logs = session ? loadBookLog() : [];
    const isBorrowed = session
        ? logs.filter(e => e.userId === session.id && e.bookId === bookId && e.action === "borrowed").length >
          logs.filter(e => e.userId === session.id && e.bookId === bookId && e.action === "returned").length
        : false;
    const isReserved = session
        ? logs.filter(e => e.userId === session.id && e.bookId === bookId && e.action === "reserved").length >
          logs.filter(e => e.userId === session.id && e.bookId === bookId && e.action === "cancelled").length
        : false;
    return (
        <div className="bg-background/80 backdrop-blur-sm p-5 rounded-2xl border border-blue-700/50 w-full max-w-lg flex flex-col items-center justify-center self-center gap-4">
            <>
                <h2 className="text-lg font-bold text-blue-300 tracking-wide">Availability: <span className={statusColors[book.status]}>{describeStatus(book.status)}</span></h2>
            </>
            {session ? (
                <div className="flex items-center justify-center gap-4">
                <SaveButton bookId={bookId} initialSaved={initialSaved} />
                <BorrowButton bookId={bookId} isBorrowed={isBorrowed} bookStatus={book.status} isReservedByCurrentUser={isReserved} />
                <ReserveButton bookId={bookId} isReserved={isReserved} bookStatus={book.status} />
                </div>
            ) : (
                loginMessage
            )}
        </div>
    );
}
