<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";
import { ethers } from "ethers";
import SwapRouter from "~/services/contract/SwapRouter";

// const useGetAddress = () => {
//   const address = ref("");
//   async function getAddress() {
//     console.log("getAddress...");
//     await window.ethereum.request({ method: "eth_requestAccounts" });
//     const provider = new ethers.providers.Web3Provider(window.ethereum);
//     const signer = provider.getSigner();
//     address.value = await signer.getAddress();
//   }

//   return {
//     address,
//     getAddress,
//   };
// };

// router : 0x1E030e0Af239d310DaC115B5d2fd6Ca8daA67828

// bBORA  : 0x75F57E05D3fab800DC0aFeb1856639E5963709E3
// USDT    : 0x3cC52BFD4a7c89315cd13114cD6b593F1b4efa42

// bBORA - USDT : 0xd9150591618c8de7b698A2fF43D2961fFe4A8Bb5
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
const input = ref("");
const output = ref("");
async function getEstimateOut() {
  const amountOut = await swapRouterContract.getAmountsOut(
    ethers.utils.parseUnits(input.value, bBORA.decimals),
    [bBORA.address, USDT.address]
  );
  const amountOutETH = ethers.utils.formatUnits(amountOut, USDT.decimals);
  output.value = amountOutETH;
  return amountOutETH;
}
// async function getEstimateIn() {
//   const amountIn = await swapRouterContract.getAmountsIn(
//     ethers.utils.parseUnits(output.value, USDT.decimals),
//     [bBORA.address, USDT.address]
//   );
//   const amountInETH = ethers.utils.formatUnits(amountIn, USDT.decimals);
//   input.value = amountInETH;
//   return amountInETH;
// }

const isEstimateOutEnabled = computed(() => {
  console.log("isEstimateOutEnabled", input.value);
  return Number(input.value) > 0;
});
// const isEstimateInEnabled = computed(() => Number(output.value) > 0);
useQuery({
  queryKey: ["estimateOut", input],
  queryFn: getEstimateOut,
  enabled: isEstimateOutEnabled,
});
// useQuery({
//   queryKey: ["estimateIn", output],
//   queryFn: getEstimateIn,
//   enabled: false,
// });
const changeInputValue = useDebounceFn((e) => {
  console.log("changeInput", e.target.value);
  input.value = e.target.value;
}, 700);
// const changeOutputValue = useDebounceFn((e) => {
//   output.value = e.target.value;
// }, 700);
</script>

<template>
  <div>
    <label for="input"
      >Input
      <input id="input" type="text" :value="input" @change="changeInputValue" />
    </label>
    <label for="output"
      >Output
      <input id="output" type="text" :value="output" />
    </label>
    <pre>Input: {{ input }}</pre>
    <pre>Output: {{ output }}</pre>
  </div>
</template>

<style scoped></style>
