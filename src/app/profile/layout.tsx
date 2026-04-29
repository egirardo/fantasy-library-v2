import ProfileBar from "../ui/components/profile/profile-bar";

export default function ProfileLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen">
            <ProfileBar />
            <div className="flex-1">{children}</div>
        </div>
    );
}
