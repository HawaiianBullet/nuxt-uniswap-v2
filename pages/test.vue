<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";

const fetchCoins = () => {
  return fetch("https://reqres.in/api/users/2").then((response) => {
    const res = response.json();
    console.log({ res });
    return res;
  });
};

const { data, isLoading } = useQuery({
  queryKey: ["test"],
  queryFn: fetchCoins,
});
</script>

<template>
  <div>
    <h1>Test Page</h1>
    <p v-if="isLoading">Loading...</p>
    <pre v-else>{{ data }}</pre>
  </div>
</template>

<style scoped></style>
