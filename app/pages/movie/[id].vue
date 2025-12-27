<template>
  <div>
    <div>{{ id }}</div>
    <div>{{ movie }}</div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const { id } = route.params;

const movie = await useFetch<Movie>(`/api/movies/${id}`);
</script>
