
import * as React from "react"
import { cn } from "../../lib/utils"

const Switch = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    checked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
  }
>(({ className, checked, onCheckedChange, ...props }, ref) => {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      data-state={checked ? "checked" : "unchecked"}
      value="on"
      className={cn(
        "peer inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-indigo-600 data-[state=unchecked]:bg-zinc-700",
        className
      )}
      onClick={(e) => {
        e.stopPropagation();
        onCheckedChange?.(!checked);
      }}
      ref={ref}
      {...props}
    >
      <span
        data-state={checked ? "checked" : "unchecked"}
        className={cn(
          "pointer-events-none block h-6 w-6 rounded-full bg-white shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
        )}
      />
    </button>
  )
})
Switch.displayName = "Switch"

export { Switch }
