"use client"

import { useState } from "react"
import apiClient from "@/libs/api"
import config from "@/config"

// This component is used to create Stripe Checkout Sessions
// It calls the /api/stripe/create-checkout route with the priceId, successUrl and cancelUrl
// Users must be authenticated. It will prefill the Checkout data with their email and/or credit card (if any)
// You can also change the mode to "subscription" if you want to create a subscription instead of a one-time payment
const ButtonCheckout = ({
    priceId,
    mode = "payment",
    extraStyle,
}: {
    priceId: string
    mode?: "payment" | "subscription"
    extraStyle?: string
}) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handlePayment = async () => {
        setIsLoading(true)

        try {
            const { url }: { url: string } = await apiClient.post(
                "/stripe/create-checkout",
                {
                    priceId,
                    successUrl: window.location.href,
                    cancelUrl: window.location.href,
                    mode,
                }
            )

            window.location.href = url
        } catch (e) {
            console.error(e)
        }

        setIsLoading(false)
    }

    return (
        <button
            className={`btn ${extraStyle ? extraStyle : ""} btn btn-block group`}
            onClick={() => handlePayment()}
        >
            {isLoading ? (
                <span className="loading loading-spinner loading-xs"></span>
            ) : (
                <i className="bi bi-cart2"></i>
            )}
            Compose Now
        </button>
    )
}

export default ButtonCheckout
