<template>
  <UApp>
    <UHeader>
      <template #left>
        {{ user.email }}
      </template>

      <template #right>
        <UButton
          target="_blank"
          icon="i-lucide-x"
          aria-label="Logout"
          color="primary"
          variant="ghost"
          @click="logout"
        />
      </template>
    </UHeader>

    <UMain>
      <NuxtPage />
    </UMain>

    <USeparator icon="i-simple-icons-nuxtdotjs" />

    <UFooter>
      <template #left>
        <p class="text-sm text-muted"></p>
      </template>
    </UFooter>
  </UApp>
</template>

<script setup>
useSeoMeta({
  title: "Verimubi - verifarma",
});
const { user, clear: clearUserSession } = useUserSession();
const logout = async () => {
  await clearUserSession();
  await navigateTo("/auth/login");
};
</script>
