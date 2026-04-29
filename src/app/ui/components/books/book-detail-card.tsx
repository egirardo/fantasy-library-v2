import { getBookById } from "@/lib/books";
import { getSession } from "@/lib/session";
import { loadUsers } from "@/lib/library";
import BookCoverImage from "./book-cover-image";
import ActionsPanel from "./actions-panel";
import Link from "next/link";
import SwordBackground from "../sword-background";

type Props = { params: Promise<{id: string}> };

export default async function BookDetailCard({ params }: Props) {
    const {id} = await params;

    const [book, session] = await Promise.all([getBookById(id), getSession()]);

    const initialSaved = session
        ? (loadUsers().find(u => u.id === session.id)?.savedBooks ?? []).includes(book.id)
        : false;

    return (
        <SwordBackground className="flex-row items-center justify-center p-15">
            <BookCoverImage src={book.cover} alt={book.title} />
            <div className="flex flex-col items-start justify-center p-15 max-w-2xl">
                <h1
                    className="text-3xl text-blue-300 font-bold mb-2 tracking-wide"
                    style={{ fontFamily: "var(--font-cinzel-decorative)" }}
                >
                    {book.title}
                </h1>
                <div className="w-16 h-0.5 bg-blue-500 mb-4" />
                <p className="mb-1"><strong className="text-sky-300">Author:</strong> {book.author}</p>
                <p className="mb-1"><strong className="text-sky-300">Year:</strong> {book.year}</p>
                <p className="mb-4"><strong className="text-sky-300">Description:</strong> {book.description}</p>
                <ActionsPanel bookId={book.id} initialSaved={initialSaved} session={session} />
                <Link href="/books" className="self-center mt-2">
                    <button className="px-6 py-2 bg-blue-700 text-white border border-blue-500 rounded hover:bg-blue-600 tracking-wider transition-colors" style={{ fontFamily: "var(--font-crimson)" }}>
                        ← Back to Catalog
                    </button>
                </Link>
            </div>
        </SwordBackground>
    );
}
