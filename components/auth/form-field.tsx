import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type FormFieldProps = {
  id: string
  label: string
  type?: string
  value: string
  placeholder?: string
  autoComplete?: string
  error?: string
  onChange: (value: string) => void
}

export const FormField = ({
  id,
  label,
  type = "text",
  value,
  placeholder,
  autoComplete,
  error,
  onChange,
}: FormFieldProps) => {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id} className="text-sm font-semibold">
        {label}
      </Label>
      <Input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 rounded-[10px] px-3.5 text-[15px]"
      />
      {error ? (
        <p id={`${id}-error`} className="text-sm text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  )
}
