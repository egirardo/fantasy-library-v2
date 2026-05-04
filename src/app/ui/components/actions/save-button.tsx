"use client";

import { saveBook } from "@/lib/actions";
import { startTransition, useActionState } from "react";

type Props = { bookId: number; initialSaved: boolean };

export default function SaveButton({ bookId, initialSaved }: Props) {
    const saveBookWithId = saveBook.bind(null, bookId);
    const [saved, action, pending] = useActionState(saveBookWithId, initialSaved);

    return (
        <button
            onClick={() => startTransition(action)}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
        >
            {pending ? "Saving..." : saved ? "Saved ✓" : "Save"}
        </button>
    );
}
