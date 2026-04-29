import { Book } from "@/models/book";
import { getBooks } from "@/lib/books";
import BookListCard from "./book-list-card";
import { getSession } from "@/lib/session";
import { loadUsers } from "@/lib/library";

export default async function BookList() {
    const data: Book[] = await getBooks();

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
        <div className="flex flex-col flex-1 items-center font-sans py-10 px-5">
            <h1
                className="text-4xl font-bold mb-2 text-blue-300 tracking-widest"
                style={{ fontFamily: "var(--font-cinzel-decorative)" }}
            >
                Library Catalog
            </h1>
            <div className="w-24 h-0.5 bg-blue-500 mb-8" />
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5">
                {data.map((book: Book) => (
                    <BookListCard key={book.id} book={book} initialSaved={savedBooks.includes(book.id)} />
                ))}
            </div>
        </div>
    )
}
