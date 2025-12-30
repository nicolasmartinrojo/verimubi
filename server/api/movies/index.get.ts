interface MoviesRes {
  Search: Movie[];
}

export default eventHandler(async (event) => {
  const { search } = getQuery(event);
  const { omdb_api_key } = useRuntimeConfig();

  const data = await $fetch<MoviesRes>(
    `https://www.omdbapi.com/?s=${search}&apikey=${omdb_api_key}`
  );
  return data;
});
