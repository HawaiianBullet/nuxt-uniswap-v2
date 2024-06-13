import { ethers, type Signer } from "ethers";
import { ISwapRouter } from "~/constants/abi";
import ContractBase from "./ContractBase";

export default class SwapRouter extends ContractBase {
  protected override contract;

  constructor(address: string, chainId = 97) {
    const provider = ContractBase.getRpcProvider(chainId);
    super(provider, address, ISwapRouter);
    this.contract = new ethers.Contract(address, ISwapRouter, provider);
  }

  async getAmountsOut(amountIn: ethers.BigNumber, path: string[]) {
    const res = await this.contract.getAmountsOut(amountIn, path);
    console.log("getAmountsOut", { res });
    return res[path.length - 1];
  }

  async getAmountsIn(amountOut: ethers.BigNumber, path: string[]) {
    const res = await this.contract.getAmountsIn(amountOut, path);
    console.log("getAmountsIn", { res });
    return res[0];
  }
}
