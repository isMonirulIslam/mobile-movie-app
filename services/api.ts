export const TMDB_CONFIG = {
  baseURL: "https://api.themoviedb.org/3",
  apiKey: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
  },
};

export const fetchMovies = async ({ query }: { query: string }) => {
  const endpoint = query
    ? `${TMDB_CONFIG.baseURL}/search/movie?query=${encodeURIComponent(query)}`
    : `${TMDB_CONFIG.baseURL}/discover/movie?sort_by=popularity.desc`;
  const response = await fetch(endpoint, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });

  if (!response.ok) {
    // @ts-ignore
    throw new Error("Failed to fetch popular movies", response?.statusText);
  }
  const data = await response.json();
  return data.results;
};

// const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
// const options = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNWFhY2ViZGFhNThhMDQ5ZmUzMzU5YjQ3Mjg1NzIxMyIsIm5iZiI6MTc1NzgyMTA4NC4xODMsInN1YiI6IjY4YzYzODljNjg4ZTg5ZDY4MmEwZjBiYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zJaIUqT-s_K-Gj1EkIZC75kCqzaTJr7iPm3yUNBeccg'
//   }
// };

// fetch(url, options)
//   .then(res => res.json())
//   .then(json => console.log(json))
//   .catch(err => console.error(err));
