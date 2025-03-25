
import * as React from "react"
import { Input as BaseInput } from "../input"
import { cn } from "@/lib/utils"

interface CustomInputProps extends React.ComponentPropsWithoutRef<typeof BaseInput> {
  // Você pode adicionar propriedades personalizadas aqui se necessário
}

const Input = React.forwardRef<HTMLInputElement, CustomInputProps>(
  ({ className, ...props }, ref) => {
    return (
      <BaseInput
        ref={ref}
        className={cn(
          "w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
    )
  }
)
Input.displayName = "CustomInput"

export { Input }
