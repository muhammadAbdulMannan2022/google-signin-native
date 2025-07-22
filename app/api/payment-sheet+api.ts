import { stripeF } from "@/components/stripe-server";

export async function POST(req: Request) {
    const { amount } = await req.json()
    const customer = await stripeF.customers.create()
    const ephemeralKey = await stripeF.ephemeralKeys.create(
        { customer: customer.id },
        { apiVersion: "2025-06-30.basil" }
    )
    const paymentIntent = await stripeF.paymentIntents.create({
        amount: amount ? Math.floor(amount * 100) : 1000,
        currency: "usd",
        customer: customer.id,
        automatic_payment_methods: {
            enabled: true
        }
    })
    return Response.json({
        paymentIntent: paymentIntent.client_secret,
        ephemeralKey: ephemeralKey.secret,
        customer: customer.id,
        publishableKey: process.env.PUB_KEY,
    })
}