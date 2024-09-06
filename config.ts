import themes from "daisyui/src/theming/themes";
import { ConfigProps } from "./types/config";

const config = {
    // REQUIRED
    appName: "Suno Downloader",
    // REQUIRED: a short description of your app for SEO tags (can be overwritten)
    appDescription:
        "Experience the future of music with Suno AI. Download AI-generated songs instantly. Explore a wide range of genres and start your musical journey today!",
    // REQUIRED (no https://, not trialing slash at the end, just the naked domain)
    domainName: "sunodownloader.io",
    crisp: {
        // Crisp website ID. IF YOU DON'T USE CRISP: just remove this => Then add a support email in this config file (mailgun.supportEmail) otherwise customer support won't work.
        id: "",
        // Hide Crisp by default, except on route "/". Crisp is toggled with <ButtonSupport/>. If you want to show Crisp on every routes, just remove this below
        onlyShowOnRoutes: ["/"],
    },
    stripe: {
        // Create multiple plans in your Stripe dashboard, then add them here. You can add as many plans as you want, just make sure to add the priceId
        plans: [
            {
                priceId:
                    process.env.NODE_ENV === "development"
                        ? "price_1PeB5gI04HNQCZe5GJJRq95c2"
                        : "price_1Pw5dOI04HNQCZe5M9H8l71s",
                // This plan will look different on the pricing page, it will be highlighted. You can only have one plan with isFeatured: true
                isFeatured: false,
                name: "Producer",
                planType: "paid",
                description: "Amplify your creative output",
                price: 9.99,
                priceAnchor: '$0.033',
                credits: 300,
                features: [
                    {
                        name: "songs",
                    },
                    {
                        name: "credits",
                    },
                    {
                        name: "pricePerGeneration"
                    },
                    {
                        name: "lyricsCredits"
                    },
                    {
                        name: "priorityQueue",
                    },
                    {
                        name: "downloads",
                    },
                ],
            },
            {
                priceId:
                    process.env.NODE_ENV === "development"
                        ? "price_109"
                        : "price_1PvypmI04HNQCZe5S5CHnaKN",
                // This plan will look different on the pricing page, it will be highlighted. You can only have one plan with isFeatured: true
                isFeatured: true,
                name: "Virtuoso",
                planType: "paid",
                description: "Immerse yourself in the world of music",
                price: 29.99,
                priceAnchor: '$0.019',
                credits: 1500,
                features: [
                    {
                        name: "songs",
                    },
                    {
                        name: "credits",
                    },
                    {
                        name: "pricePerGeneration"
                    },
                    {
                        name: "lyricsCredits"
                    },
                    {
                        name: "priorityQueue",
                    },
                    {
                        name: "downloads",
                    },
                ],
            },
            {
                priceId:
                    process.env.NODE_ENV === "development"
                        ? "price_1PeB5gI04HNQCZe5GJJRq95c"
                        : "price_1PeBLII04HNQCZe5g7h2kxOo",
                // This plan will look different on the pricing page, it will be highlighted. You can only have one plan with isFeatured: true
                isFeatured: false,
                name: "Maestro",
                planType: "paid",
                description: "Unlimited musical possibilities",
                price: 15.99,
                priceAnchor: '$0.026',
                credits: 600,
                features: [
                    {
                        name: "songs",
                    },
                    {
                        name: "credits",
                    },
                    {
                        name: "pricePerGeneration"
                    },
                    {
                        name: "lyricsCredits"
                    },
                    {
                        name: "priorityQueue",
                    },
                    {
                        name: "downloads",
                    },
                ],
            },
            {
                // REQUIRED — we use this to find the plan in the webhook (for instance if you want to update the user's credits based on the plan)
                priceId:
                    process.env.NODE_ENV === "development"
                        ? "price_156"
                        : "price_126",
                //  REQUIRED - Name of the plan, displayed on the pricing page
                name: "Free",
                // A friendly description of the plan, displayed on the pricing page. Tip: explain why this plan and not others
                description: "Free Plan",
                // The price you want to display, the one user will be charged on Stripe.
                price: 0,
                // If you have an anchor price (i.e. $29) that you want to display crossed out, put it here. Otherwise, leave it empty
                priceAnchor: '',
                credits: 0,
                planType: "free",
                features: [
                    {
                        name: "songs",
                    },
                    { name: "credits" },
                    {
                        name: "lyricsCredits"
                    },
                    {
                        name: "priorityQueue"
                    },
                    {
                        name: "history"
                    }
                ],
            }
        ],
    },
    aws: {
        // If you use AWS S3/Cloudfront, put values in here
        bucket: "bucket-name",
        bucketUrl: `https://bucket-name.s3.amazonaws.com/`,
        cdn: "https://cdn-id.cloudfront.net/",
    },
    mailgun: {
        // subdomain to use when sending emails, if you don't have a subdomain, just remove it. Highly recommended to have one (i.e. mg.yourdomain.com or mail.yourdomain.com)
        subdomain: "lyl",
        // REQUIRED — Email 'From' field to be used when sending magic login links
        fromNoReply: `Suno Downloader <>`,
        // REQUIRED — Email 'From' field to be used when sending other emails, like abandoned carts, updates etc..
        fromAdmin: `Suno Downloader <>`,
        // Email shown to customer if need support. Leave empty if not needed => if empty, set up Crisp above, otherwise you won't be able to offer customer support."
        supportEmail: "support@sunodownloader.io",
        // When someone replies to supportEmail sent by the app, forward it to the email below (otherwise it's lost). If you set supportEmail to empty, this will be ignored.
        forwardRepliesTo: "laughinglyl90@gmail.com",
    },
    colors: {
        // REQUIRED — The DaisyUI theme to use (added to the main layout.js). Leave blank for default (light & dark mode). If you any other theme than light/dark, you need to add it in config.tailwind.js in daisyui.themes.
        theme: "light",
        // REQUIRED — This color will be reflected on the whole app outside of the document (loading bar, Chrome tabs, etc..). By default it takes the primary color from your DaisyUI theme (make sure to update your the theme name after "data-theme=")
        // OR you can just do this to use a custom color: main: "#f37055". HEX only.
        main: themes["light"]["primary"],
    },
    auth: {
        // REQUIRED — the path to log in users. It's use to protect private routes (like /dashboard). It's used in apiClient (/libs/api.js) upon 401 errors from our API
        loginUrl: "/signin",
        // REQUIRED — the path you want to redirect users after successfull login (i.e. /dashboard, /private). This is normally a private page for users to manage their accounts. It's used in apiClient (/libs/api.js) upon 401 errors from our API & in ButtonSignin.js
        callbackUrl: "/ai-music-generator",
    },
} as ConfigProps;

export default config;
