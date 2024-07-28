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
                features: [
                    {
                        name: "6 songs for free",
                    },
                    { name: "3 generation credits" },
                    {
                        name: "3 generation credits for lyrics"
                    },
                    {
                        name: "Free trial on first login"
                    },
                    {
                        name: "Shared generation queue",
                    }
                    
                ],
            },
            // {
            //     // REQUIRED — we use this to find the plan in the webhook (for instance if you want to update the user's credits based on the plan)
            //     priceId:
            //         process.env.NODE_ENV === "development"
            //             ? "price_1PeB5gI04HNQCZe5GJJRq95c"
            //             : "price_1PeB56I04HNQCZe5s6SaP4Gi",
            //     //  REQUIRED - Name of the plan, displayed on the pricing page
            //     name: "Composer",
            //     // A friendly description of the plan, displayed on the pricing page. Tip: explain why this plan and not others
            //     description: "Start your AI music journey",
            //     // The price you want to display, the one user will be charged on Stripe.
            //     price: 4.99,
            //     // If you have an anchor price (i.e. $29) that you want to display crossed out, put it here. Otherwise, leave it empty
            //     priceAnchor: '$0.048',
            //     credits: 100,
            //     features: [
            //         {
            //             name: "100 credits for generation",
            //         },
            //         { name: "200 Songs" },
            //         {
            //             name: "$0.048 per generation"
            //         },
            //         {
            //             name: "Unlimited downloads",
            //         },
            //     ],
            // },
            {
                priceId:
                    process.env.NODE_ENV === "development"
                        ? "price_1PeB5gI04HNQCZe5GJJRq95c"
                        : "price_1PeBLII04HNQCZe5g7h2kxOo",
                // This plan will look different on the pricing page, it will be highlighted. You can only have one plan with isFeatured: true
                isFeatured: true,
                name: "Maestro",
                description: "Unlimited musical possibilities",
                price: 15.99,
                priceAnchor: '$0.019',
                credits: 800,
                features: [
                    { name: "1600 Songs" },
                    {
                        name: "800 credits for generation",
                    },
                    {
                        name: "0.019 per generation"
                    },
                    {
                        name: "800 credits for lyrics generation"
                    },
                    {
                        name: "Priority generation queue",
                    },
                    {
                        name: "Unlimited downloads",
                    },
                ],
            },
            {
                priceId:
                    process.env.NODE_ENV === "development"
                        ? "price_1PeB5gI04HNQCZe5GJJRq95c"
                        : "price_1PeBKMI04HNQCZe5poHbdnAF",
                // This plan will look different on the pricing page, it will be highlighted. You can only have one plan with isFeatured: true
                isFeatured: false,
                name: "Producer",
                description: "Amplify your creative output",
                price: 7.99,
                priceAnchor: '$0.026',
                credits: 300,
                features: [
                    { name: "600 Songs" },

                    {
                        name: "300 credits for generation",
                    },
                    {
                        name: "$0.026 per generation"
                    },
                    {
                        name: "300 credits for lyrics generation"
                    },
                    {
                        name: "Priority generation queue",
                    },
                    {
                        name: "Unlimited downloads",
                    },
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
