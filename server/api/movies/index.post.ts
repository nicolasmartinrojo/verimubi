export default eventHandler(async (event) => {
  const body = await readBody(event);
  return {
    message: "movie created",
    movie: body,
  };
});
