import { Book } from "@/models/book";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export async function GET(request:  Request) {
    const path = join(process.cwd(), 'src', 'data', 'books.json');
    const data = await readFile(path, 'utf-8');

    const books: Book[] = JSON.parse(data);

    return Response.json(books);
}