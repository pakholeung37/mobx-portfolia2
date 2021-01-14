import _ from "lodash";
import { Picture } from "../../store/ui-stores/SearchPageStore";

const LocalStorageClient = (localStorage: Storage) => ({
  save: (picture: Picture) =>
    localStorage.setItem(`portfolia-${picture.id}`, JSON.stringify(picture)),
  remove: (pictureId: string) =>
    localStorage.removeItem(`portfolia-${pictureId}`),
  read: (pictureId: string) =>
    JSON.parse(localStorage.getItem(`portfolia-${pictureId}`) || ""),
  readAll: () =>
    _(localStorage)
      .keys()
      .filter((k) => _.startsWith(k, "portfolia"))
      .map((key) => JSON.parse(localStorage.getItem(key) || ""))
      .value(),
});

export default LocalStorageClient;
