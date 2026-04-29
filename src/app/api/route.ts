export async function GET(request:  Request) {
    return Response.json({ message: "Hello from Route" }, {status: 200});
}

