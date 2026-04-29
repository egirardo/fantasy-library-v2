export default function SwordBackground({ className, children }: { className?: string; children: React.ReactNode }) {
    return (
        <div
            className={`flex flex-1 min-h-screen bg-background ${className ?? ""}`}
            style={{ backgroundImage: "url('/sword-tile.svg')", backgroundSize: "512px 640px", backgroundRepeat: "repeat", backgroundAttachment: "fixed", backgroundPosition: "center calc(50% + 40px)" }}
        >
            {children}
        </div>
    );
}
