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
const email = ref("nicolas.martin.rojo@gmail.com");
const password = ref("123123");

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
    await navigateTo("/dashboard");
  } catch (error) {
    const err = error as NuxtError;
    console.log({
      message: err.statusMessage,
      code: err.statusCode,
    });
  }
};
</script>
