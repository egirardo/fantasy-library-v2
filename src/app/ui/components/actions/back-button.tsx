'use client';

import { useRouter } from "next/navigation";

export default function BackButton() {
    const router = useRouter();

    return (
        <button
            onClick={() => router.back()}
            className="px-6 py-2 bg-blue-700 text-white border border-blue-500 rounded hover:bg-blue-600 tracking-wider transition-colors"
            style={{ fontFamily: "var(--font-crimson)" }}
        >
            ← Back
        </button>
    );
}
