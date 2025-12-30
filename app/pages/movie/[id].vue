<template>
  <div v-if="movie">
    <UContainer>
      <UHeader>
        <template #left>
          <UPageHeader :title="id" />
        </template>
        <template #right>
          <h2>Volver a la lista</h2>
        </template>
      </UHeader>
      <UPageCard :title="`${movie.Title}(${movie.Year})`" variant="subtle">
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
const route = useRoute();
const { id } = route.params;

const { data: movie } = await useFetch<MovieFull>(`/api/movies/${id}`);
</script>
