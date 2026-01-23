// functions/stripeWebhook.js
export default {
  async fetch(request) {
    if (request.method !== "POST") {
      return new Response("Method Not Allowed", { status: 405 });
    }

    const payload = await request.text();
    console.log("Stripe webhook payload:", payload);

    return new Response("ok", { status: 200 });
  }
};
