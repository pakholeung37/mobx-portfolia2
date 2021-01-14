import { observable, action, makeObservable } from "mobx";
import LocalStorageClient from "../../services/local_storage/LocalStorageClient";
import UnsplashClient from "../../services/unsplash/UnsplashClient";
import RootStore from "../RootStore";
import { listPictures } from "./CommonActions";

export type Picture = {
  id: string;
  description: string;
  urls: any;
  user: any;
  isFavorite: boolean;
  error: boolean | string;
};

export default class SearchPageStore {
  rootStore: RootStore;
  transportLayer: ReturnType<typeof UnsplashClient>;
  localStorageClient: ReturnType<typeof LocalStorageClient>;
  listPictures: () => any[];

  @observable
  isLoading: boolean = false;

  @observable
  currentPage: number = 1;

  @observable
  totalPages: number = 0;

  @observable
  search: string = "";

  @observable
  errors: string[] = [];

  constructor(
    rootStore: RootStore,
    transportLayer: ReturnType<typeof UnsplashClient>,
    localStorageClient: ReturnType<typeof LocalStorageClient>
  ) {
    makeObservable(this);
    this.rootStore = rootStore;
    this.transportLayer = transportLayer;
    this.localStorageClient = localStorageClient;
    this.listPictures = listPictures(rootStore);
  }

  @action
  setSearchQuery(query: string) {
    this.search = query;
  }

  @action
  loadPictures(page = this.currentPage) {
    this.isLoading = true;
    return this.transportLayer.search(this.search, page).then(
      action(
        ({
          results,
          total_pages,
        }: {
          results: Picture[];
          total_pages: number;
        }) => {
          const pictures = results.map((result) =>
            this.convertResultToPicture(result)
          );
          this.rootStore.picturesStore.picturesRegistry = pictures;
          this.currentPage = page;
          this.totalPages = total_pages;
          this.errors = [];
          this.isLoading = false;
          console.log(total_pages, this.totalPages);
        }
      ),
      action(({ errors }: { errors: string[] }) => {
        this.rootStore.picturesStore.picturesRegistry = [];
        this.currentPage = 1;
        this.totalPages = 0;
        this.errors = errors;
        this.isLoading = false;
      })
    );
  }

  @action
  loadPicturesOnPreviousPage() {
    this.currentPage = this.currentPage - 1 >= 1 ? this.currentPage - 1 : 1;
    this.loadPictures(this.currentPage);
  }

  @action
  loadPicturesOnNextPage() {
    this.currentPage =
      this.currentPage + 1 <= this.totalPages
        ? this.currentPage + 1
        : this.totalPages;
    this.loadPictures(this.currentPage);
  }

  isItFavorite(pictureId: string) {
    return (
      this.localStorageClient.readAll().filter((f) => f.id === pictureId)[0] !==
      undefined
    );
  }

  convertResultToPicture({ id, description, urls, user }: Picture): Picture {
    return {
      id,
      description,
      urls,
      user,
      isFavorite: this.isItFavorite(id),
      error: false,
    };
  }
}
