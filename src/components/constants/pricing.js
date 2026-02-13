// constants/pricing.js

// Tiered prices (base + fast for 1/2/3 active requests)
// export const PRICES = {
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
//   }
// };

export const PRICES = {}

// New: PRICES_FROM_API will be filled from backend data in the same structure as the mock PRICES
// export const PRICES_FROM_API = {}

// Helper to map backend data to PRICES_FROM_API structure
export function mapApiPricingToStructure(apiData) {
  // Example assumes apiData is an array of objects with plan, tier, base, fast, and currency info
  // Adjust mapping logic as per your backend response
  const result = {}
  if (!Array.isArray(apiData)) return result
  apiData.forEach((item) => {
    const { plan, tier, base, fast, currency } = item
    if (!plan || !tier) return
    if (!result[plan]) result[plan] = {}
    if (!result[plan][tier]) result[plan][tier] = {}
    if (base) {
      result[plan][tier].base = { ...base }
    }
    if (fast) {
      result[plan][tier].fast = { ...fast }
    }
  })
  return result
}

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
  if (plan === 'AI') {
    const key = `${plan}-${activeRequest}-base`
    return CHECKOUT_LINKS[key] || '#'
  }

  // Other plans (Graphic, Video, Both)
  const key = `${plan}-${activeRequest}-${fastDelivery ? 'fast' : 'base'}`
  return CHECKOUT_LINKS[key] || '#'
}

import { useEffect, useState } from 'react'

export function PricingComponent() {
  const [pricing, setPricing] = useState(null)

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/pricing`)
      .then((res) => res.json())
      .then((data) => {
        console.log('Fetched pricing:', data)
        setPricing(data)
        // Map and store in PRICES for global use
        let mapped = {}
        if (
          data &&
          data.data &&
          typeof data.data === 'object' &&
          !Array.isArray(data.data)
        ) {
          mapped = data.data
        } else if (data && Array.isArray(data.data)) {
          mapped = mapApiPricingToStructure(data.data)
        }
        // Convert all keys to valid JS identifiers or numbers
        function convertKeysToJS(obj) {
          if (typeof obj !== 'object' || obj === null) return obj
          if (Array.isArray(obj)) return obj.map(convertKeysToJS)
          const newObj = {}
          for (const key in obj) {
            const value = obj[key]
            // If key is a string that is a number, convert to number
            let newKey = key
            if (!isNaN(key) && key.trim() !== '') {
              newKey = Number(key)
            } else if (/^[A-Za-z_$][A-Za-z0-9_$]*$/.test(key)) {
              newKey = key
            }
            newObj[newKey] = convertKeysToJS(value)
          }
          return newObj
        }
        if (Object.keys(mapped).length) {
          const mappedNoStringKeys = convertKeysToJS(mapped)
          Object.keys(PRICES).forEach((k) => delete PRICES[k])
          Object.assign(PRICES, mappedNoStringKeys)
          console.log(
            'Mapped PRICES (exported):',
            JSON.stringify(PRICES, null, 2),
          )
        }
      })
      .catch((err) => console.error(err))
  }, [])

  if (!pricing) return <div>Loading...</div>
  return (
    <div>
      <h4>Raw API Response:</h4>
      <pre style={{ fontSize: 12, background: '#f6f6f6', padding: 8 }}>
        {JSON.stringify(pricing, null, 2)}
      </pre>
      <h4>Mapped PRICES Object (JS syntax):</h4>
      <pre style={{ fontSize: 12, background: '#f6f6f6', padding: 8 }}>
        {prettyPrint(PRICES)}
      </pre>
    </div>
  )
}

// Custom pretty-print function for JS object syntax
function prettyPrint(obj, indent = 2) {
  const pad = (n) => ' '.repeat(n)
  if (typeof obj !== 'object' || obj === null) return JSON.stringify(obj)
  if (Array.isArray(obj)) {
    return (
      '[\n' +
      obj.map((v) => pad(indent) + prettyPrint(v, indent + 2)).join(',\n') +
      '\n' +
      pad(indent - 2) +
      ']'
    )
  }
  let out = '{\n'
  for (const k in obj) {
    let keyStr = ''
    if (typeof k === 'number' || (!isNaN(k) && k.trim() !== '')) {
      keyStr = k
    } else if (/^[A-Za-z_$][A-Za-z0-9_$]*$/.test(k)) {
      keyStr = k
    } else {
      keyStr = JSON.stringify(k)
    }
    out += pad(indent) + keyStr + ': ' + prettyPrint(obj[k], indent + 2) + ',\n'
  }
  out += pad(indent - 2) + '}'
  return out
}
