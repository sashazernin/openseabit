import { ethers, JsonRpcProvider } from "ethers";
import { Chain, OpenSeaSDK } from "opensea-js";

export const baseUrl = 'https://api.opensea.io/api/v2/'
export const openSeaKey = process.env.REACT_APP_OPEN_SEA_KEY
export const infuraKey = process.env.REACT_APP_INFURA_KEY

export const provider = new JsonRpcProvider(`https://base-mainnet.infura.io/v3/${infuraKey}`);

export const walletWithProvider = new ethers.Wallet('89e864e353efde829e6fefdaace7a86530bddfa7285fb3db64ff9444a30f29ea', provider);

export const openseaSDK = new OpenSeaSDK(walletWithProvider, {
  chain: Chain.Mainnet,
  apiKey: openSeaKey,
});