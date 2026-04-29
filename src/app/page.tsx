import Link from "next/link";

export default function Home() {
  return (
    <div
      className="flex flex-col flex-1 items-center justify-center p-15"
      style={{ backgroundImage: "url('/background.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <div className="bg-background/80 backdrop-blur-sm p-10 rounded-2xl text-center text-white border border-blue-700/50">
        <h1
          className="text-3xl font-bold mb-2 text-blue-300 tracking-widest"
          style={{ fontFamily: "var(--font-cinzel-decorative)" }}
        >
          Welcome to the Fantasy Library
        </h1>
        <div className="w-24 h-0.5 bg-blue-500 mx-auto mb-4" />
        <p className="text-lg mb-6 text-slate-300" style={{ fontFamily: "var(--font-crimson)" }}>
          Set out upon your next adventure in the world of fantasy!
        </p>
        <Link href="/books">
          <button
            className="px-6 py-2 bg-blue-700 text-white border border-blue-500 rounded hover:bg-blue-600 tracking-wider transition-colors"
            style={{ fontFamily: "var(--font-crimson)" }}
          >
            View Books
          </button>
        </Link>
      </div>
    </div>
  );
}
