import { Book } from "@/models/book";
import { NextRequest } from "next/server";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export async function GET(
    _request: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    const { id } = await params;
    const data = await readFile(
        join(process.cwd(), "src", "data", "books.json"), "utf-8"
    );

    console.log(id);

    const parsed: Book[] = JSON.parse(data);

    const book = parsed.find((book) => String(book.id) === id);

    if (!book) {
        return Response.json({}, { status: 404 });
    }

    console.log(book);

    return Response.json(book);
}