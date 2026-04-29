"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { FaRegUser } from "react-icons/fa";
import { logoutUser } from "@/lib/actions";

interface UserMenuProps {
    isLoggedIn: boolean;
}

export default function UserMenu({ isLoggedIn }: UserMenuProps) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const itemClass = "block w-full text-left px-4 py-2 text-blue-200 tracking-wider hover:bg-surface-hover hover:text-blue-300 transition-colors";

    return (
        <div className="relative self-stretch flex items-center" ref={ref}>
            <button
                onClick={() => setOpen(!open)}
                className="px-3 py-2 text-blue-200 rounded tracking-wider hover:bg-surface-hover hover:text-blue-300 transition-colors self-stretch flex items-center"
            >
                <FaRegUser size={20} />
            </button>
            {open && (
                <div className="absolute right-0 top-full mt-1 w-40 bg-surface border border-blue-900/50 rounded shadow-lg z-50" style={{ fontFamily: "var(--font-crimson)" }}>
                    {isLoggedIn ? (
                        <>
                            <Link href="/profile" className={itemClass} onClick={() => setOpen(false)}>
                                Profile
                            </Link>
                            <Link href="/my-library" className={itemClass} onClick={() => setOpen(false)}>
                                My Library
                            </Link>
                            <form action={logoutUser}>
                                <button type="submit" className={itemClass}>
                                    Logout
                                </button>
                            </form>
                        </>
                    ) : (
                        <>
                            <Link href="/register" className={itemClass} onClick={() => setOpen(false)}>
                                Register
                            </Link>
                            <Link href="/login" className={itemClass} onClick={() => setOpen(false)}>
                                Login
                            </Link>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}
