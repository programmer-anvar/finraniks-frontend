import { Card } from "@finranks/design-system/components/card";
import Link from "next/link";

export const metadata = {
    title: "Privacy Policy | FinRanks",
    description:
        "FinRanks Privacy Policy - How we collect, use, and protect your data",
};

export default function PrivacyPolicyPage() {
    return (
        <Card className="app-container text-white translate-y-10">
            <div className="container">
                <div className="header-offset"></div>
                <div className="main-box main-top mb-20 --auto">
                    <div style={{ marginBottom: '20px' }}>
                        <Link href="/en" style={{ color: '#007bff', textDecoration: 'none', fontSize: '14px' }}>
                            ← Back to Home
                        </Link>
                    </div>
                    <h1 className="main-box__title" style={{ fontSize: '28px', marginBottom: '8px' }}>
                        Privacy Policy
                    </h1>
                    <p style={{ fontSize: '14px', color: '#666', marginBottom: '30px' }}>
                        Last Updated: February 1, 2025
                    </p>

                    <div className="main-box__text">
                        <h2 style={{ fontSize: '20px', fontWeight: 600, marginTop: '30px', marginBottom: '12px' }}>
                            1. Introduction
                        </h2>
                        <p>
                            Welcome to FinRanks ("we," "our," or "us"). FinRanks is a comprehensive stock analysis platform that helps investors make informed decisions through advanced financial data, smart scoring systems, and real-time market insights.
                        </p>
                        <p>
                            We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform and services.
                        </p>
                        <p>
                            By using FinRanks, you agree to the collection and use of information in accordance with this policy.
                        </p>

                        <h2 style={{ fontSize: '20px', fontWeight: 600, marginTop: '30px', marginBottom: '12px' }}>
                            2. Information We Collect
                        </h2>

                        <h3 style={{ fontSize: '18px', fontWeight: 600, marginTop: '20px', marginBottom: '10px' }}>
                            2.1 Personal Information
                        </h3>
                        <p>We collect information that you provide directly to us, including:</p>
                        <ul style={{ marginLeft: '20px', marginBottom: '16px' }}>
                            <li><strong>Account Information:</strong> Name, email address, password (encrypted)</li>
                            <li><strong>Profile Information:</strong> Optional profile details, preferences, and settings</li>
                            <li><strong>Communication Data:</strong> Information from your communications with us</li>
                            <li><strong>Payment Information:</strong> Payment method details (processed by third-party payment processors)</li>
                        </ul>

                        <h3 style={{ fontSize: '18px', fontWeight: 600, marginTop: '20px', marginBottom: '10px' }}>
                            2.2 Google Sign-In Information
                        </h3>
                        <p>When you sign in with Google, we receive:</p>
                        <ul style={{ marginLeft: '20px', marginBottom: '16px' }}>
                            <li>Your Google account email address</li>
                            <li>Your name and profile picture (if you choose to share)</li>
                            <li>Unique Google account identifier</li>
                        </ul>
                        <p>
                            We use this information solely for authentication purposes. We do not access your Gmail, Google Drive, or other Google services without your explicit permission.
                        </p>

                        <h3 style={{ fontSize: '18px', fontWeight: 600, marginTop: '20px', marginBottom: '10px' }}>
                            2.3 Usage Information
                        </h3>
                        <p>We automatically collect certain information when you use our services:</p>
                        <ul style={{ marginLeft: '20px', marginBottom: '16px' }}>
                            <li><strong>Device Information:</strong> Device type, operating system, browser type</li>
                            <li><strong>Log Data:</strong> IP address, access times, pages viewed, actions taken</li>
                            <li><strong>Analytics Data:</strong> User interactions, feature usage, performance metrics</li>
                            <li><strong>Cookies and Tracking:</strong> See our Cookie Policy section below</li>
                        </ul>

                        <h3 style={{ fontSize: '18px', fontWeight: 600, marginTop: '20px', marginBottom: '10px' }}>
                            2.4 Platform Usage Data
                        </h3>
                        <p>When you use FinRanks to analyze stocks and markets:</p>
                        <ul style={{ marginLeft: '20px', marginBottom: '16px' }}>
                            <li><strong>Watchlist Data:</strong> Stocks you add to your watchlist and portfolio tracking</li>
                            <li><strong>Search History:</strong> Companies and stocks you search for and analyze</li>
                            <li><strong>Analysis Preferences:</strong> Your saved filters, comparison settings, screening criteria, and custom alerts</li>
                            <li><strong>Feature Usage:</strong> Which features you use (scoring system, valuation metrics, industry comparisons, etc.)</li>
                        </ul>
                        <p>
                            <strong>What FinRanks Provides:</strong> Comprehensive financial data, valuation metrics, smart scoring algorithms, real-time market data, news sentiment analysis, and comparison tools to help you make informed investment decisions.
                        </p>
                        <p>
                            <em>Note: FinRanks is an analysis platform, not a financial advisor. We provide data and tools for your research. All investment decisions are your own responsibility.</em>
                        </p>

                        <h2 style={{ fontSize: '20px', fontWeight: 600, marginTop: '30px', marginBottom: '12px' }}>
                            3. How We Use Your Information
                        </h2>
                        <p>We use the collected information for the following purposes:</p>
                        <ul style={{ marginLeft: '20px', marginBottom: '16px' }}>
                            <li><strong>Service Provision:</strong> To provide, maintain, and improve our services</li>
                            <li><strong>Authentication:</strong> To verify your identity and manage your account</li>
                            <li><strong>Personalization:</strong> To customize your experience and provide relevant content</li>
                            <li><strong>Communication:</strong> To send you updates, newsletters, and important notices</li>
                            <li><strong>Analytics:</strong> To understand how users interact with our platform and improve features</li>
                            <li><strong>Security:</strong> To detect, prevent, and address fraud and security issues</li>
                            <li><strong>Legal Compliance:</strong> To comply with legal obligations and enforce our terms</li>
                        </ul>

                        <h2 style={{ fontSize: '20px', fontWeight: 600, marginTop: '30px', marginBottom: '12px' }}>
                            4. Data Sharing and Disclosure
                        </h2>

                        <h3 style={{ fontSize: '18px', fontWeight: 600, marginTop: '20px', marginBottom: '10px' }}>
                            4.1 We Do Not Sell Your Data
                        </h3>
                        <p>
                            FinRanks does not sell, rent, or trade your personal information to third parties for marketing purposes.
                        </p>

                        <h3 style={{ fontSize: '18px', fontWeight: 600, marginTop: '20px', marginBottom: '10px' }}>
                            4.2 Service Providers
                        </h3>
                        <p>We may share your information with trusted third-party service providers who assist us in:</p>
                        <ul style={{ marginLeft: '20px', marginBottom: '16px' }}>
                            <li>Hosting and infrastructure (cloud services)</li>
                            <li>Payment processing</li>
                            <li>Analytics and performance monitoring</li>
                            <li>Customer support tools</li>
                        </ul>

                        <h2 style={{ fontSize: '20px', fontWeight: 600, marginTop: '30px', marginBottom: '12px' }}>
                            5. Data Security
                        </h2>
                        <p>We implement industry-standard security measures to protect your information:</p>
                        <ul style={{ marginLeft: '20px', marginBottom: '16px' }}>
                            <li><strong>Encryption:</strong> Data is encrypted in transit (HTTPS/TLS) and at rest</li>
                            <li><strong>Access Controls:</strong> Strict access controls limit who can view your data</li>
                            <li><strong>Secure Authentication:</strong> Passwords are hashed using bcrypt; OAuth 2.0 for Google Sign-In</li>
                            <li><strong>Regular Audits:</strong> Security assessments and vulnerability testing</li>
                        </ul>

                        <h2 style={{ fontSize: '20px', fontWeight: 600, marginTop: '30px', marginBottom: '12px' }}>
                            6. Cookies and Tracking Technologies
                        </h2>
                        <p>
                            Cookies are small text files stored on your device that help us provide and improve our services.
                        </p>
                        <p><strong>Types of Cookies We Use:</strong></p>
                        <ul style={{ marginLeft: '20px', marginBottom: '16px' }}>
                            <li><strong>Essential Cookies:</strong> Required for authentication and core functionality</li>
                            <li><strong>Analytics Cookies:</strong> Help us understand usage patterns</li>
                            <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
                        </ul>

                        <h2 style={{ fontSize: '20px', fontWeight: 600, marginTop: '30px', marginBottom: '12px' }}>
                            7. Your Privacy Rights
                        </h2>
                        <p>You have the right to:</p>
                        <ul style={{ marginLeft: '20px', marginBottom: '16px' }}>
                            <li>Access your personal information</li>
                            <li>Request a copy of your data in a portable format</li>
                            <li>Update your account information in profile settings</li>
                            <li>Request deletion of your account and associated data</li>
                            <li>Opt out of marketing emails</li>
                        </ul>

                        <h2 style={{ fontSize: '20px', fontWeight: 600, marginTop: '30px', marginBottom: '12px' }}>
                            8. Third-Party Services
                        </h2>
                        <p>
                            When you use Google Sign-In, your authentication is handled by Google. Please review{' '}
                            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: '#007bff' }}>
                                Google's Privacy Policy
                            </a>{' '}
                            for information about how Google handles your data.
                        </p>

                        <h2 style={{ fontSize: '20px', fontWeight: 600, marginTop: '30px', marginBottom: '12px' }}>
                            9. Children's Privacy
                        </h2>
                        <p>
                            FinRanks is not intended for users under the age of 18. We do not knowingly collect personal information from children.
                        </p>

                        <h2 style={{ fontSize: '20px', fontWeight: 600, marginTop: '30px', marginBottom: '12px' }}>
                            10. Changes to This Privacy Policy
                        </h2>
                        <p>
                            We may update this Privacy Policy from time to time. We will notify you of significant changes by posting the updated policy on this page and updating the "Last Updated" date.
                        </p>

                        <h2 style={{ fontSize: '20px', fontWeight: 600, marginTop: '30px', marginBottom: '12px' }}>
                            11. Contact Us
                        </h2>
                        <p>
                            If you have questions, concerns, or requests regarding this Privacy Policy or your personal data, please contact us:
                        </p>
                        <ul style={{ marginLeft: '20px', marginBottom: '16px' }}>
                            <li><strong>Email:</strong> support@finranks.com</li>
                            <li><strong>Website:</strong> <a href="https://finranks.com" target="_blank" rel="noopener noreferrer" style={{ color: '#007bff' }}>https://finranks.com</a></li>
                        </ul>

                        <div style={{
                            background: '#fff3cd',
                            border: '1px solid #ffc107',
                            borderRadius: '4px',
                            padding: '20px',
                            marginTop: '30px'
                        }}>
                            <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#856404', marginBottom: '12px' }}>
                                Disclaimer
                            </h3>
                            <p style={{ color: '#856404', marginBottom: '12px' }}>
                                <strong>FinRanks is a stock analysis platform that provides:</strong>
                            </p>
                            <ul style={{ marginLeft: '20px', marginBottom: '12px', color: '#856404' }}>
                                <li>📊 Comprehensive financial data and valuation metrics</li>
                                <li>⭐ Smart scoring system based on financial strength, profitability, growth, and valuation</li>
                                <li>📈 Real-time market data, news sentiment analysis, and analyst ratings</li>
                                <li>🎯 Tools to compare companies, track trends, and identify opportunities</li>
                            </ul>
                            <p style={{ color: '#856404', marginBottom: 0 }}>
                                <strong>We are NOT a financial advisor.</strong> All data and tools are for informational and educational purposes only. We do not provide investment advice or recommendations. Any investment decisions you make are solely your responsibility. Always consult with a qualified financial advisor before making investment decisions.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
}
