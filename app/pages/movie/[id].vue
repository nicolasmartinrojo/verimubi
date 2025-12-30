<template>
  <div v-if="movie">
    <UContainer>
      <UHeader>
        <template #left>Movie Detail </template>
        <template #right>
          <NuxtLink to="/">Back to movie list</NuxtLink>
        </template>
      </UHeader>
      <UPageHeader :title="`${movie.Title} (${movie.Year})`" />
      <UPageCard variant="subtle">
        <div v-for="key in movieKeys">
          <b>
            {{ key }}
          </b>
          : {{ movie[key] }}
        </div>
        <UPageGrid>
          <UCard
            v-for="rating in movie.Ratings"
            :title="rating.Source"
            :description="rating.Value"
            variant="subtle"
          >
            <template #header>
              {{ rating.Source }}
            </template>
            <template #default>
              {{ rating.Value }}
            </template>
          </UCard>
        </UPageGrid>
      </UPageCard>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: ["authenticated"] });
const route = useRoute();
const { id } = route.params;

const { data: movie } = await useFetch<MovieFull>(`/api/movies/${id}`);
const movieKeys: (keyof MovieFull)[] = [
  "Actors",
  "Plot",
  "Country",
  "Awards",
  "Writer",
  "Metascore",
  "imdbRating",
  "imdbVotes",
  "DVD",
  "BoxOffice",
  "Production",
  "Website",
];
</script>
