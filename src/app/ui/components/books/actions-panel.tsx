import { type SessionUser } from "@/lib/session";
import SaveButton from "../save-button";
import BorrowButton from "./borrow-button";
import Link from "next/link";

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

export default function ActionsPanel({ bookId, initialSaved, session }: Props) {
    return (
        <div className="bg-background/80 backdrop-blur-sm p-5 rounded-2xl border border-blue-700/50 w-full max-w-lg flex items-center justify-center self-center gap-4">
            {session ? (
                <>
                <SaveButton bookId={bookId} initialSaved={initialSaved} />
                <BorrowButton bookId={bookId} />
                <button className="bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded-lg transition-colors">
                    Reserve
                </button>
                </>
            ) : (
                loginMessage
            )}
        </div>
    );
}
