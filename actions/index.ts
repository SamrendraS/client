"use server";

import { DuneClient } from "@duneanalytics/client-sdk";

const dune = new DuneClient(process.env.DUNE_API_KEY!);

export const getAvgWaitTime = async () => {
  const query_result = await dune.getLatestResult({ queryId: 4345214 });
  return query_result.result?.rows[0]?.wait_time_hours as string;
};
