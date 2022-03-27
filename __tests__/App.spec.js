import getMovieDetails from "../Components/getMovieDetails";
require("isomorphic-fetch");

test("Testing getMovieDetails", () => {
  getMovieDetails("1234").catch((err) => {
    expect(err.success).toBe(false);
  });

  getMovieDetails("ZmlsbXM6MQ==").then((res) => {
    expect(res.success).toBe(true);
  });
});
