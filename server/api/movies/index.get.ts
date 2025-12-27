interface MoviesRes {
  Search: Movie[];
}

export default eventHandler(async () => {
  const data = await $fetch<MoviesRes>(
    "https://www.omdbapi.com/?s=batman&apikey=c6bfa3ef"
  );
  return data;
});
