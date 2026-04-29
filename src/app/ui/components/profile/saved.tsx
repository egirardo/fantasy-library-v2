import { Book } from "@/models/book";
import BookListCard from "../books/book-list-card";
import { getSavedBooks } from "@/lib/books";
import { getSession } from "@/lib/session";
import { loadUsers } from "@/lib/library";

export default async function Saved() {

    const data: Book[] = await getSavedBooks();
    
    if (data.length === 0) {
        return <div className="text-red-500">Failed to load books</div>;
    }
    const session = await getSession();
        let savedBooks: number[] = [];
        if (session) {
            const users = loadUsers();
            const user = users.find(u => u.id === session.id);
            savedBooks = user?.savedBooks ?? [];
        }
    return (
        <div className="flex flex-col flex-1 items-center font-sans py-0 px-5 w-full">
            <h1
                className="text-4xl font-bold mb-2 text-blue-300 tracking-widest"
                style={{ fontFamily: "var(--font-cinzel-decorative)" }}
            >
                Saved Books
            </h1>
            <div className="w-24 h-0.5 bg-blue-500 mb-8" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 w-full">
                {data.map((book: Book) => (
                    <BookListCard key={book.id} book={book} initialSaved={savedBooks.includes(book.id)} />
                ))}
            </div>
        </div>
    )   
} 