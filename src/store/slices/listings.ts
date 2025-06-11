import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl, openSeaKey } from '../../helpers';

interface Price {
  current: {
    currency: string;
    decimals: number;
    value: string;
  }
}

interface ConsiderationItem {
  itemType: number;
  token: string;
  identifierOrCriteria: string;
  startAmount: string;
  endAmount: string;
  recipient?: string;
}

interface OfferItem {
  itemType: number;
  token: string;
  identifierOrCriteria: string;
  startAmount: string;
  endAmount: string;
}

interface ProtocolData {
  parameters: {
    conduitKey: string;
    consideration: ConsiderationItem[];
    offer: OfferItem[];
    counter: number;
    endTime: string;
    offerer: string;
    orderType: number;
    salt: string;
    startTime: string;
    totalOriginalConsiderationItems: number;
    zone: string;
    zoneHash: string;
  };
}

export interface Listing {
  chain: string;
  order_hash: string;
  price: Price;
  protocol_address: string;
  protocol_data: ProtocolData;
  signature: string | null;
  type: string;
}

type IListingsResponse = {
  listings: Listing[],
  next: string
}

export const listingsApi = createApi({
  reducerPath: 'listings',
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}`,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
      if (openSeaKey) headers.set('x-api-key', openSeaKey);
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['listings'],
  endpoints: (builder) => ({
    getListings: builder.query<Listing[], { collection_slug: string, options: { limit: string } }>({
      query: ({ collection_slug, options }) => {
        const params = new URLSearchParams(options).toString();
        return `listings/collection/${collection_slug}/best?${params}`
      },
      transformResponse: (resp: IListingsResponse) => resp.listings,
      providesTags: ['listings']
    }),
    buyNFT: builder.mutation<any, { listing: { hash: string, chain: string, protocol_address?: string }, fulfiller: { address: string } }>({
      query: (body) => {
        return {
          url: 'listings/fulfillment_data',
          method: 'POST',
          body
        };
      },
    }),
  }),

});

export const {
  useGetListingsQuery,
  useBuyNFTMutation
} = listingsApi;
