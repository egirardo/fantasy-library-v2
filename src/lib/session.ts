import { cookies } from "next/headers";

export type SessionUser = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
};

export async function getSession(): Promise<SessionUser | null> {
    const cookieStore = await cookies();
    const session = cookieStore.get("session");
    if (!session) return null;
    try {
        return JSON.parse(session.value) as SessionUser;
    } catch {
        return null;
    }
}
