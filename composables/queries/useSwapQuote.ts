import { useQuery } from "@tanstack/vue-query";
import { ethers } from "ethers";
import SwapRouter from "~/services/contract/SwapRouter";
import type { IToken } from "~/types";

export const useSwapQuote = (params: {
  tokenIn: IToken;
  tokenOut: IToken;
  address: string;
}) => {
  const { tokenIn, tokenOut, address } = params;
  const input = ref("");
  const debounceInput = refDebounced(input, 700);
  const output = ref("");
  const debounceOutput = refDebounced(output, 700);
  const focusOn = ref<"none" | "input" | "output">("none");
  const prevFocus = ref<"none" | "input" | "output">("none");
  const swapRouterContract = new SwapRouter(address, tokenIn.chainId);

  async function getEstimateOut() {
    const amountOut = await swapRouterContract.getAmountsOut(
      ethers.utils.parseUnits(input.value, tokenIn.decimals),
      [tokenIn.address, tokenOut.address]
    );
    const amountOutETH = ethers.utils.formatUnits(amountOut, tokenOut.decimals);
    output.value = amountOutETH;
    return amountOutETH;
  }
  const isEstimateOutEnabled = computed(() => {
    return (
      Number(debounceInput.value) > 0 &&
      (focusOn.value === "input" || prevFocus.value === "input")
    );
  });
  useQuery({
    queryKey: ["estimateOut", debounceInput],
    queryFn: getEstimateOut,
    enabled: isEstimateOutEnabled,
    retry: false,
    refetchOnWindowFocus: false,
  });

  async function getEstimateIn() {
    const amountIn = await swapRouterContract.getAmountsIn(
      ethers.utils.parseUnits(output.value, tokenOut.decimals),
      [tokenIn.address, tokenOut.address]
    );
    const amountInETH = ethers.utils.formatUnits(amountIn, tokenIn.decimals);
    input.value = amountInETH;
    return amountInETH;
  }
  const isEstimateInEnabled = computed(() => {
    return (
      Number(debounceOutput.value) > 0 &&
      (focusOn.value === "output" || prevFocus.value === "output")
    );
  });
  useQuery({
    queryKey: ["estimateIn", debounceOutput],
    queryFn: getEstimateIn,
    enabled: isEstimateInEnabled,
    retry: false,
    refetchOnWindowFocus: false,
  });

  watch(
    () => focusOn.value,
    (newFocus) => {
      if (newFocus !== "none") {
        if (prevFocus.value === newFocus) return;
        prevFocus.value = newFocus;
        input.value = "";
        output.value = "";
      }
    }
  );

  return {
    input,
    output,
    focusOn,
  };
};
