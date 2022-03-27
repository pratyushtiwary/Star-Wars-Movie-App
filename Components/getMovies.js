export default async function getMovies() {
  return await new Promise((r, e) => {
    const url = "https://swapi-graphql.netlify.app/.netlify/functions/index";
    const query = `query ($after: String) {
    allFilms(after: $after) {
        films {
        id
        director
        producers
        releaseDate
        title
        }
    totalCount
        pageInfo {
        endCursor
        }
    }
    }
    `;
    const options = {};
    options.method = "POST";
    options.headers = { "Content-Type": "application/json" };
    options.body = JSON.stringify({ query, variables: { after: null } });
    fetch(url, options)
      .then((res) => res.json())
      .then((res) => r(res))
      .catch((err) => e(err));
  });
}
