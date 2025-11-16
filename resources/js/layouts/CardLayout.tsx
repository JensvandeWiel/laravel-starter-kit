import {Card} from "@/components/card";

export default function CardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className={"min-h-screen flex items-center justify-center bg-base-200"}>
            <Card className={"w-full max-w-md"}>
                {children}
            </Card>
        </div>
    );
}
