<script setup lang="ts">
import { ethers } from "ethers";
import { useSwapQuote } from "~/composables/queries/useSwapQuote";
import ERC20 from "~/services/contract/ERC20";
import type { IToken } from "~/types";

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

const pBORAContract = new ERC20(pBORA);
const USDCContract = new ERC20(USDC);
onMounted(async () => {
  const allowance = await pBORAContract.allowance(
    "0x1a7c00a4F78b3fb1194F539D8D4d3c500617fc1f",
    swapRouterAddress
  );
  const wei = ethers.utils.formatUnits(allowance, pBORA.decimals);
  console.log({ allowance }, { wei });
});
</script>

<template>
  <div>
    <h1>Liquidity Page</h1>
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
    <div>
      <button>Approve {{ pBORA.symbol }}</button>
      <button>Approve {{ USDC.symbol }}</button>
      <button>Add Liquidity</button>
    </div>
  </div>
</template>

<style scoped></style>
