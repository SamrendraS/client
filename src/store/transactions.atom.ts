import { gql } from "@apollo/client";

import apolloClient from "@/lib/apollo-client";
import { standariseAddress } from "@/lib/utils";

export async function getWithdrawLogs(address: string) {
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
      variables: {
        where: {
          receiver: {
            equals: standariseAddress(address),
          },
        },
      },
    });

    return data;
  } catch (error) {
    console.error("GraphQL Error:", error);
    throw error;
  }
}
