import {
  borachainChainId,
  bscChainId,
  ethereumChainId,
  klaytnChainId,
  polygonChainId,
} from "~/constants/chain";

const borachainChainConfig = {
  chainId: `0x${borachainChainId.toString(16)}`,
  chainName: "Borachain Testnet",
  rpcUrls: ["https://public-node.api.boraportal.cc/bora/testnet"],
  iconUrls: [],
  nativeCurrency: {
    name: "BORA",
    symbol: "BORA",
    decimals: 18,
  },
  blockExplorerUrls: ["https://scope.boraportal.net/"],
};
const klaytnChainConfig = {
  chainId: `0x${klaytnChainId.toString(16)}`,
  chainName: "Baobab Klaytn Testnet",
  rpcUrls: ["https://public-node.api.boraportal.cc/klaytn/baobab"],
  iconUrls: [],
  nativeCurrency: {
    name: "KLAY",
    symbol: "KLAY",
    decimals: 18,
  },
  blockExplorerUrls: ["https://baobab.klaytnscope.com"],
};
const polygonChainConfig = {
  chainId: `0x${polygonChainId.toString(16)}`,
  chainName: "Polygon Amoy Testnet",
  rpcUrls: ["https://rpc-amoy.polygon.technology/"],
  iconUrls: [],
  nativeCurrency: {
    name: "MATIC",
    symbol: "MATIC",
    decimals: 18,
  },
  blockExplorerUrls: ["https://amoy.polygonscan.com/"],
};
const ethereumChainConfig = {
  chainId: `0x${ethereumChainId.toString(16)}`,
  chainName: "Sepolia",
  rpcUrls: ["https://ethereum-sepolia-rpc.publicnode.com	"],
  iconUrls: [],
  nativeCurrency: {
    name: "ETH",
    symbol: "ETH",
    decimals: 18,
  },
  blockExplorerUrls: ["https://sepolia.etherscan.io/"],
};
const bscChainConfig = {
  chainId: `0x${bscChainId.toString(16)}`,
  chainName: "BNB Smart Chain Testnet",
  rpcUrls: ["https://bsc-testnet.drpc.org"],
  iconUrls: [],
  nativeCurrency: {
    name: "BNB",
    symbol: "BNB",
    decimals: 18,
  },
  blockExplorerUrls: ["https://testnet.bscscan.com/"],
};

export function getChainConfig(chainId: number) {
  if (chainId === klaytnChainId) return klaytnChainConfig;
  else if (chainId === polygonChainId) return polygonChainConfig;
  else if (chainId === ethereumChainId) return ethereumChainConfig;
  else if (chainId === bscChainId) return bscChainConfig;
  else return borachainChainConfig;
}

export function getChainRpcUrl(chainId: number) {
  return getChainConfig(chainId).rpcUrls[0];
}
