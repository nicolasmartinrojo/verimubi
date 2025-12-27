const movies = [{ nombre: "lala", id: 2 }];

export default eventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "falta el id",
    });
  }
  const movie = await $fetch<Movie>(
    `https://www.omdbapi.com/?i=${id}&apikey=c6bfa3ef`
  );
  if (!movie) {
    throw createError({
      statusCode: 404,
      statusMessage: "movie no existe",
    });
  }

  return movie;
});
