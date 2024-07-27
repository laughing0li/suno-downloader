import config from "@/config"
import ButtonCheckout from "./ButtonCheckout"

// <Pricing/> displays the pricing plans for your app
// It's your Stripe config in config.js.stripe.plans[] that will be used to display the plans
// <ButtonCheckout /> renders a button that will redirect the user to Stripe checkout called the /api/stripe/create-checkout API endpoint with the correct priceId

const Pricing = () => {
    return (
        <section className="bg-base-200 overflow-hidden" id="pricing">
            <div className="py-24 px-8 max-w-5xl mx-auto">
                <div className="flex flex-col text-center w-full mb-20">
                    <p className="font-medium mb-8">AI Music Pricing</p>
                    <h2 className="font-bold text-3xl lg:text-5xl tracking-tight">
                        Chose the best plan for you
                    </h2>
                </div>

                <div className="relative flex justify-center flex-col lg:flex-row items-center lg:items-stretch gap-8">
                    {config.stripe.plans.map((plan, index) => (
                        <div key={plan.priceId} className="relative w-full max-w-lg transition-all duration-300 hover:scale-105">
                            {plan.isFeatured && (
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                                    <span className="badge badge-secondary badge-lg text-secondary-content font-semibold">
                                        POPULAR
                                    </span>
                                </div>
                            )}
                            <div className={`relative flex flex-col h-full z-10 ${plan.isFeatured
                                ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white'
                                : 'bg-base-100'} p-8 rounded-xl shadow-xl ${plan.isFeatured ? 'border-2 border-secondary' : 'border-2 border-slate-400'}`}>
                                <div className="flex justify-between items-center gap-4 mb-6">
                                    <div>
                                        <p className={`text-2xl font-bold ${plan.isFeatured ? 'text-white' : 'text-base-content'}`}>{plan.name}</p>
                                        {plan.description && (
                                            <p className={`${plan.isFeatured ? 'text-indigo-100' : 'text-base-content/70'} mt-2`}>{plan.description}</p>
                                        )}
                                    </div>
                                </div>
                                {plan.name !== "Free" && (
                                    <div className="mb-6">
                                        <div className="flex items-end gap-2">
                                            <p className={`text-4xl font-bold ${plan.isFeatured ? 'text-white' : 'text-slate-800'}`}>{plan.priceAnchor}</p>
                                            <p className={`text-lg ${plan.isFeatured ? 'text-indigo-200' : 'text-base-content/60'} font-semibold mb-1`}>/ credit</p>
                                        </div>
                                        <p className={`${plan.isFeatured ? 'text-indigo-200' : 'text-base-content/70'} text-sm mt-1`}>
                                            ${plan.price} one time payment
                                        </p>
                                    </div>
                                )}
                                {plan.features && (
                                    <ul className="space-y-4 leading-relaxed text-base flex-1 mb-8">
                                        {plan.features.map((feature, i) => (
                                            <li key={i} className={`flex items-center gap-3 ${plan.isFeatured ? 'text-white' : 'text-base-content/80'}`}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className={plan.isFeatured ? 'text-yellow-300' : 'text-primary'} viewBox="0 0 16 16">
                                                    <path d="M9 13c0 1.105-1.12 2-2.5 2S4 14.105 4 13s1.12-2 2.5-2 2.5.895 2.5 2" />
                                                    <path fillRule="evenodd" d="M9 3v10H8V3z" />
                                                    <path d="M8 2.82a1 1 0 0 1 .804-.98l3-.6A1 1 0 0 1 13 2.22V4L8 5z" />
                                                </svg>
                                                <span>{feature.name}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                                {plan.isFeatured ? (
                                    <ButtonCheckout extraStyle="btn-secondary btn-block text-secondary-content " priceId={plan.priceId} />
                                ) : plan.name !== "Free" ? (
                                    <ButtonCheckout extraStyle="btn-outline btn-block" priceId={plan.priceId} />
                                ) : (
                                    <a href="/ai-music-generator" className="btn btn-block btn-outline">Start Free</a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                <p className="text-center pt-10">
                    For inquiries or assistance, please contact us at{" "}
                    <a
                        href="mailto:support@sundownloader.io"
                        className="text-slate-700 underline"
                    >
                        support@sundownloader.io
                    </a>
                </p>
            </div>
        </section>
    )
}

export default Pricing