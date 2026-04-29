import { Book } from "@/models/book";
import { getBooks } from "@/lib/books";
import BookListCard from "./book-list-card";


export default async function BookList() {

    const data: Book[] = await getBooks();

    if (data.length === 0) {
        return <div className="text-red-500">Failed to load books</div>;
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
                    <BookListCard key={book.id} book={book} />
                ))}
            </div>
        </div>
    )
}
