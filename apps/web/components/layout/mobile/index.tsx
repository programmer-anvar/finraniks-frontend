import { ReactNode } from "react";
import MobileRootContent from "../mobile-root-content";
import { handler } from "../../../auth";

export default async function MobileLayout({ children }: { children: ReactNode }) {
    const session = await handler.auth();
    return (
        <MobileRootContent session={session!}>
            {children}
        </MobileRootContent>
    );
}
