/* eslint-disable @next/next/no-img-element */
"use client"

import { useState, useEffect } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import ButtonAccount from "./ButtonAccount"
import { useTranslations } from "next-intl"

// A simple button to sign in with our providers (Google & Magic Links).
// It automatically redirects user to callbackUrl (config.auth.callbackUrl) after login, which is normally a private page for users to manage their accounts.
// If the user is already logged in, it will show their profile picture & redirect them to callbackUrl immediately.
const ButtonSignin = ({
    text = "Get started",
    extraStyle,
}: {
    text?: string
    extraStyle?: string
}) => {
    const t = useTranslations('header')
    const supabase = createClientComponentClient()
    const [user, setUser] = useState<any>(null)

    useEffect(() => {
        const getUser = async () => {
            const { data } = await supabase.auth.getUser()

            setUser(data.user)
        }

        getUser()
    }, [supabase])

    if (user) {
        return (
            <ButtonAccount />
        )
    }

    return (
        <button className={`btn ${extraStyle ? extraStyle : ""}`} onClick={() => (document.getElementById('sign-in') as HTMLDialogElement).showModal()}>{t('signin')}</button>
    )
}

export default ButtonSignin
