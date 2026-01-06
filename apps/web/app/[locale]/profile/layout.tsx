import ProfileLayout from "@/components/layout/profile-layout";
import { ReactNode } from "react";

type RootLayoutProperties = {
    readonly children: ReactNode;
};


export default async function Layout({ children }: RootLayoutProperties) {

    return (
        <ProfileLayout>{children}</ProfileLayout>
    );
}