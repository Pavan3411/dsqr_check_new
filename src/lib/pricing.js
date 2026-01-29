// // Client-side authoritative pricing mirror for display purposes only.
// // The backend is the source of truth for actual charges.

// export const AUTHORITATIVE_PRICES = {
//   Graphic: {
//     1: { base: { USD: 273, CAD: 373 }, fast: { USD: 473, CAD: 573 } },
//     2: { base: { USD: 573, CAD: 773 }, fast: { USD: 673, CAD: 873 } },
//     3: { base: { USD: 737, CAD: 973 }, fast: { USD: 773, CAD: 1073 } },
//   },
//   Video: {
//     1: { base: { USD: 473, CAD: 573 }, fast: { USD: 773, CAD: 1073 } },
//     2: { base: { USD: 673, CAD: 873 }, fast: { USD: 1173, CAD: 1573 } },
//     3: { base: { USD: 873, CAD: 1173 }, fast: { USD: 1573, CAD: 2173 } },
//   },
//   Both: {
//     1: { base: { USD: 637, CAD: 837 }, fast: { USD: 1037, CAD: 1337 } },
//     2: { base: { USD: 1037, CAD: 1337 }, fast: { USD: 1537, CAD: 2037 } },
//     3: { base: { USD: 1337, CAD: 1837 }, fast: { USD: 1937, CAD: 2737 } },
//   },
//   AI: {
//     1: { base: { USD: 1773, CAD: 2473 } },
//     2: { base: { USD: 2773, CAD: 3773 } },
//     3: { base: { USD: 3773, CAD: 4973 } },
//   },
// }

// export function getExpectedPrice(plan, tier, delivery, currency) {
//   const planData = AUTHORITATIVE_PRICES?.[plan]
//   const tierData = planData?.[tier]
//   if (!tierData) return null
//   const type = plan === 'AI' || delivery === 'base' ? 'base' : 'fast'
//   const priceData = tierData[type]
//   return priceData?.[currency?.toUpperCase()] ?? null
// }

// export function formatMoney(amount, currency) {
//   if (!amount) return '-'
//   try {
//     return new Intl.NumberFormat('en-US', {
//       style: 'currency',
//       currency: currency?.toUpperCase() || 'USD',
//       maximumFractionDigits: 0,
//     }).format(amount)
//   } catch {
//     return `${currency?.toUpperCase() || 'USD'} ${amount}`
//   }
// }

// constants/pricing.js

// Tiered prices (base + fast for 1/2/3 active requests)
export const PRICES = {
  Graphic: {
    1: { base: { USD: 273, CAD: 373 }, fast: { USD: 473, CAD: 573 } },
    2: { base: { USD: 573, CAD: 773 }, fast: { USD: 673, CAD: 873 } },
    3: { base: { USD: 737, CAD: 973 }, fast: { USD: 773, CAD: 1073 } },
  },
  Video: {
    1: { base: { USD: 473, CAD: 573 }, fast: { USD: 773, CAD: 1073 } },
    2: { base: { USD: 673, CAD: 873 }, fast: { USD: 1173, CAD: 1573 } },
    3: { base: { USD: 873, CAD: 1173 }, fast: { USD: 1573, CAD: 2173 } },
  },
  Both: {
    1: { base: { USD: 637, CAD: 837 }, fast: { USD: 1037, CAD: 1337 } },
    2: { base: { USD: 1037, CAD: 1337 }, fast: { USD: 1537, CAD: 2037 } },
    3: { base: { USD: 1337, CAD: 1837 }, fast: { USD: 1937, CAD: 2737 } },
  },
  AI: {
    1: { base: { USD: 1773, CAD: 2473 } },
    2: { base: { USD: 2773, CAD: 3773 } },
    3: { base: { USD: 3773, CAD: 4973 } },
  }
};

// Checkout URLs mapped to plan + tier
export const CHECKOUT_LINKS = {
  // Graphic
  'Graphic-1-base': 'https://buy.stripe.com/eVqdR92gk4ocdTx4uP08g18',
  'Graphic-1-fast': 'https://buy.stripe.com/dRmdR92gkaMA2aP1iD08g1b',
  'Graphic-2-base': 'https://buy.stripe.com/eVqfZhbQUdYM9Dh0ez08g19',
  'Graphic-2-fast': 'https://buy.stripe.com/dRm3cv2gkaMAaHl6CX08g1c',
  'Graphic-3-base': 'https://buy.stripe.com/7sYbJ1g7a7Ao4iXbXh08g1a',
  'Graphic-3-fast': 'https://buy.stripe.com/aFaaEXg7a6wkbLp7H108g1d',

  // Video
  'Video-1-base': 'https://buy.stripe.com/3cI3cvg7a7AodTxe5p08g12',
  'Video-1-fast': 'https://buy.stripe.com/7sY28rg7adYM16LaTd08g15',
  'Video-2-base': 'https://buy.stripe.com/9B600jcUY3k85n1d1l08g13',
  'Video-2-fast': 'https://buy.stripe.com/eVq28rg7a7Aog1Fgdx08g16',
  'Video-3-base': 'https://buy.stripe.com/5kQ6oH2gk6wk02HaTd08g14',
  'Video-3-fast': 'https://buy.stripe.com/14AfZhf36dYMaHl3qL08g17',

  // Both
  'Both-1-base': 'https://buy.stripe.com/7sY8wPbQU5sg6r5d1l08g1e',
  'Both-1-fast': 'https://buy.stripe.com/4gM4gz5sw7AoaHl9P908g1f',
  'Both-2-base': 'https://buy.stripe.com/4gM4gz5sw7AoaHl9P908g1f',
  'Both-2-fast': 'https://buy.stripe.com/9B69ATaMQ2g42aP0ez08g1h',
  'Both-3-base': 'https://buy.stripe.com/dRmeVd6wA9Iw8zd0ez08g1g',
  'Both-3-fast': 'https://buy.stripe.com/6oU00jg7a4oceXBbXh08g1i',

  // AI
'AI-1-base': 'https://buy.stripe.com/6oU28r6wA07WaHlbXh08g1j',
'AI-2-base': 'https://buy.stripe.com/bJe8wP4osf2Q16Le5p08g1k',
'AI-3-base': 'https://buy.stripe.com/00w00j2gk1c09DhbXh08g1l',

}

// Utility to build correct link
export const buildCheckoutLink = (plan, activeRequest, fastDelivery) => {
  // If plan = "AI", always point to base (ignore fastDelivery)
  if (plan === "AI") {
    const key = `${plan}-${activeRequest}-base`
    return CHECKOUT_LINKS[key] || "#"
  }

  // Other plans (Graphic, Video, Both)
  const key = `${plan}-${activeRequest}-${fastDelivery ? "fast" : "base"}`
  return CHECKOUT_LINKS[key] || "#"
}