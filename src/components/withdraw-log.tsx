import { useAccount } from "@starknet-react/core";
import { LoaderCircle } from "lucide-react";
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
import MyNumber from "@/lib/MyNumber";
import { cn, convertFutureTimestamp } from "@/lib/utils";
import { getWithdrawLogs } from "@/store/transactions.atom";

import { Icons } from "./Icons";

const WithdrawLog: React.FC = () => {
  const [withdrawals, setWithdrawals] = React.useState<any>();
  const [loading, setLoading] = React.useState(false);

  const { address } = useAccount();

  React.useEffect(() => {
    (async () => {
      if (!address) return;

      setLoading(true);

      const res = await getWithdrawLogs(address);
      const withdrawalData = res?.withdraw_queues;

      // Filter to keep the record with the latest `claim_time` for each `request_id`
      const uniqueWithdrawals = Object.values(
        withdrawalData.reduce((acc: any, item: any) => {
          if (
            !acc[item.request_id] ||
            acc[item.request_id].claim_time < item.claim_time
          ) {
            acc[item.request_id] = item;
          }
          return acc;
        }, {}),
      );

      setLoading(false);

      setWithdrawals(uniqueWithdrawals.reverse());
    })();
  }, [address]);

  return (
    <Table>
      <TableHeader>
        <TableRow className="border-none bg-gradient-to-t from-[#18a79b40] to-[#38EF7D00] hover:bg-gradient-to-t">
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
        {!address && (
          <TableRow>
            <TableCell></TableCell>
            <TableCell className="flex items-center justify-center py-5 pl-5 text-muted-foreground">
              Please connect your wallet
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        )}

        {loading && (
          <TableRow>
            <TableCell></TableCell>
            <TableCell className="flex items-center justify-center py-5 pl-14 text-muted-foreground">
              <LoaderCircle className="size-5 animate-spin" />
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        )}

        {withdrawals &&
          address &&
          withdrawals?.map((item: any, i: number) => (
            <TableRow
              key={i}
              className={cn("rounded-2xl border-0 bg-white hover:bg-white", {
                "bg-[#E3EFEC80] hover:bg-[#E3EFEC80]": i % 2 === 0,
              })}
            >
              <TableCell className="pl-4 font-thin text-[#939494]">
                {item?.request_id}
              </TableCell>

              <TableCell className="text-center font-thin text-[#939494] sm:pl-12">
                {new MyNumber(item?.amount_strk, 18).toEtherToFixedDecimals(2)}
              </TableCell>

              {item?.is_claimed ? (
                <TableCell className="flex justify-end pr-4 text-right font-thin text-[#17876D]">
                  <Link
                    target="_blank"
                    href={`https://sepolia.starkscan.co/tx/${item?.tx_hash}`}
                    className="group flex w-fit items-center justify-end gap-1 transition-all"
                  >
                    <span className="group-hover:underline">Success</span>
                    <Icons.externalLink className="group-hover:opacity-80" />
                  </Link>
                </TableCell>
              ) : (
                <TableCell className="flex flex-col items-end pr-4 text-right font-thin">
                  Pending
                  <span className="text-sm text-[#939494]">
                    {convertFutureTimestamp(item?.claim_time)}
                  </span>
                </TableCell>
              )}
            </TableRow>
          ))}
        {withdrawals && address && !withdrawals.length && (
          <TableRow>
            <TableCell></TableCell>
            <TableCell className="flex items-center justify-center py-5 pl-5 text-muted-foreground">
              No withdrawals
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default WithdrawLog;
