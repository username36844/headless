import { GraphQLClient } from "graphql-request";

export const graphql = new GraphQLClient(
  process.env.WP_GRAPHQL_URL!
);