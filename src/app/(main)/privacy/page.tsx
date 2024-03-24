import { Container } from "@/components/Container"

export default function Privacy() {
    return (
        <Container>
            <div className="bg-white py-24 sm:py-32">
                <div className="mx-auto max-w-6xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
                        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Privacy Policy</h1>
                        <div className="mt-10 grid max-w-xl gap-8 text-base leading-7 text-gray-700 lg:max-w-none">
                            <p>
                                By utilizing <a href="/" className="text-indigo-600">Suno Music Downloader</a>, you agree to adhere to the privacy policies outlined on this page:
                            </p>
                            <ul className="list-decimal">
                                <li className="py-2">
                                    <strong>Information We Do Not Collect:</strong> We do not gather any personal information from our users. Your privacy and security are paramount to us.
                                </li>
                                <li className="py-2">
                                    <strong>Cookie Usage:</strong> To enhance your experience, Suno Music Downloader employs Google Analytics cookies, which help us understand and save your preferences for future visits. Cookies are tiny data files transferred to your device’s hard drive via your web browser (with your permission) that allow a website to recognize your browser and capture certain information for future use.
                                </li>
                                {/* <li className="py-2">
                                    <strong>Third-Party Advertisements: </strong> Some advertisements on Suno Music Downloader are managed by third parties, such as ad networks and advertising agencies, who may use cookies and other technologies to collect information about your online activities across websites to tailor advertisements to your interests. It’s important to note that these third parties information practices are not governed by our privacy policy.
                                </li> */}
                                <li className="py-2">
                                    <strong>Information Sharing: </strong>We do not sell, trade, or transfer your personally identifiable information to external parties. This excludes trusted third parties who aid us in website operation, business management, or user service, provided they agree to keep this information confidential. We may release your information when necessary to comply with legal obligations, enforce our site policies, or protect the rights, property, or safety of our users or others. However, non-personally identifiable visitor information may be shared for marketing, advertising, or other purposes.
                                </li>
                                <li className="py-2">
                                    <strong>Privacy Policy Updates: </strong>We reserve the right to modify our privacy policy. Any changes will be posted on this page.
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}
