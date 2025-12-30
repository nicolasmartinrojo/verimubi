<template>
  <div>
    <form @submit.prevent="onSubmit">
      <UContainer class="w-100 pt-8">
        <UPageCard title="Login">
          <UFormField label="Email" required>
            <UInput
              size="xl"
              class="w-full"
              type="email"
              v-model="email"
              placeholder="Email"
            />
          </UFormField>
          <UFormField label="Password" required>
            <UInput
              size="xl"
              class="w-full"
              type="password"
              v-model="password"
              placeholder="Password"
            />
          </UFormField>
          <UButton
            type="submit"
            size="xl"
            class="w-full flex fit-content flex justify-center"
          >
            Login
          </UButton>

          <UAlert
            color="error"
            variant="subtle"
            title="Heads up!"
            :description="errorMessage"
            v-if="errorMessage"
            icon="i-lucide-terminal"
          />
          <UAlert
            color="neutral"
            variant="subtle"
            title="Click to autocomplete dummy data"
            icon="i-lucide-terminal"
            @click="
              password = '123123';
              email = 'nicolas.martin.rojo@gmail.com';
            "
          >
          </UAlert>
        </UPageCard>
      </UContainer>
    </form>
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from "#app";
definePageMeta({
  layout: "auth-layout",
});
useSeoMeta({
  title: "Verimubi - Login",
});
const { fetch: refreshUserSession } = useUserSession();
const email = ref("");
const password = ref("");
const errorMessage = ref("");

const onSubmit = async () => {
  try {
    await $fetch("/api/auth/login", {
      method: "POST",
      body: {
        email: email.value,
        password: password.value,
      },
    });
    await refreshUserSession();
    await navigateTo("/");
  } catch (_error) {
    const err = _error as NuxtError;
    errorMessage.value = err.statusMessage as string;
    console.error({
      message: err.statusMessage,
      code: err.statusCode,
    });
  }
};
</script>
