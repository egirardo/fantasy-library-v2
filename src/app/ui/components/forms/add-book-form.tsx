"use client";

import { useActionState } from "react";
import { addBook } from "@/lib/actions";
import SwordBackground from "../sword-background";

export default function AddBookForm() {
    const [state, formAction] = useActionState(addBook, null);

    const inputClass = "bg-surface border border-blue-900/50 rounded px-3 py-1.5 text-slate-200 focus:outline-none focus:border-blue-500 transition-colors";
    const labelClass = "text-sky-300 text-sm tracking-wide";

    return (
        <SwordBackground className="flex-col items-center justify-center p-10">
            <div className="bg-background/80 backdrop-blur-sm p-10 rounded-2xl border border-blue-700/50 w-full max-w-lg">
                <h1
                    className="text-2xl font-bold text-blue-300 tracking-widest text-center mb-2"
                    style={{ fontFamily: "var(--font-cinzel-decorative)" }}
                >
                    Add a Book
                </h1>
                <div className="w-24 h-0.5 bg-blue-500 mx-auto mb-6" />

                {state && (
                    <p className={`text-center text-sm mb-4 ${state.success ? "text-green-400" : "text-red-400"}`}>
                        {state.message}
                    </p>
                )}

                <form action={formAction} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="title" className={labelClass}>Title</label>
                        <input type="text" id="title" name="title" className={inputClass} />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="author" className={labelClass}>Author</label>
                        <input type="text" id="author" name="author" className={inputClass} />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1">
                            <label htmlFor="year" className={labelClass}>Year</label>
                            <input type="number" id="year" name="year" className={inputClass} />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="rating" className={labelClass}>Rating</label>
                            <input type="number" id="rating" name="rating" step="0.1" min="0" max="5" className={inputClass} />
                        </div>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="description" className={labelClass}>Description</label>
                        <input type="text" id="description" name="description" className={inputClass} />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="cover" className={labelClass}>Cover URL</label>
                        <input type="text" id="cover" name="cover" className={inputClass} />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1">
                            <label htmlFor="loanDays" className={labelClass}>Loan Days</label>
                            <input type="number" id="loanDays" name="loanDays" className={inputClass} />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="lateFee" className={labelClass}>Late Fee</label>
                            <input type="number" id="lateFee" name="lateFee" step="0.01" min="0" className={inputClass} />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="mt-2 px-6 py-2 bg-blue-700 text-white border border-blue-500 rounded hover:bg-blue-600 tracking-wider transition-colors self-center"
                        style={{ fontFamily: "var(--font-crimson)" }}
                    >
                        Add Book
                    </button>
                </form>
            </div>
        </SwordBackground>
    );
}
