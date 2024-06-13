import { IMultiCall } from "~/constants/abi";
import ContractBase from "./ContractBase";
import { MultiCallAddress } from "~/constants/contract";
import type { IContractFunction } from "~/types";

export default class MultiCall extends ContractBase {
  constructor(chainId: number) {
    const address = MultiCallAddress[chainId];
    const provider = ContractBase.getRpcProvider(chainId);
    super(provider, address, IMultiCall);
  }

  async call(callData: IContractFunction[]): Promise<any[]> {
    const aggrArgs = callData.map((icf) => icf.callData);
    const res = await this.contract.callStatic.aggregate(aggrArgs);
    const returnData = [];
    for (let i = 0; i < callData.length; i++) {
      returnData.push(
        callData[i].ref.decodeFunctionResult(
          callData[i].func,
          res.returnData[i]
        )
      );
    }
    return returnData;
  }
}
