<script setup lang="ts">
import { useSwapRatio } from "~/composables/queries/useSwapRatio";

const bBORA = {
  address: "0x75F57E05D3fab800DC0aFeb1856639E5963709E3",
  decimals: 18,
  symbol: "bBORA",
  chainId: 97,
};
const USDT = {
  address: "0x3cC52BFD4a7c89315cd13114cD6b593F1b4efa42",
  decimals: 18,
  symbol: "USDT",
  chainId: 97,
};
const swapRouterAddress = "0x1E030e0Af239d310DaC115B5d2fd6Ca8daA67828";
const { input, output, focusOn } = useSwapRatio({
  tokenIn: bBORA,
  tokenOut: USDT,
  address: swapRouterAddress,
});
</script>

<template>
  <div>
    <p>Input: {{ bBORA.symbol }}</p>
    <input
      id="input"
      type="text"
      v-model="input"
      @focus="focusOn = 'input'"
      @blur="focusOn = 'none'"
    />
    <p>Output: {{ USDT.symbol }}</p>
    <input
      id="output"
      type="text"
      v-model="output"
      @focus="focusOn = 'output'"
      @blur="focusOn = 'none'"
    />
  </div>
</template>

<style scoped></style>
