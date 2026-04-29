import BorrowedBooks from "@/app/ui/components/profile/borrowed-books";
import SwordBackground from "@/app/ui/components/sword-background";

export default function BorrowedBooksPage() {
     return (
        <SwordBackground className="flex-col items-center justify-center p-10">
            <BorrowedBooks />
        </SwordBackground>
     );
}