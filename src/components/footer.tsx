import Link from "next/link";
import React from "react";
import { Icons } from "./Icons";

const Footer = () => {
  return (
    <div className="w-full bg-[#17876D1A]">
      <div className="flex items-center gap-4 px-7 py-8">
        <Link href="https://x.com/endurfi" target="_blank">
          <Icons.twitter className="cursor-pointer" />
        </Link>
        <Link href="https://t.me/+jWY71PfbMMIwMTBl" target="_blank">
          <Icons.telegram className="cursor-pointer" />
        </Link>
        <Link href="https://docs.endur.fi/" target="_blank">
          <Icons.doc className="cursor-pointer" />
        </Link>
      </div>

      <Link
        href="https://t.me/+jWY71PfbMMIwMTBl"
        target="_blank"
        className="flex items-center gap-3 border-t border-[#075A5A1A] px-7 py-3 text-[#03624C]"
      >
        <Icons.chat />
        Support
      </Link>
    </div>
  );
};

export default Footer;
