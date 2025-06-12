import { ethers, JsonRpcSigner } from "ethers";
import { Chain, OpenSeaSDK } from "opensea-js";
import { useEffect, useState } from "react";

function useOpenSeaSDK() {
  const [value, setValue] = useState<{ openseaSDK?: OpenSeaSDK, signer?: JsonRpcSigner }>({ openseaSDK: undefined, signer: undefined })

  const getOpenseaSDK = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum, "any");
    await provider.send("eth_requestAccounts", []); // Запрашивает разрешение у пользователя
    const signer = await provider.getSigner();

    const params = new URLSearchParams(window.location.search);
    const openSeaKey = params.get('openSeaKey') ?? '';

    const sdk = new OpenSeaSDK(signer, {
      chain: Chain.Base,
      apiKey: openSeaKey,
    })

    setValue({ openseaSDK: sdk, signer });
  }

  useEffect(() => {
    getOpenseaSDK()
  }, [])

  return value
}

export { useOpenSeaSDK }