<template>
  <div>
    <TitlePage title="Home" />
    <pre>
    <!-- {{ batman }} -->
    </pre>
    <hr style="border: 1px solid black" />
    <ul v-if="movies">
      <li v-for="movie in movies.Search" :key="movie.imdbID">
        <pre>
            <NuxtLink :to="`/movie/${movie.imdbID}`">GOGOGO</NuxtLink>
            {{ movie }}
        </pre>
      </li>
    </ul>
    <UiButton />
  </div>
</template>

<script setup lang="ts">
// const { data: batman } = await useFetch(
//   "https://www.omdbapi.com/?i=tt4116284&apikey=c6bfa3ef"
// );

interface MoviesRes {
  Search: Movie[];
}
const { data: movies } = await useFetch<MoviesRes>("/api/movies");
</script>

<style lang="scss" scoped></style>
