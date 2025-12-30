interface MoviesRes {
  Search: Movie[];
}

export default eventHandler(async (event) => {
  const { search } = getQuery(event);
  const data = await $fetch<MoviesRes>(
    `https://www.omdbapi.com/?s=${search}&apikey=c6bfa3ef`
  );
  return data;
});
