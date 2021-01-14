import { createApi } from "unsplash-js";
import SearchPageStore from "./ui-stores/SearchPageStore";
import UnsplashClient from "../services/unsplash/UnsplashClient";
import LocalStorageClient from "../services/local_storage/LocalStorageClient";
import PicturesStore from "./model-stores/PicturesStore";
const unsplash = createApi({
  accessKey: "e70d0a75a78f9c17905101410d5b73591f1aa11f82b5207e7ed3da9ef0cab584",
});

const unsplashClient = UnsplashClient(unsplash);
const localStorage = LocalStorageClient(window.localStorage);

class RootStore {
  picturesStore: PicturesStore;
  searchPageStore: SearchPageStore;

  constructor() {
    this.picturesStore = new PicturesStore(this);
    this.searchPageStore = new SearchPageStore(
      this,
      unsplashClient,
      localStorage
    );
  }
}

export default RootStore;
