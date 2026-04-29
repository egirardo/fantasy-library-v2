import Link from "next/link";

export default function ProfileBar() {
    return (
        <div className="w-56 min-h-screen bg-gray-200 flex flex-col items-start gap-4 px-4 py-6">
            <Link href="/profile">
                <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
            </Link>
            <Link href="/profile/edit-profile">
                <button className="bg-blue-500 text-white px-4 py-2 rounded">Edit Profile</button>
            </Link>
            <Link href="/profile/history">
                <button className="bg-blue-500 text-white px-4 py-2 rounded">View Transaction History</button>
            </Link>
            <Link href="/profile/my-books">
                <button className="bg-blue-500 text-white px-4 py-2 rounded">View My Books</button>
            </Link>
            <Link href="/profile/saved-books">
                <button className="bg-blue-500 text-white px-4 py-2 rounded">View Saved Books</button>
            </Link>
        </div>
    );
}