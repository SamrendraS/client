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
  variant?: 'primary' | 'secondary' | 'tertiary';  // Added variant instead of boolean primary
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
  const baseStyles = "grow rounded-xl px-4 py-2.5 text-sm font-medium transition-all";
  
  const variantStyles = {
    primary: "bg-[#17876D] text-white hover:bg-[#146D57]",
    secondary: "bg-[#E9F3F0] text-[#17876D] border border-[#17876D33] hover:bg-[#DBE9E4]",
    tertiary: "bg-white text-[#17876D] border border-[#17876D33] hover:bg-[#F7FAF9]"
  };

  const styles = variantStyles[action.variant || 'primary'];

  return (
    <Link
      href={action.link}
      target="_blank"
      rel="noopener noreferrer"
      className="flex min-w-0 flex-1 basis-0"
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
      <Button className="w-full rounded-xl bg-[#E9F3F0] px-4 py-2.5 text-sm font-medium text-[#17876D] hover:bg-[#DBE9E4]">
        Coming soon
      </Button>
    );
  }

  // For single button, use full width
  if (actions.length === 1) {
    return (
      <Link
        href={actions[0].link}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full"
      >
        <Button 
          className={cn(
            "w-full rounded-xl px-4 py-2.5 text-sm font-medium transition-all",
            "bg-[#17876D] text-white hover:bg-[#146D57]"
          )}
        >
          {actions[0].buttonText}
        </Button>
      </Link>
    );
  }

  // For multiple buttons, use grid layout
  return (
    <div className="grid grid-cols-3 gap-3">
      {actions.map((action, index) => (
        <Link
          key={index}
          href={action.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button 
            className={cn(
              "w-full rounded-xl px-4 py-2.5 text-sm font-medium transition-all",
              {
                "bg-[#17876D] text-white hover:bg-[#146D57]": index === 0,
                "bg-[#E9F3F0] text-[#17876D] border border-[#17876D33] hover:bg-[#DBE9E4]": index === 1,
                "bg-white text-[#17876D] border border-[#17876D33] hover:bg-[#F7FAF9]": index === 2
              }
            )}
          >
            {action.buttonText}
          </Button>
        </Link>
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