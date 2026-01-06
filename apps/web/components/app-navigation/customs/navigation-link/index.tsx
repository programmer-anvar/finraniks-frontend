import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./app-navigation.module.css";

const AppNavigationLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
    const pathName = usePathname();
    const isActive = pathName === href;

    const className = `${styles['navigation-link']} ${isActive ? styles.activeLink : ""
        }`;

    return (
        <Link href={href} className={className}>
            {children}
        </Link>
    );
};

export default AppNavigationLink;
