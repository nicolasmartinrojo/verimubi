<template>
  <UApp>
    <UHeader>
      <template #left> Welcome to VeriMubi </template>
    </UHeader>

    <UMain>
      <slot />
    </UMain>

    <USeparator icon="i-simple-icons-nuxtdotjs" />

    <UFooter>
      <template #left>
        <p class="text-sm text-muted"></p>
      </template>
    </UFooter>
  </UApp>
</template>
