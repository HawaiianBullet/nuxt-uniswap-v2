<script setup lang="ts">
import { ethers } from "ethers";
import { useSwapQuote } from "~/composables/queries/useSwapQuote";
import ERC20 from "~/services/contract/ERC20";
import MultiCall from "~/services/contract/MultiCall";
import SwapRouter from "~/services/contract/SwapRouter";
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
const accountAddress = "0x1a7c00a4F78b3fb1194F539D8D4d3c500617fc1f";

async function approveToken() {
  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });
  console.log({ accounts });
  const w3p = new ethers.providers.Web3Provider(window.ethereum);
  const signer = w3p.getSigner();
  const pBORAContract = new ERC20(pBORA);
  await pBORAContract.approve(
    swapRouterAddress,
    ethers.utils.parseUnits(input.value, pBORA.decimals),
    signer
  );
}

async function swapToken() {
  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });
  console.log({ accounts });
  const w3p = new ethers.providers.Web3Provider(window.ethereum);
  const signer = w3p.getSigner();
  const me = await signer.getAddress();
  console.log({ me });
  const swapRouterContract = new SwapRouter(swapRouterAddress, pBORA.chainId);
  await swapRouterContract.swapExactTokensForTokens(
    {
      amountIn: ethers.utils.parseUnits(input.value, pBORA.decimals),
      amountOutMin: ethers.utils.parseUnits(output.value, USDC.decimals),
      path: [pBORA.address, USDC.address],
      to: me,
      deadline: (Math.floor(Date.now() / 1000) + 5000).toString(),
    },
    signer
  );
}

const inputBalance = ref("");
const outputBalance = ref("");
onMounted(async () => {
  const pBORAContract = new ERC20(pBORA);
  const USDCContract = new ERC20(USDC);
  const multicall = new MultiCall(pBORA.chainId);
  const cds = [
    pBORAContract.getCallData("balanceOf", [accountAddress]),
    USDCContract.getCallData("balanceOf", [accountAddress]),
  ];
  const res = await multicall.call(cds);
  console.log({ res });
  inputBalance.value = ethers.utils.formatUnits(res[0][0], pBORA.decimals);
  outputBalance.value = ethers.utils.formatUnits(res[1][0], USDC.decimals);
});
</script>

<template>
  <div>
    <h1>Liquidity Page</h1>
    <p>Input: {{ pBORA.symbol }}</p>
    <p>balance: {{ inputBalance }}</p>
    <input
      id="input"
      type="text"
      v-model="input"
      @focus="focusOn = 'input'"
      @blur="focusOn = 'none'"
    />
    <p>Output: {{ USDC.symbol }}</p>
    <p>balance: {{ outputBalance }}</p>
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
      <button @click="swapToken">Swap Token</button>
    </div>
  </div>
</template>

<style scoped></style>
