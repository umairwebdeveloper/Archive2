import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(request: NextRequest) {
	try {
		// you can implement some basic check here like, is user valid or not
		const data = await request.json();
		const priceAmount = data.priceAmount;
		const leveName = data.level;
		const subjectNames = data.subjectNames;

		const params: any = {
			payment_method_types: ["card"],
			line_items: [
				{
					price_data: {
						currency: "usd",
						product_data: {
							name: `Level: ${leveName}`,
							description: `Subjects: ${subjectNames}`,
						},
						unit_amount: priceAmount * 100,
					},
					quantity: 1,
				},
			],
			mode: "payment",
			success_url: process.env.NEXT_BASE_URL as string,
			cancel_url: process.env.NEXT_BASE_URL as string,
		};

		const checkoutSession: Stripe.Checkout.Session =
			await stripe.checkout.sessions.create(params);
		return NextResponse.json({ result: checkoutSession, ok: true });
	} catch (error) {
		console.log(error);
		return new NextResponse("Internal Server", { status: 500 });
	}
}
