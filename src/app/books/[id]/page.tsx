import BookDetailCard from "@/app/ui/components/books/book-detail-card";
import { Suspense } from "react";

type Props = { params: Promise<{id: string}> };

export default async function BookDetailPage({ params }: Props) {

    return (
        <Suspense fallback={<div className="text-center w-full h-lvh p-5 justify-center align-items-center">Loading Book Details...</div>}>
            <BookDetailCard params={params} />
        </Suspense>
    );
}