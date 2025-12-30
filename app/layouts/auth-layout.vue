<template>
  <div>
    <NuxtLink to="login">login 1 </NuxtLink>
    <NuxtLink to="login"> login 2</NuxtLink>
    <slot />
    <USeparator icon="i-simple-icons-nuxtdotjs" />
  </div>
</template>
<script setup lang="ts"></script>
