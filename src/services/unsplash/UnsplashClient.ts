import { createApi } from "unsplash-js";

export type Unsplash = ReturnType<typeof createApi>;

const UnsplashClient = (unsplash: Unsplash) => ({
  search: (query: string, page: number) => {
    return new Promise<any>((resolve, reject) => {
      unsplash.search.getPhotos({ query, page }).then((res) => {
        let response =
          res.status === 200
            ? res.response
            : { errors: [`Service Unavailable (${res.status})`] };
        return response.hasOwnProperty("errors")
          ? reject(response)
          : resolve(response);
      });
    });
  },
});

export default UnsplashClient;
