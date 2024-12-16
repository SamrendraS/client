import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
export interface TokenDisplay {
  icon: React.ReactNode;
  name: string;
}

export interface ProtocolBadge {
  type: string;
  color: string;
}

export interface ProtocolAction {
  type: string;
  link: string;
  buttonText: string;
  primary?: boolean;
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
  actions: ProtocolAction[];
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

const ActionButton: React.FC<{ action: ProtocolAction }> = ({ action }) => {
  const baseStyles = "w-full rounded-full px-4 py-2.5 text-sm font-medium transition-colors";
  
  const styles = action.primary
    ? "bg-[#17876D] text-white hover:bg-[#146D57]"
    : "bg-[#E9F3F0] text-[#17876D] hover:bg-[#D7E8E3]";

  return (
    <Link
      href={action.link}
      target="_blank"
      rel="noopener noreferrer"
      className="flex-1"
    >
      <Button className={cn(baseStyles, styles)}>
        {action.buttonText}
      </Button>
    </Link>
  );
};

const ActionButtons: React.FC<{ actions: ProtocolAction[] }> = ({ actions }) => {
  if (actions.length === 0) {
    return (
      <Button className="w-full rounded-full bg-[#03624C4D] px-4 py-2.5 text-sm font-medium text-[#17876D] hover:bg-[#03624C4D]">
        Coming soon
      </Button>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {actions.map((action, index) => (
        <ActionButton key={index} action={action} />
      ))}
    </div>
  );
};

const DefiCard: React.FC<DefiCardProps> = ({
  tokens,
  protocolIcon,
  badges,
  description,
  apy,
  actions
}) => {
  return (
    <div className="flex h-auto min-h-[200px] w-full min-w-[330px] flex-col rounded-xl bg-white p-5">
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

      <div className="mt-auto pt-4">
        <ActionButtons actions={actions} />
      </div>
    </div>
  );
};

export default DefiCard;