<template>
  <div>
    <UPageHero
      title="Verimubi"
      description="A necessary product for movie searching and move forward in the Verifarma selection process"
      class="py-1"
      :ui="{
        container:
          'flex flex-col lg:grid py-4 sm:py-32 lg:py-4 gap-16 sm:gap-y-24',
      }"
    >
      <form @submit.prevent="onSubmit">
        <UContainer class="flex flex-row">
          <div class="basis-5/6">
            <UInput
              size="xl"
              placeholder="Write some keywords to search for..."
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
              Search
            </UButton>
          </div>
        </UContainer>
      </form>
    </UPageHero>
    <UContainer>
      <UPageGrid>
        <UBlogPost v-for="(card, index) in cards" v-bind="card" :key="index" />
      </UPageGrid>
      <UAlert
        color="error"
        variant="subtle"
        :title="errorMessage"
        v-if="errorMessage"
        icon="i-lucide-terminal"
      />
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
const errorMessage = ref("");
const onSubmit = async () => {
  errorMessage.value = "";
  cards.value = [];
  try {
    const { data: resMovies } = await useFetch<MoviesRes>("/api/movies", {
      query: { search: search.value },
    });
    if (!resMovies.value?.Search) {
      throw createError({
        statusCode: 401,
        statusMessage: "Movie not found",
      });
    }

    cards.value = resMovies.value?.Search.map((resMovie) => ({
      title: resMovie.Title,
      date: resMovie.Year,
      image: resMovie.Poster,
      to: `/movie/${resMovie.imdbID}`,
    }));
  } catch (_error) {
    const err = _error as NuxtError;
    errorMessage.value = err.message as string;
  }
};
</script>
