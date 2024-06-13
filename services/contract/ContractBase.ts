import { Contract, ethers } from "ethers";

export default abstract class ContractBase {
  protected abi: any;
  protected contract: Contract;
  protected address: string;
  protected iContract: ethers.utils.Interface;

  protected constructor(
    provider: ethers.providers.Provider,
    contractAddress: string,
    abi: any
  ) {
    this.abi = abi;
    this.address = contractAddress;
    this.contract = new Contract(contractAddress, abi, provider);
    this.iContract = new ethers.utils.Interface(abi);
  }

  public getCallData(func: string, args: any[]) {
    const encoded = this.iContract.encodeFunctionData(func, args);
    return {
      ref: this,
      func,
      callData: [this.address, encoded],
    };
  }

  public decodeFunctionResult(func: string, byteData: any) {
    return this.iContract.decodeFunctionResult(func, byteData);
  }

  protected static getRpcProvider(chainId: number) {
    return new ethers.providers.JsonRpcProvider(getChainRpcUrl(chainId));
  }
}
