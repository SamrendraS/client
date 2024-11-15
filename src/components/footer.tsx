import Link from "next/link";
import React from "react";
import { Icons } from "./Icons";

const Footer = () => {
  return (
    <div className="w-full bg-[#17876D1A]">
      <div className="flex items-center gap-4 px-7 py-8">
        <Icons.twitter className="cursor-pointer" />
        <Icons.discord className="cursor-pointer" />
        <Icons.telegram className="cursor-pointer" />
        <Icons.doc className="cursor-pointer" />
      </div>

      <Link
        href="#"
        className="flex items-center gap-3 border-t border-[#075A5A1A] px-7 py-3 text-[#03624C]"
      >
        <Icons.chat />
        Support
      </Link>
    </div>
  );
};

export default Footer;
