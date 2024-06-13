<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";
import { ethers } from "ethers";
import SwapRouter from "~/services/contract/SwapRouter";

const input = ref("");
const debounceInput = refDebounced(input, 700);
const output = ref("");
const debounceOutput = refDebounced(output, 700);
const focusOn = ref<"none" | "input" | "output">("none");
const bBORA = {
  address: "0x75F57E05D3fab800DC0aFeb1856639E5963709E3",
  decimals: 18,
  symbol: "bBORA",
};
const USDT = {
  address: "0x3cC52BFD4a7c89315cd13114cD6b593F1b4efa42",
  decimals: 18,
  symbol: "USDT",
};
const swapRouterAddress = "0x1E030e0Af239d310DaC115B5d2fd6Ca8daA67828";
async function getEstimateOut() {
  const swapRouterContract = new SwapRouter(swapRouterAddress);
  console.log("call getEstimateOut...");
  const amountOut = await swapRouterContract.getAmountsOut(
    ethers.utils.parseUnits(input.value, bBORA.decimals),
    [bBORA.address, USDT.address]
  );
  const amountOutETH = ethers.utils.formatUnits(amountOut, USDT.decimals);
  output.value = amountOutETH;
  return amountOutETH;
}
const isEstimateOutEnabled = computed(() => {
  return Number(debounceInput.value) > 0;
});
useQuery({
  queryKey: ["estimateOut", debounceInput],
  queryFn: getEstimateOut,
  enabled: isEstimateOutEnabled,
});

async function getEstimateIn() {
  const swapRouterContract = new SwapRouter(swapRouterAddress);
  const amountOut = await swapRouterContract.getAmountsIn(
    ethers.utils.parseUnits(input.value, USDT.decimals),
    [bBORA.address, USDT.address]
  );
  const amountInETH = ethers.utils.formatUnits(amountOut, bBORA.decimals);
  input.value = amountInETH;
  return amountInETH;
}
const isEstimateInEnabled = computed(() => {
  return Number(debounceOutput.value) > 0 && focusOn.value === "output";
});
useQuery({
  queryKey: ["estimateIn", debounceOutput],
  queryFn: getEstimateIn,
  enabled: isEstimateInEnabled,
});
</script>

<template>
  <div>
    <input
      id="input"
      type="text"
      v-model="input"
      @focus="focusOn = 'input'"
      @blur="focusOn = 'none'"
    />
    <pre>foucsOn: {{ focusOn }}</pre>
    <pre>Input: {{ input }}</pre>
    <pre>debounceInput: {{ debounceInput }}</pre>
    <pre>Output: {{ output }}</pre>
    <pre>debounceOutput: {{ debounceOutput }}</pre>
  </div>
</template>

<style scoped></style>
