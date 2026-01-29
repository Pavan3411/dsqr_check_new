export async function POST(req) {
  try {
    const { price, plan, tier, currency, delivery } = await req.json();

    if (!price || !plan || !currency) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400 }
      );
    }

    // Forward the request to your backend
    const response = await fetch('http://localhost:4000/api/checkout/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ price, plan, tier, currency, delivery }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      return new Response(
        JSON.stringify({ error: data.error || 'Failed to create checkout session' }),
        { status: response.status }
      );
    }

    return new Response(JSON.stringify({ url: data.url }), { 
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (err) {
    console.error('Checkout error:', err);
    return new Response(
      JSON.stringify({ error: 'Server error occurred' }), 
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
}