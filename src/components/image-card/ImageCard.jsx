import React from "react";
import LazyImage from "../lazy-image/LazyImage";
import { observer } from "mobx-react";

const styles = {
  card: {
    width: "18rem",
  },
};

const ImageCard = observer(({ picture }) => (
  <div className="card mr-2 mb-2" style={styles.card}>
    <LazyImage
      src={picture.urls.thumb}
      picture={picture}
      imageClass={"card-img-top"}
      onError={() => (picture.error = true)}
    />
    <div className="card-body text-center" style={styles.cardBody}>
      <h5 className="card-title">{picture.user.name}</h5>
      <p className="card-text">{picture.description}</p>
    </div>
  </div>
));

export default ImageCard;
