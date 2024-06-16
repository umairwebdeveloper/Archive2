import { loadStripe, Stripe } from "@stripe/stripe-js";

interface CheckoutProps {
	lineItems: any;
}

let stripePromise: Promise<Stripe | null>;

const getStripe = (): Promise<Stripe | null> => {
	if (!stripePromise) {
		stripePromise = loadStripe(
			process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
		);
	}
	return stripePromise;
};

export async function checkout({ lineItems }: CheckoutProps): Promise<void> {
	const stripe = await getStripe();
	if (stripe) {
		await stripe.redirectToCheckout({
			mode: "payment",
			lineItems,
			successUrl: `${window.location.origin}?session_id={CHECKOUT_SESSION_ID}`,
			cancelUrl: window.location.origin,
		});
	} else {
		console.error("Stripe has not been loaded correctly.");
	}
}
