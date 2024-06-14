<template>
  <h1>Approve Page</h1>

  <div>
    <p>Input: {{ pBORA.symbol }}</p>
    <input
      id="input"
      type="text"
      v-model="input"
      @focus="focusOn = 'input'"
      @blur="focusOn = 'none'"
    />
    <p>Output: {{ USDC.symbol }}</p>
    <input
      id="output"
      type="text"
      v-model="output"
      @focus="focusOn = 'output'"
      @blur="focusOn = 'none'"
    />
  </div>

  <div>
    <div>--------------------</div>
    <button @click="mutateApprove()">APPROVE</button>
    <button @click="mutateSwap()">SWAP</button>
  </div>
</template>

<script setup lang="ts">
import { useSwapQuote } from "~/composables/queries/useSwapQuote";
import { useTokenApproval } from "~/composables/mutations/useTokenApproval";
import type { IToken } from "~/types";
import { useTokenSwap } from "~/composables/mutations/useTokenSwap";

// const bBORA = {
//   address: "0x75F57E05D3fab800DC0aFeb1856639E5963709E3",
//   decimals: 18,
//   symbol: "bBORA",
//   chainId: 97,
// };

// const USDT = {
//   address: "0x3cC52BFD4a7c89315cd13114cD6b593F1b4efa42",
//   decimals: 18,
//   symbol: "USDT",
//   chainId: 97,
// };

const pBORA = {
  address: "0x7e08f02de8fd971e73c27f9ef4b71b2e7ec16f93",
  decimals: 18,
  symbol: "pBORA",
  chainId: 80002,
} as IToken;

const USDC = {
  address: "0x084803815274565935ddfcc0a968d68d0d0af8ac",
  decimals: 6,
  symbol: "USDC",
  chainId: 80002,
} as IToken;

const swapRouterAddress = "0x2C1683B555c5e693274D1abd597fE8fF72Ed3eB5";

const { input, output, focusOn } = useSwapQuote({
  tokenIn: pBORA,
  tokenOut: USDC,
  address: swapRouterAddress,
});

const { mutateApprove } = useTokenApproval({
  tokenIn: pBORA,
  spender: swapRouterAddress,
  // chainId: 80002,
});

const { mutateSwap } = useTokenSwap({
  input,
  output,
  tokenIn: pBORA,
  tokenOut: USDC,
  spender: swapRouterAddress,
});

onMounted(async () => {});
</script>
