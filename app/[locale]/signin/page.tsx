"use client"

import Link from "next/link"
import { useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Provider } from "@supabase/supabase-js"
import config from "@/config"
import Image from "next/image"
import logo from "@/app/icon.png"
import { useTranslations } from "next-intl"
// This a login/singup page for Supabase Auth.
// Successfull login redirects to /api/auth/callback where the Code Exchange is processed (see app/api/auth/callback/route.js).
export const runtime = 'edge';
export default function Login() {
    const supabase = createClientComponentClient()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const t = useTranslations('signin')
    const handleSignup = async (
        e: any,
        options: {
            type: string
            provider?: Provider
        }
    ) => {
        e?.preventDefault()

        setIsLoading(true)

        try {
            const { type, provider } = options
            const redirectURL = `${window.location.origin}/api/auth/callback`
            if (type === "oauth") {
                await supabase.auth.signInWithOAuth({
                    provider,
                    options: {
                        redirectTo: redirectURL,
                    },
                })
            }

        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <main className="p-8 md:p-12 rounded-3xl" data-theme={config.colors.theme}>
            <div className="text-center mb-4 flex justify-center gap-x-4">
                <Link href="/" className="btn btn-ghost">
                    <Image
                        src={logo}
                        alt={`${config.appName} logo`}
                        className="w-8"
                        placeholder="blur"
                        priority={true}
                        width={32}
                        height={32}
                    />
                    {t('home')}
                </Link>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-center mb-12">
                {t('signin')}
            </h1>

            <div className="space-y-8 max-w-xl mx-auto">
                <button
                    className="btn btn-block"
                    onClick={(e) =>
                        handleSignup(e, { type: "oauth", provider: "google" })
                    }
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <span className="loading loading-spinner loading-xs"></span>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6"
                            viewBox="0 0 48 48"
                        >
                            <path
                                fill="#FFC107"
                                d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
                            />
                            <path
                                fill="#FF3D00"
                                d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
                            />
                            <path
                                fill="#4CAF50"
                                d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
                            />
                            <path
                                fill="#1976D2"
                                d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
                            />
                        </svg>
                    )}
                    {t('signup')}
                </button>
            </div>
        </main>
    )
}
