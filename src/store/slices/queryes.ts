export const check1Query = `
query CollectionSweepQuoteFlowQuery($collectionSlug: String!, $maxAmountOfItems: Int!, $maxPricePerItem: BigDecimal!, $buyer: Address) {
  sweepCollectionQuote(
    collectionSlug: $collectionSlug
    maxAmountOfItems: $maxAmountOfItems
    maxPricePerItem: $maxPricePerItem
    buyer: $buyer
  ) {
    ...CollectionSweepFlow_quote
    quote {
      ... on CollectionSweepQuoteSuccess {
        itemQuotes {
          ...useSetQuoteItems
          ...useSetItemImageMap
          ...useSetTotalUsdPrice
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
}
fragment CollectionSweepFlow_quote on CollectionSweepQuoteResponse {
  collection {
    imageUrl
    __typename
  }
  ...CollectionSweepQuoteReceipt
  ...CollectionSweepFlowTimeline_quote
  ...CollectionSweepStatus_quote
  ...CollectionSweepReceipt
  __typename
}
fragment CollectionSweepQuoteReceipt on CollectionSweepQuoteResponse {
  collection {
    name
    imageUrl
    isVerified
    __typename
  }
  ...CollectionSweepQuoteReceiptRange
  quote {
    __typename
    ...getCollectionSweepQuoteError
  }
  __typename
}
fragment CollectionSweepQuoteReceiptRange on CollectionSweepQuoteResponse {
  collection {
    chain {
      nativeCurrency {
        symbol
        __typename
      }
      __typename
    }
    __typename
  }
  quote {
    ...getCollectionSweepQuoteError
    __typename
    ... on CollectionSweepQuoteSuccess {
      itemQuotes {
        pricePerItem {
          token {
            unit
            symbol
            __typename
          }
          usd
          __typename
        }
        __typename
      }
      __typename
    }
  }
  __typename
}
fragment getCollectionSweepQuoteError on CollectionSweepQuote {
  __typename
}
fragment CollectionSweepFlowTimeline_quote on CollectionSweepQuoteResponse {
  collection {
    chain {
      identifier
      __typename
    }
    __typename
  }
  quote {
    ...getCollectionSweepQuoteError
    __typename
    ... on CollectionSweepQuoteSuccess {
      itemQuotes {
        pricePerItem {
          token {
            unit
            symbol
            address
            chain {
              identifier
              __typename
            }
            __typename
          }
          usd
          __typename
        }
        __typename
      }
      __typename
    }
  }
  __typename
}
fragment CollectionSweepStatus_quote on CollectionSweepQuoteResponse {
  collection {
    imageUrl
    __typename
  }
  quote {
    __typename
    ... on CollectionSweepQuoteSuccess {
      itemQuotes {
        item {
          id
          imageUrl
          __typename
        }
        __typename
      }
      __typename
    }
  }
  __typename
}
fragment CollectionSweepReceipt on CollectionSweepQuoteResponse {
  ...CollectionSweepQuoteReceipt
  __typename
}
fragment useSetQuoteItems on ItemQuoteResult {
  __typename
  ... on ItemQuote {
    item {
      tokenId
      contractAddress
      chain {
        identifier
        __typename
      }
      __typename
    }
    quantity
    pricePerItem {
      token {
        unit
        contractAddress
        __typename
      }
      __typename
    }
    orderId
    __typename
  }
}
fragment useSetItemImageMap on ItemQuoteResult {
  __typename
  ... on ItemQuote {
    item {
      id
      imageUrl
      __typename
    }
    __typename
  }
}
fragment useSetTotalUsdPrice on ItemQuoteResult {
  __typename
  ... on ItemQuote {
    pricePerItem {
      usd
      __typename
    }
    __typename
  }
}`

