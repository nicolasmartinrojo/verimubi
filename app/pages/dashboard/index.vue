<template>
  <pre>{{ user }}</pre>
  <button @click="getProfile">Get Profile</button>

  <button @click="logout">Logout</button>
</template>

<script setup lang="ts">
definePageMeta({ middleware: ["authenticated"] });
const { user, clear: clearUserSession } = useUserSession();

const getProfile = async () => {
  try {
    const profile = await $fetch("/api/profile");
    console.log(profile);
  } catch (error) {
    console.error("error fetching profile:", error);
  }
};
const logout = async () => {
  await clearUserSession();
  await navigateTo("/auth/login");
};
</script>
