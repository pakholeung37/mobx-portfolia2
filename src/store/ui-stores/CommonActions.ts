import { action } from "mobx";
import RootStore from "../RootStore";
import { Picture } from "./SearchPageStore";

export const listPictures = (rootStore: RootStore) => () =>
  rootStore.picturesStore.picturesRegistry;

export const getSelectedPicture = (rootStore: RootStore) => () =>
  rootStore.picturesStore.selectedPicture;

export const setSelectedPicture = (rootStore: RootStore) =>
  action(
    (picture: Picture) => (rootStore.picturesStore.selectedPicture = picture)
  );