export const check2Query = `
query CollectionSweepQuery($paymentAsset: ContractIdentifierInput!, $collectionSlug: String!, $maxAmountOfItems: Int!, $maxPricePerItem: BigDecimal!, $buyer: Address!, $recipient: Address, $blurAuthToken: String) {
  sweepCollection(
    buyer: $buyer
    collectionSlug: $collectionSlug
    maxAmountOfItems: $maxAmountOfItems
    maxPricePerItem: $maxPricePerItem
    paymentAsset: $paymentAsset
    recipient: $recipient
    blurAuthToken: $blurAuthToken
  ) {
    actions {
      ...ActionTimeline
      __typename
    }
    errors {
      ...useSetBlockchainActionErrors
      __typename
    }
    __typename
  }
}
fragment ActionTimeline on BlockchainAction {
  __typename
  ...useScheduler_action
  ...ActionTimelineItem
}
fragment useScheduler_action on BlockchainAction {
  __typename
  ... on BlurAuthAction {
    chain {
      identifier
      __typename
    }
    expiresOn
    hmac
    signatureRequest {
      message
      ...useScheduler_signatureRequest
      __typename
    }
    __typename
  }
  ... on RefreshAction {
    message
    __typename
  }
  ... on SignatureRequestAction {
    signatureRequest {
      ...useScheduler_signatureRequest
      __typename
    }
    __typename
  }
  ... on TransactionAction {
    transactionSubmissionData {
      chain {
        networkId
        identifier
        blockExplorer {
          name
          transactionUrlTemplate
          __typename
        }
        __typename
      }
      ...useScheduler_transactionSubmissionData
      __typename
    }
    __typename
  }
  ... on SvmTransactionAction {
    svmTransactionSubmissionData {
      ...useScheduler_svmTransactionSubmissionData
      __typename
    }
    __typename
  }
  ... on GaslessCancelOrdersAction {
    signatureRequest {
      ...useScheduler_signatureRequest
      __typename
    }
    __typename
  }
  ... on CrossChainCapableAction {
    isCrossChain
    __typename
  }
  ...useScheduler_readShouldBufferGas
}
fragment useScheduler_signatureRequest on SignatureRequest {
  __typename
  message
  ... on SignTypedDataRequest {
    chain {
      networkId
      __typename
    }
    __typename
  }
}
fragment useScheduler_transactionSubmissionData on TransactionSubmissionData {
  to
  data
  value
  chain {
    networkId
    __typename
  }
  __typename
}
fragment useScheduler_svmTransactionSubmissionData on SvmTransactionSubmissionData {
  instructions {
    programId
    data
    keys {
      pubkey
      isSigner
      isWritable
      __typename
    }
    __typename
  }
  addressLookupTableAddresses
  __typename
}
fragment useScheduler_readShouldBufferGas on BlockchainAction {
  __typename
  ... on SwapAssetsAction {
    isCrossChain
    __typename
  }
  ... on TransactionAction {
    transactionSubmissionData {
      chain {
        identifier
        __typename
      }
      __typename
    }
    __typename
  }
}
fragment ActionTimelineItem on BlockchainAction {
  ... on BuyItemAction {
    __typename
    items {
      imageUrl
      id
      __typename
    }
  }
  ... on AcceptOfferAction {
    __typename
    items {
      id
      __typename
    }
  }
  ... on ItemApprovalAction {
    __typename
    item {
      collection {
        name
        imageUrl
        __typename
      }
      __typename
    }
  }
  ... on PaymentApprovalAction {
    __typename
    currency {
      id
      symbol
      __typename
    }
  }
  ... on CreateListingsAction {
    items {
      id
      __typename
    }
    __typename
  }
  ... on UnwrapAction {
    __typename
    transactionSubmissionData {
      to
      chain {
        identifier
        nativeCurrency {
          symbol
          __typename
        }
        wrappedNativeCurrency {
          symbol
          __typename
        }
        __typename
      }
      __typename
    }
  }
  ... on WrapAction {
    __typename
    transactionSubmissionData {
      to
      chain {
        identifier
        nativeCurrency {
          symbol
          __typename
        }
        wrappedNativeCurrency {
          symbol
          __typename
        }
        __typename
      }
      __typename
    }
  }
  ... on MintAction {
    __typename
    collection {
      imageUrl
      __typename
    }
  }
  __typename
}
fragment useSetBlockchainActionErrors on TransactionError {
  __typename
  ... on OrderNotFound {
    item {
      id
      chain {
        identifier
        __typename
      }
      __typename
    }
    __typename
  }
}`