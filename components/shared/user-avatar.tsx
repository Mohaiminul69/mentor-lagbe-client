import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

type UserAvatarProps = {
  name: string
  image?: string | null
  className?: string
}

const getInitials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("")

export const UserAvatar = ({ name, image, className }: UserAvatarProps) => {
  return (
    <Avatar className={cn("size-9", className)}>
      {image ? <AvatarImage src={image} alt={name} /> : null}
      <AvatarFallback className="bg-accent text-xs font-bold text-accent-foreground">
        {getInitials(name)}
      </AvatarFallback>
    </Avatar>
  )
}
