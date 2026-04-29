import { Suspense } from "react";
import BookList from "../ui/components/books/book-list";
import DismissibleBanner from "../ui/components/dismissible-banner";
import SwordBackground from "../ui/components/sword-background";

export default async function BookListPage({ searchParams }: { searchParams: Promise<{ message?: string }> }) {
    const { message } = await searchParams;

    return (
        <SwordBackground className="flex-col">
            {message && <DismissibleBanner message={message} />}
            <Suspense fallback={<div className="text-center w-full h-lvh p-5 justify-center align-items-center">Loading Catalog...</div>}>
                <BookList />
            </Suspense>
        </SwordBackground>
    );
}