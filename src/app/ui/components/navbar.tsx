import Link from "next/link";
import { getSession } from "@/lib/session";
import { RiShoppingCartFill } from "react-icons/ri";
import UserMenu from "./UserMenu";

export default async function Navbar() {
    const user = await getSession();

    const linkClass = "px-3 py-2 text-blue-200 rounded tracking-wider hover:bg-surface-hover hover:text-blue-300 transition-colors";

    return (
        <nav className="bg-background text-white p-4 border-b-2 border-blue-600">
            <div className="w-full flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold tracking-widest text-blue-300" style={{ fontFamily: "var(--font-cinzel-decorative)" }}>
                    Fantasy Library
                </Link>
                <div className="flex items-center">
                    <Link href="/books" className={linkClass} style={{ fontFamily: "var(--font-crimson)" }}>
                        Books
                    </Link>
                    <Link href="/books/add" className={linkClass} style={{ fontFamily: "var(--font-crimson)" }}>
                        Add Book
                    </Link>
                    <UserMenu isLoggedIn={!!user} />
                    <Link href="/cart" className={`${linkClass} self-stretch flex items-center`} style={{ fontFamily: "var(--font-crimson)" }}>
                        <RiShoppingCartFill size={20} />
                    </Link>
                </div>
            </div>
        </nav>
    );
}
