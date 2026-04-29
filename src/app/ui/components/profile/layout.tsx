import ProfileBar from "./profile-bar";

export default function ProfileLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex">
            <ProfileBar />
            {children}
        </div>
    );
}