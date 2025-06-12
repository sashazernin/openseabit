import { ethers } from "ethers";
import { Chain, OpenSeaSDK } from "opensea-js";

export const baseUrl = 'https://api.opensea.io/api/v2/'
// export const openSeaKey = process.env.REACT_APP_OPEN_SEA_KEY
// export const infuraKey = process.env.REACT_APP_INFURA_KEY

declare global {
  interface Window {
    ethereum?: any;
  }
}