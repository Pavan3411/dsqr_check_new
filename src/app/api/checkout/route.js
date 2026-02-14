// import Stripe from 'stripe'
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY) // Use environment variable for secret key

// // export async function POST(req) {
// //   try {
// //     const { price, planName, interval, currency } = await req.json();

// //     if (!price || !planName || !currency) {
// //       return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
// //     }

// //     // Stripe expects the amount in the smallest unit of currency
// //     const unit_amount = Math.round(price * 100); // e.g., INR: paise, USD: cents

// //     const session = await stripe.checkout.sessions.create({
// //       payment_method_types: ["card"],
// //       mode: "subscription", // or "payment" for one-time
// //       line_items: [
// //         {
// //           price_data: {
// //             currency,
// //             product_data: { name: planName },
// //             unit_amount,
// //             recurring: { interval: interval || "month" },
// //           },
// //           quantity: 1,
// //         },
// //       ],
// //       success_url: "http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}",
// //       cancel_url: "http://localhost:3000/cancel",
// //     });

// //     return new Response(JSON.stringify({ id: session.id }), { status: 200 });
// //   } catch (err) {
// //     console.error(err);
// //     return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
// //   }
// // }
