<template>
  <div>
    <UPageHero
      title="Verimubi"
      description="Un producto necesario para la búsquedas de películas y la trascendencia en el proceso de selección de verifarma"
      class="py-1"
      :ui="{
        container:
          'flex flex-col lg:grid py-4 sm:py-32 lg:py-4 gap-16 sm:gap-y-24',
      }"
    >
      <UContainer class="flex flex-row">
        <div class="basis-5/6">
          <UInput size="xl" placeholder="Search..." class="w-full" />
        </div>
        <div class="basis-1/6 flex px-1">
          <UButton
            type="submit"
            size="xl"
            class="w-full flex fit-content flex justify-center"
          >
            Submit
          </UButton>
        </div>
      </UContainer>
    </UPageHero>
    <UContainer>
      <UPageGrid>
        <UPageCard v-for="(card, index) in cards" :key="index" v-bind="card" />
      </UPageGrid>
    </UContainer>
  </div>
</template>
<script setup lang="ts">
const cards = ref([
  {
    title: "Icons",
    description:
      "Nuxt UI integrates with Nuxt Icon to access over 200,000+ icons from Iconify.",
    icon: "i-lucide-smile",
    to: "/docs/getting-started/integrations/icons",
  },
  {
    title: "Icons",
    description:
      "Nuxt UI integrates with Nuxt Icon to access over 200,000+ icons from Iconify.",
    icon: "i-lucide-smile",
    to: "/docs/getting-started/integrations/icons",
  },
  {
    title: "Icons",
    description:
      "Nuxt UI integrates with Nuxt Icon to access over 200,000+ icons from Iconify.",
    icon: "i-lucide-smile",
    to: "/docs/getting-started/integrations/icons",
  },
  {
    title: "Fonts",
    description:
      "Nuxt UI integrates with Nuxt Fonts to provide plug-and-play font optimization.",
    icon: "i-lucide-a-large-small",
    to: "/docs/getting-started/integrations/fonts",
  },
  {
    title: "Color Mode",
    description:
      "Nuxt UI integrates with Nuxt Color Mode to switch between light and dark.",
    icon: "i-lucide-sun-moon",
    to: "/docs/getting-started/integrations/color-mode",
  },
]);
</script>
