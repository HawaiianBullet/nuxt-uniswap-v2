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

  async swapExactTokensForTokens(
    amountIn: ethers.BigNumber,
    amountOutMin: ethers.BigNumber,
    path: string[],
    to: string,
    deadline: ethers.BigNumber,
    signer: Signer
  ) {
    const res = await this.contract
      .connect(signer)
      .swapExactTokensForTokens(amountIn, amountOutMin, path, to, deadline);
    console.log("swapExactTokensForTokens", { res });
    return res;
  }
}
