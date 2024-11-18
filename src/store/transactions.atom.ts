import { gql } from "@apollo/client";

import apolloClient from "@/lib/apollo-client";

export async function getWithdrawLogs() {
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
          }
        }
      `,
    });

    return data;
  } catch (error) {
    console.error("GraphQL Error:", error);
    throw error;
  }
}
