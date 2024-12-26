import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import { Check } from 'lucide-react'
import React from "react"

interface PlatformCardProps {
  name: string
  icon: React.ReactNode
  apy: number | null
  totalSupplied: number | null
  isSelected: boolean
  onClick: () => void
}

export function PlatformCard({ name, icon, apy, totalSupplied, isSelected, onClick }: PlatformCardProps) {
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
          {icon}
          <span className="font-medium text-[#03624C]">Lend on {name}</span>
        </div>
        {isSelected && (
          <Check className="absolute right-3 top-3 h-4 w-4 text-[#17876D]" />
        )}
      </div>
      <div className="mt-2 flex items-center gap-1">
        <span className="text-sm text-[#8D9C9C]">APY:</span>
        <span className="text-sm font-semibold text-[#03624C]">
          {apy ? `${apy.toFixed(2)}%` : 'Loading...'}
        </span>
      </div>
      {totalSupplied !== null && (
        <div className="mt-1 flex items-center gap-1">
          <span className="text-sm text-[#8D9C9C]">Total Supplied:</span>
          <span className="text-sm font-semibold text-[#03624C]">
            ${totalSupplied.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </span>
        </div>
      )}
    </Card>
  )
}
