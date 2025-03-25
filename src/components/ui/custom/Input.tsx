
import * as React from "react"
import { Input as BaseInput } from "../input"
import { cn } from "@/lib/utils"

interface CustomInputProps extends React.ComponentProps<typeof BaseInput> {
  // You can add any custom props here if needed
}

const Input = React.forwardRef<HTMLInputElement, CustomInputProps>(
  ({ className, ...props }, ref) => {
    return (
      <BaseInput
        ref={ref}
        className={cn(
          "w-full",
          className
        )}
        {...props}
      />
    )
  }
)
Input.displayName = "CustomInput"

export { Input }
