import Link from "next/link";
import { Button } from "./ui/button";
import React from "react";
import { cn } from "@/lib/utils";

interface TokenDisplay {
  icon: React.ReactNode;
  name: string;
}

interface ProtocolBadge {
  type: string;
  color: string;
}

interface DefiCardProps {
  tokens: TokenDisplay[];
  protocolIcon: React.ReactNode;
  badges: ProtocolBadge[];
  description: string;
  apy?: {
    isLoading: boolean;
    error: boolean;
    value: number | null;
  };
  link?: string;
}

const TokenPairDisplay: React.FC<{ tokens: TokenDisplay[] }> = ({ tokens }) => (
  <div className="flex items-center gap-2">
    <div className="flex items-center">
      {tokens[0].icon}
      {tokens[1]?.icon && (
        <div className="-ml-2 size-6 rounded-full border-[1.5px] border-white bg-white">
          {tokens[1].icon}
        </div>
      )}
    </div>
    <span className="text-sm font-medium">
      {tokens.map(t => t.name).join("/")}
    </span>
  </div>
);

const ApyDisplay: React.FC<{ apy: DefiCardProps['apy'] }> = ({ apy }) => {
  if (!apy) return null;

  const renderValue = () => {
    if (apy.isLoading) return "Loading...";
    if (apy.error || apy.value === null) return "-";
    return `${apy.value.toFixed(2)}%`;
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-[#8D9C9C]">APY</span>
      <span className="text-lg font-semibold text-[#17876D]">
        {renderValue()}
      </span>
    </div>
  );
};

const ProtocolBadges: React.FC<{ badges: ProtocolBadge[] }> = ({ badges }) => (
  <div className="flex flex-wrap gap-1.5 justify-end max-w-[180px]">
    {badges.map((badge, index) => (
      <div
        key={index}
        className={cn("rounded-full px-2.5 py-1 text-xs whitespace-nowrap", badge.color)}
      >
        {badge.type}
      </div>
    ))}
  </div>
);

const DefiCard: React.FC<DefiCardProps> = ({
  tokens,
  protocolIcon,
  badges,
  description,
  apy,
  link
}) => {
  return (
    <div className="flex h-[200px] w-full min-w-[330px] flex-col rounded-xl bg-white p-5">
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-2">
          <TokenPairDisplay tokens={tokens} />
          <ApyDisplay apy={apy} />
        </div>
        
        <div className="flex items-center gap-2">
          <ProtocolBadges badges={badges} />
          {protocolIcon}
        </div>
      </div>

      <h3 className="mt-4 text-sm text-[#4B5563]">{description}</h3>

      <div className="mt-auto">
        {link ? (
          <Link
            href={link} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-full"
          >
            <Button className="w-full rounded-full bg-[#17876D] px-4 py-2 text-xs font-medium text-white hover:bg-[#146D57] transition-colors">
              Launch App
            </Button>
          </Link>
        ) : (
          <Button className="w-full rounded-full bg-[#03624C4D] px-4 py-2 text-xs font-medium text-[#17876D] hover:bg-[#03624C4D]">
            Coming soon
          </Button>
        )}
      </div>
    </div>
  );
};

export default DefiCard;