// /netlify/functions/checkout.js
const Stripe = require('stripe');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2024-06-20' });

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { tier, color, area, date, successBase } = JSON.parse(event.body || '{}');

    const priceId =
      tier === 'all'
        ? process.env.STRIPE_PRICE_ALL
        : process.env.STRIPE_PRICE_SINGLE;

    if (!priceId) {
      return { statusCode: 500, body: JSON.stringify({ error: 'Missing Stripe price ID' }) };
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [{ price: priceId, quantity: 1 }],
      client_reference_id: `${date}|${area}|${color}|${tier}`,
      metadata: { date, color, area, tier },
      success_url: `${successBase}?paid=${tier}&date=${encodeURIComponent(date)}&color=${encodeURIComponent(color)}&area=${encodeURIComponent(area)}#ok`,
      cancel_url: successBase,
      submit_type: 'pay',
      allow_promotion_codes: false,
    });

    return { statusCode: 200, body: JSON.stringify({ url: session.url }) };
  } catch (err) {
    console.error('Stripe session error', err);
    return { statusCode: 500, body: JSON.stringify({ error: 'Stripe session error' }) };
  }
};
