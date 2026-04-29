"use client";

import { useActionState } from "react";
import { registerUser } from "@/lib/actions";
import Link from "next/link";
import SwordBackground from "../sword-background";

export default function RegistrationForm() {
    const [state, formAction] = useActionState(registerUser, null);

    const inputClass = "bg-surface border border-blue-900/50 rounded px-3 py-1.5 text-slate-200 focus:outline-none focus:border-blue-500 transition-colors";
    const labelClass = "text-sky-300 text-sm tracking-wide";

    return (
        <SwordBackground className="flex-col items-center justify-center p-10">
            <div className="bg-background/80 backdrop-blur-sm p-10 rounded-2xl border border-blue-700/50 w-full max-w-lg">
                <h1
                    className="text-2xl font-bold text-blue-300 tracking-widest text-center mb-2"
                    style={{ fontFamily: "var(--font-cinzel-decorative)" }}
                >
                    Registration
                </h1>
                <div className="w-24 h-0.5 bg-blue-500 mx-auto mb-6" />

                {state && (
                    <p className={`text-center text-sm mb-4 ${state.success ? "text-green-400" : "text-red-400"}`}>
                        {state.message}
                    </p>
                )}

                <form action={formAction} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="firstName" className={labelClass}>First Name</label>
                        <input type="text" id="firstName" name="firstName" className={inputClass} placeholder="Enter your first name" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="lastName" className={labelClass}>Last Name</label>
                        <input type="text" id="lastName" name="lastName" className={inputClass} placeholder="Enter your last name" />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="email" className={labelClass}>Email</label>
                        <input type="email" id="email" name="email" className={inputClass} placeholder="Enter your email" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="password" className={labelClass}>Password</label>
                        <input type="password" id="password" name="password" className={inputClass} placeholder="Enter your password" />
                        <input type="password" id="passwordConfirm" name="passwordConfirm" className={inputClass} placeholder="Confirm your password" />
                    </div>
            

                    <button
                        type="submit"
                        className="mt-2 px-6 py-2 bg-blue-700 text-white border border-blue-500 rounded hover:bg-blue-600 tracking-wider transition-colors self-center"
                        style={{ fontFamily: "var(--font-crimson)" }}
                    >
                        Register
                    </button>
                    <Link href="/login" className="mt-2 text-sm text-blue-400 hover:text-blue-300 self-center transition-colors" style={{ fontFamily: "var(--font-crimson)" }}>
                        Already have an account? Login Here
                    </Link>
                </form>
            </div>
        </SwordBackground>
    );
}
