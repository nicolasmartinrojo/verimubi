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
          <UInput
            size="xl"
            placeholder="Search..."
            class="w-full"
            v-model="search"
          />
        </div>
        <div class="basis-1/6 flex px-1">
          <UButton
            type="submit"
            size="xl"
            class="w-full flex fit-content flex justify-center"
            @click="onSubmit"
          >
            Submit
          </UButton>
        </div>
      </UContainer>
    </UPageHero>
    <UContainer>
      <UPageGrid>
        <UBlogPost v-for="(card, index) in cards" v-bind="card" :key="index" />
        <!-- <UPageCard
          v-for="(card, index) in cards"
          :key="index"
          v-bind="card"
          variant="subtle"
        >
          <img :src="card.image" alt="Tailwind CSS" class="w-full" />
        </UPageCard> -->
      </UPageGrid>
    </UContainer>
  </div>
</template>
<script setup lang="ts">
import type { NuxtError } from "#app";
import type { BlogPostProps } from "@nuxt/ui";

interface MoviesRes {
  Search: Movie[];
}
const cards = ref<BlogPostProps[]>([]);

const search = ref("");
const onSubmit = async () => {
  try {
    const { data: resMovies } = await useFetch<MoviesRes>("/api/movies", {
      query: { search: search.value },
    });
    if (!resMovies.value?.Search) return;

    cards.value = resMovies.value?.Search.map((resMovie) => ({
      title: resMovie.Title,
      date: resMovie.Year,
      image: resMovie.Poster,
      to: `/movie/${resMovie.imdbID}`,
    }));
  } catch (error) {
    const err = error as NuxtError;
    console.log({
      message: err.statusMessage,
      code: err.statusCode,
    });
  }
};
</script>
