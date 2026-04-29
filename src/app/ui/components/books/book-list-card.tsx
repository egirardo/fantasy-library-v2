'use client';

import { Book } from "@/models/book";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function BookListCard({ book }: { book: Book }) {
    const [errored, setErrored] = useState(false);

    return (
        <Link
            href={`/books/${book.id}`}
            className="block w-full bg-surface border border-blue-900/50 rounded-lg shadow-md p-4 hover:shadow-xl hover:border-blue-500 hover:bg-surface-hover transition-all"
        >
            <div className="relative h-75 mb-4">
                {errored ? (
                    <div className="absolute inset-0 bg-zinc-200 dark:bg-zinc-700 rounded flex items-center justify-center">
                        <span className="text-zinc-400 text-xs text-center px-2">No cover</span>
                    </div>
                ) : (
                    <Image
                        src={book.cover}
                        alt={book.title}
                        fill
                        sizes="(max-width: 768px) 50vw, 20vw"
                        className="object-contain rounded"
                        loading="eager"
                        onError={() => setErrored(true)}
                    />
                )}
            </div>
            <div className="grid grid-cols-3 grid-rows-2 items-end">
                <h2
                    className="text-base font-semibold text-blue-300 col-span-3 row-start-1 line-clamp-1"
                    style={{ fontFamily: "var(--font-cinzel-decorative)" }}
                >
                    {book.title}
                </h2>
                <p className="text-blue-200 text-sm col-start-1 row-start-2 col-span-2 line-clamp-1">{book.author}</p>
                {book.rating && (
                    <p className="text-indigo-300 font-semibold text-sm col-start-3 row-start-2 text-right self-end">★ {book.rating}</p>
                )}
            </div>
        </Link>
    );
}
