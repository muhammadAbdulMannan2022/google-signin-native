import Stripe from "stripe"

export const stripeF = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-06-30.basil",
    appInfo: {
        name: "GoogleLoginApp"
    }
})