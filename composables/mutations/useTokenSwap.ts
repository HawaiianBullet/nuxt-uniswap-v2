import { useMutation } from "@tanstack/vue-query";
import { ethers } from "ethers";
import ERC20 from "~/services/contract/ERC20";
import SwapRouter from "~/services/contract/SwapRouter";
import type { IToken } from "~/types";

export const useTokenSwap = (params: {
  input: Ref<string>;
  output: Ref<string>;
  tokenIn: IToken;
  tokenOut: IToken;
  spender: string;
}) => {
  const { input, output, tokenIn, tokenOut, spender } = params;

  const swap = async () => {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const address = await signer.getAddress();

    console.log(input.value);
    console.log(output.value);
    console.log(ethers.utils.parseUnits(input.value, tokenIn.decimals));
    console.log(ethers.utils.parseUnits(output.value, tokenOut.decimals));

    const swapRouterContract = new SwapRouter(spender, tokenIn.chainId);

    const tx = await swapRouterContract.swapExactTokensForTokens(
      ethers.utils.parseUnits(input.value, tokenIn.decimals),
      ethers.utils.parseUnits(output.value, tokenOut.decimals), // amountOutMin??
      [tokenIn.address, tokenOut.address],
      address,
      ethers.BigNumber.from("0xfffffffffffffff"), //deadline ??
      signer
    );
  };

  const { mutate: mutateSwap } = useMutation({
    mutationKey: ["swap"],
    mutationFn: async () => await swap(),
    onSuccess: () => {},
    onError: (e) => {},
  });

  return {
    mutateSwap,
  };
};
