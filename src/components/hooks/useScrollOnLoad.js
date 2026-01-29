"use client"
import { useEffect } from "react"

export default function useScrollOnLoad(targetId) {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const scrollTarget = params.get("scroll")

    if (scrollTarget === targetId) {
      const section = document.getElementById(targetId)
      setTimeout(() => {
        section?.scrollIntoView({ behavior: "smooth" })
        // remove ?scroll=... from URL
        window.history.replaceState({}, "", window.location.pathname)
      }, 200)
    }
  }, [targetId])
}
