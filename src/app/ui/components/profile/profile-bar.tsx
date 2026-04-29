import Link from "next/link";

export default function ProfileBar() {
    return (
        <div className="w-72 min-h-screen bg-zinc-900 flex flex-col items-start gap-4 px-4 py-6 border-r border-blue-700/50">
            <Link href="/profile">
                <h1 className="text-2xl font-bold text-blue-200">My Profile</h1>
            </Link>
            <div className="w-64 h-0.5 bg-blue-300 mx-auto mb-0" />
            <Link href="/profile/edit-profile">
                <button className="text-blue-200 px-4 py-2 rounded hover:bg-surface-hover">Edit Profile</button>
            </Link>
            <div className="w-64 h-0.5 bg-blue-300 mx-auto mb-0" />
            <Link href="/profile/history">
                <button className="text-blue-200 px-4 py-2 rounded hover:bg-surface-hover">View History</button>
            </Link>
            <div className="w-64 h-0.5 bg-blue-300 mx-auto mb-0" />
            <Link href="/profile/borrowed-books">
                <button className="text-blue-200 px-4 py-2 rounded hover:bg-surface-hover">View Borrowed Books</button>
            </Link>
            <div className="w-64 h-0.5 bg-blue-300 mx-auto mb-0" />
            <Link href="/profile/reserved-books">
                <button className="text-blue-200 px-4 py-2 rounded hover:bg-surface-hover">View Reserved Books</button>
            </Link>
            <div className="w-64 h-0.5 bg-blue-300 mx-auto mb-0" />
            <Link href="/profile/saved-books">
                <button className="text-blue-200 px-4 py-2 rounded hover:bg-surface-hover">View Saved Books</button>
            </Link>
        </div>
    );
}