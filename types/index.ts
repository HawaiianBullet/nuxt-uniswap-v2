import type ContractBase from "~/services/contract/ContractBase";

export interface IToken {
  address: string;
  decimals: number;
  symbol: string;
  chainId: number;
}

export interface IContractFunction {
  ref: ContractBase;
  func: string;
  callData: any[];
}
