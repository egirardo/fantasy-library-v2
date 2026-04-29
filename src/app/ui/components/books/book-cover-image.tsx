'use client';

import Image from "next/image";
import { useState } from "react";

type Props = { src: string; alt: string };

export default function BookCoverImage({ src, alt }: Props) {
    const [loaded, setLoaded] = useState(false);
    const [errored, setErrored] = useState(false);

    if (errored) {
        return (
            <div className="relative w-50 h-75 rounded mb-4 overflow-hidden bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center">
                <span className="text-zinc-400 text-sm text-center px-2">No cover available</span>
            </div>
        );
    }

    return (
        <div className="relative w-50 h-75 rounded mb-4 overflow-hidden">
            {!loaded && (
                <div className="absolute inset-0 bg-zinc-200 dark:bg-zinc-700 animate-pulse rounded" />
            )}
            <Image
                src={src}
                alt={alt}
                fill
                loading="eager"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className={`object-cover transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
                onLoad={() => setLoaded(true)}
                onError={() => setErrored(true)}
            />
        </div>
    );
}
