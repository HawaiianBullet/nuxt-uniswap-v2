<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";
import { ethers } from "ethers";
import SwapRouter from "~/services/contract/SwapRouter";

const input = ref("");
const debounceInput = refDebounced(input, 700);
const output = ref("");
const debounceOutput = refDebounced(input, 700);
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
const swapRouterContract = new SwapRouter(swapRouterAddress);
async function getEstimateOut() {
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
</script>

<template>
  <div>
    <input id="input" type="text" v-model="input" />

    <pre>Input: {{ input }}</pre>
    <pre>debounceInput: {{ debounceInput }}</pre>
    <pre>Output: {{ output }}</pre>
  </div>
</template>

<style scoped></style>
