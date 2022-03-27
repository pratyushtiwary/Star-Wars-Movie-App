export default async function getMovieDetails(id) {
  return await new Promise((r, e) => {
    const url = "https://swapi-graphql.netlify.app/.netlify/functions/index";
    const query = `query ($filmId: ID, $first: Int) {
    film(id: $filmId) {
        openingCrawl
        producers
        releaseDate
        title
        characterConnection(first: $first) {
            characters {
                name
            }
        }
        director
    }
    }
    `;
    const options = {};
    options.method = "POST";
    options.headers = { "Content-Type": "application/json" };
    options.body = JSON.stringify({
      query,
      variables: { filmId: id, first: null },
    });
    fetch(url, options)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.errors) {
          const error = new Error(res.errors[0].message);
          error.success = false;
          e(error);
        } else {
          r(res);
        }
      })
      .catch((err) => {
        const error = err;
        error.success = false;
        e(error);
      });
  });
}
