import { gql } from "@apollo/client";
import { NextResponse } from "next/server";
import { Contract } from "starknet";

import WqAbi from "@/abi/wq.abi.json";
import apolloClient from "@/lib/apollo-client";

import { getProvider } from "../../../../../constants";

export const revalidate = 0;

export async function GET(_req: Request) {
  const provider = getProvider();

  if (!provider) {
    return NextResponse.json("Provider not found");
  }

  const wqContract = new Contract(
    WqAbi,
    "0x518a66e579f9eb1603f5ffaeff95d3f013788e9c37ee94995555026b9648b6",
    provider,
  );

  let contractReqId;
  let apiReqId;

  try {
    const res = await wqContract.call("get_queue_state");
    // @ts-ignore
    contractReqId = Number(res?.max_request_id);
  } catch (error) {
    console.error("contractReqIdError:", error);
    return NextResponse.json({
      message: "contractReqIdError:",
      error,
    });
  }

  try {
    const { data } = await apolloClient.query({
      query: gql`
        query Withdraw_queues($where: Withdraw_queueWhereInput) {
          withdraw_queues(where: $where) {
            amount_strk
            request_id
            receiver
            is_claimed
            claim_time
            timestamp
            tx_hash
          }
        }
      `,
    });

    apiReqId =
      data?.withdraw_queues[data?.withdraw_queues.length - 1]?.request_id;
  } catch (error) {
    console.error("apiReqIdError:", error);
    throw error;
  }

  if (contractReqId === apiReqId) {
    return NextResponse.json({
      status: "active",
      contractReqId,
      apiReqId,
    });
  }

  return NextResponse.json({
    status: "failure",
    contractReqId,
    apiReqId,
  });
}
