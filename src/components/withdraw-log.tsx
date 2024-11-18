import Link from "next/link";
import React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { getWithdrawLogs } from "@/store/transactions.atom";

import { Icons } from "./Icons";

const WithdrawLog: React.FC = () => {
  const [withdawals, setWithdawals] = React.useState<any>();

  React.useEffect(() => {
    (async () => {
      const res = await getWithdrawLogs();
      setWithdawals(res?.withdraw_queues);
      console.log(res?.withdraw_queues);
    })();
  }, [withdawals]);

  return (
    <Table>
      <TableHeader>
        <TableRow className="border-none bg-gradient-to-t from-[#11998E40] to-[#38EF7D00] hover:bg-gradient-to-t">
          <TableHead className="pl-3 font-normal text-black sm:w-[100px]">
            ID
          </TableHead>
          <TableHead className="min-w-[120px] shrink-0 px-0 text-center font-normal text-black sm:!pl-10">
            Amount in STRK
          </TableHead>
          <TableHead className="pr-3 text-right font-normal text-black">
            Status
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[...Array(15)].map((item, i) => (
          <TableRow
            key={i}
            className={cn("rounded-2xl border-0 bg-white hover:bg-white", {
              "bg-[#E3EFEC80] hover:bg-[#E3EFEC80]": i % 2 === 0,
            })}
          >
            <TableCell className="pl-4 font-thin text-[#939494]">
              STRK0{i + 1}
            </TableCell>
            <TableCell className="text-center font-thin text-[#939494] sm:pl-12">
              500
            </TableCell>
            {i % 2 === 0 ? (
              <TableCell className="flex justify-end pr-4 text-right font-thin text-[#17876D]">
                <Link
                  href="#"
                  className="group flex w-fit items-center justify-end gap-1 transition-all"
                >
                  <span className="group-hover:underline">Success</span>
                  <Icons.externalLink className="group-hover:opacity-80" />
                </Link>
              </TableCell>
            ) : (
              <TableCell className="flex flex-col items-end pr-4 text-right font-thin">
                Pending
                <span className="text-sm text-[#939494]">21 days est</span>
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default WithdrawLog;
