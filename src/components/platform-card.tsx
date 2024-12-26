import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import { Check } from 'lucide-react'

interface PlatformCardProps {
  name: string
  logo: string
  apy: string
  isSelected: boolean
  onClick: () => void
}

export function PlatformCard({ name, logo, apy, isSelected, onClick }: PlatformCardProps) {
  return (
    <Card 
      onClick={onClick}
      className={cn(
        "relative cursor-pointer border p-4 transition-all hover:border-[#17876D]",
        isSelected && "border-[#17876D] bg-[#E9F3F0]"
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image
            src={logo}
            alt={name}
            width={24}
            height={24}
            className="rounded-full"
          />
          <span className="font-medium text-[#03624C]">Use {name}</span>
        </div>
        {isSelected && (
          <Check className="absolute right-3 top-3 h-4 w-4 text-[#17876D]" />
        )}
      </div>
      <div className="mt-2 flex items-center gap-1">
        <span className="text-sm text-[#8D9C9C]">APY:</span>
        <span className="text-sm font-semibold text-[#03624C]">{apy}</span>
      </div>
    </Card>
  )
}

