import { useMutation } from "@tanstack/vue-query";
import { ethers } from "ethers";
import { bigint } from "zod";
import ERC20 from "~/services/contract/ERC20";
import type { IToken } from "~/types";

export const useTokenApproval = (params: {
  tokenIn: IToken;
  spender: string;
}) => {
  const { tokenIn, spender } = params;

  const checkAllownce = async (
    address: string,
    contract: ERC20,
    spender: string
  ) => {
    const allowance = await contract.allowance(address, spender);
    return allowance;
  };

  const approveMax = async (contract: ERC20, spender: string) => {
    console.log("approveMax");
    const maxApproval = ethers.constants.MaxUint256;
    // const cancelApproval = ethers.BigNumber.from(0);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const tx = await contract.approve(spender, maxApproval, signer);
    return tx;
  };

  const approve = async () => {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const address = await signer.getAddress();
    const erc20Contract = new ERC20(tokenIn);

    console.log("balanceOf", await erc20Contract.balanceOf(address));

    const allowance = await checkAllownce(address, erc20Contract, spender);

    // if (allowance <= swapAmount) ??
    if (Number(allowance) === 0) {
      await approveMax(erc20Contract, spender);
    }
  };

  const { mutate: mutateApprove } = useMutation({
    mutationKey: ["approve"],
    mutationFn: async () => await approve(),
    onSuccess: () => {},
    onError: (e) => {},
  });

  return {
    mutateApprove,
  };
};
