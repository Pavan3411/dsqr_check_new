"use client"

import { useId } from "react"
import { Switch } from "@/components/ui/switch"

export function SwitchWithLabel({
  label,
  checked,
  onCheckedChange,
  className = "",
  ...props
}) {
  const id = useId()

  return (
    <label
      htmlFor={id}
      className={`flex items-center gap-2 cursor-pointer select-none ${className}`}
    >
      <Switch
        id={id}
        checked={checked}
        onCheckedChange={onCheckedChange}
        {...props}
      />
      {label && (
        <span className="text-xs md:text-sm text-black font-bold whitespace-nowrap">
          {label}
        </span>
      )}
    </label>
  )
}
