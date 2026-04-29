import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function Profile() {
    const user = await getSession();

    if (!user) redirect("/login");

    return (
            <div className="bg-background/80 backdrop-blur-sm p-10 rounded-2xl border border-blue-700/50 w-full max-w-lg">
                <h1
                    className="text-2xl font-bold text-blue-300 tracking-widest text-center mb-2"
                    style={{ fontFamily: "var(--font-cinzel-decorative)" }}
                >
                    Profile
                </h1>
                <div className="w-24 h-0.5 bg-blue-500 mx-auto mb-6" />

                <div className="flex flex-col gap-4 text-slate-200">
                    <div className="flex justify-between border-b border-blue-900/50 pb-3">
                        <span className="text-sky-300 text-sm tracking-wide">First Name</span>
                        <span>{user.firstName}</span>
                    </div>
                    <div className="flex justify-between border-b border-blue-900/50 pb-3">
                        <span className="text-sky-300 text-sm tracking-wide">Last Name</span>
                        <span>{user.lastName}</span>
                    </div>
                    <div className="flex justify-between border-b border-blue-900/50 pb-3">
                        <span className="text-sky-300 text-sm tracking-wide">Email</span>
                        <span>{user.email}</span>
                    </div>
                </div>
            </div>
    );
}
