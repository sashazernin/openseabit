import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { check1Query, check2Query } from './queryes';

interface check1 {
  operationName: string,
  variables: {
    buyer: string,
    collectionSlug: string,
    maxAmountOfItems: number,
    maxPricePerItem: string
  }
}

interface check2 {
  operationName: string,
  variables: {
    buyer: string,
    collectionSlug: string,
    maxAmountOfItems: number,
    maxPricePerItem: string,
    paymentAsset: {
      address: string,
      chain: string
    }
  }
}

export const graphQlApi = createApi({
  reducerPath: 'graphQl',
  baseQuery: fetchBaseQuery({
    baseUrl: `https://gql.opensea.io/graphql`,
    credentials: 'include',
  }),
  tagTypes: ['graphQl'],
  endpoints: (builder) => ({
    check1: builder.mutation<any, check1>({
      query: (body) => {
        return {
          url: '',
          method: 'POST',
          body: {
            ...body,
            query: check1Query
          }
        };
      },
    }),
    check2: builder.mutation<any, check2>({
      query: (body) => {
        return {
          url: '',
          method: 'POST',
          body: {
            ...body,
            query: check2Query
          }
        };
      },
    }),
  }),

});

export const {
  useCheck1Mutation,
  useCheck2Mutation
} = graphQlApi;
