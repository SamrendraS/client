import { ChevronDown } from 'lucide-react';
import React from 'react';

import { Icons } from './Icons';

const Navbar = () => {
  return (
    <div className="w-full flex justify-end items-center h-20">
      <div className="flex items-center gap-4">
        <button className="px-4 h-10 rounded-lg border flex gap-2 items-center justify-center text-[#03624C] border-[#ECECED80] bg-[#AACBC433] text-sm font-bold">
          <Icons.gradient />
          0xb98...3c5e
          <ChevronDown className="size-4 font-bold" />
        </button>
        <div className="bg-[#AACBC433] w-8 h-8 rounded-full flex items-center justify-center">
          <Icons.notification />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
