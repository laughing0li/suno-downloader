"use client"

import { ReactNode } from "react"
import NextTopLoader from "nextjs-toploader"
import { Toaster } from "react-hot-toast"
import config from "@/config"
import Header from "./Header"
import Footer from "./Footer"

const ClientLayout = ({ children }: { children: ReactNode }) => {
    return (
        <>
            {/* Show a progress bar at the top when navigating between pages */}
            <NextTopLoader color={config.colors.main} showSpinner={false} />

            {/* Content inside app/page.js files  */}
            <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-grow">{children}</main>
                <Footer />
            </div>
            {/* Show Success/Error messages anywhere from the app with toast() */}
            <Toaster
                toastOptions={{
                    duration: 3000,
                }}
            />
        </>
    )
}

export default ClientLayout
