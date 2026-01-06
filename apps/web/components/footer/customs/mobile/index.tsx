'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useModals } from '@/stores/modal';
import { Button } from '@finranks/design-system/components/Button';

const MobileFooter = () => {
    const pathname = usePathname();
    const { setModal } = useModals();
    // Hide footer on /account/*
    const isAccountPage = pathname.startsWith('/account');

    if (isAccountPage) return null;

    return (
        <footer className="mobile-footer">
            <div className="app-container">
                <div className="mobile-footer__content">
                    {/* CTA */}
                    <div className="mobile-footer__cta">
                        <h3 className="mobile-footer__title">
                            Get all premium features to the best stock analysis tool
                        </h3>

                        <div className="mobile-footer__buttons">
                            <Button
                                className="btn btn-blue btn-block"
                                onClick={() =>
                                    setModal({ register: true })
                                }
                            >
                                <span>Get started</span>
                            </Button>
                        </div>
                    </div>

                    {/* Links */}
                    <div className="mobile-footer__links">
                        <div className="mobile-footer__brand">
                            <Link href="/" className="mobile-footer__logo">
                                <img src="/images/logos/footer-logo.svg" alt="Finranks logo" />
                                <span>Finranks</span>
                            </Link>
                        </div>

                        <div className="mobile-footer__nav">
                            <div className="mobile-footer__col">
                                <h4>Company</h4>
                                <ul>
                                    <li>
                                        <Link href="/about">About us</Link>
                                    </li>
                                </ul>
                            </div>

                            <div className="mobile-footer__col">
                                <h4>Contact us</h4>
                                <ul>
                                    <li>
                                        <a href="mailto:info@finranks.com">info@finranks.com</a>
                                    </li>
                                </ul>
                            </div>

                            <div className="mobile-footer__col">
                                <h4>Follow us</h4>
                                <ul>
                                    <li>
                                        <a
                                            href="https://www.instagram.com/finranks"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Instagram
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="https://t.me/finranks"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Telegram
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="https://www.linkedin.com/company/finranks"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            LinkedIn
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Bottom */}
                    <div className="mobile-footer__bottom">
                        <ul className="mobile-footer__legal">
                            <li><span>All rights reserved.</span></li>
                            <li><Link href="/privacy-policy">Privacy Policy</Link></li>
                            <li><Link href="/terms-of-service">Terms of Service</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default MobileFooter;
