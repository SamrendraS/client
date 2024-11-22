import { NextPage } from "next";
import React from "react";

import { AppSidebar } from "@/components/app-sidebar";
import Defi from "@/components/defi";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

const DefiPage: NextPage = () => {
  return (
    <div className="flex w-full overflow-x-hidden">
      <AppSidebar />

      <div className="flex flex-1 flex-col justify-between">
        <div className="flex w-full flex-col items-center overflow-hidden py-3">
          <Navbar className="px-7" />

          {/* <Tabs /> */}
          <Defi />
        </div>

        <div className="lg:hidden">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default DefiPage;
