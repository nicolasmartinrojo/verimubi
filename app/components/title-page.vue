<template>
  <h1>{{ title }}</h1>
</template>

<script setup lang="ts">
interface Props {
  title: string;
}
defineProps<Props>();
</script>
