<template>
  <div>
    login
    <form @submit.prevent="onSubmit">
      <input type="email" v-model="email" placeholder="Email" />
      <input type="password" v-model="password" placeholder="Password" />
      <button @click="onSubmit">Login</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from "#app";
definePageMeta({
  layout: "auth-layout",
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
