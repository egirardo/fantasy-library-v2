import { getBorrowedBooks } from "@/lib/books";
import { loadUsers } from "@/lib/library";
import { getSession } from "@/lib/session";
import { Book } from "@/models/book";
import BookListCard from "../books/book-list-card";

export default async function BorrowedBooks() {
    const session = await getSession();
        let savedBookIds: number[] = [];
        if (session) {
            const users = loadUsers();
            const user = users.find(u => u.id === session.id);
            savedBookIds = user?.savedBooks ?? [];
        }

    const data: Book[] = await getBorrowedBooks(session?.id ?? -1);

    if (data.length === 0) {
        return <div className="text-gray-400">You have no borrowed books.</div>;
    }
    return (
        <div className="flex flex-col flex-1 items-center font-sans py-0 px-5 w-full">
            <h1
                className="text-4xl font-bold mb-2 text-blue-300 tracking-widest"
                style={{ fontFamily: "var(--font-cinzel-decorative)" }}
            >
                Borrowed Books
            </h1>
            <div className="w-24 h-0.5 bg-blue-500 mb-8" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 w-full">
                {data.map((book: Book) => (
                    <BookListCard key={book.id} book={book} initialSaved={savedBookIds.includes(book.id)} />
                ))}
            </div>
        </div>
    )   
}