import { BigNumber, Contract, type Signer } from "ethers";
import { IERC20 } from "~/constants/abi";
import type { IToken } from "~/types";
import ContractBase from "./ContractBase";

export default class ERC20 extends ContractBase {
  protected override contract;

  constructor(token: IToken) {
    const provider = ContractBase.getRpcProvider(token.chainId);
    super(provider, token.address, IERC20);
    this.contract = new Contract(token.address, IERC20, provider);
  }

  async symbol() {
    return await this.contract.symbol();
  }

  async totalSupply() {
    return await this.contract.totalSupply();
  }

  async balanceOf(account: string) {
    return await this.contract.balanceOf(account);
  }

  async transfer(recipient: string, amount: BigNumber, signer: Signer) {
    return await this.contract.connect(signer).transfer(recipient, amount);
  }

  async allowance(owner: string, spender: string) {
    return await this.contract.allowance(owner, spender);
  }

  async approve(spender: string, amount: BigNumber, signer: Signer) {
    return await this.contract.connect(signer).approve(spender, amount);
  }
}
