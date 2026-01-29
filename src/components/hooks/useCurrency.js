import { useEffect, useState } from "react";

export function useCurrency() {
  const [currency, setCurrency] = useState("USD");

  useEffect(() => {
    if (typeof document !== "undefined") {
      const cookieMatch = document.cookie.match(/(?:^|; )currency=([^;]+)/);
      if (cookieMatch) {
        setCurrency(cookieMatch[1]);
      }
    }
  }, []);

  return currency;
}
