import { observable, action, makeObservable } from "mobx";
import RootStore from "../RootStore";
import { Picture } from "../ui-stores/SearchPageStore";

class PicturesStore {
  @observable
  selectedPicture = {};

  @observable
  picturesRegistry: Picture[] = [];

  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    makeObservable(this);
    this.rootStore = rootStore;
    console.log(this.picturesRegistry);
  }
}

export default PicturesStore;
