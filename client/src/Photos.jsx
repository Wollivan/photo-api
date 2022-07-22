import React, { Component } from "react";

export class Photos extends Component {
  render() {
    return this.props.photos.map((photo, index) => {
      return (
        <div key={index}>
          {photo.img_url && (
            <a href={photo.original_image}>
              <img src={photo.img_url} alt={this.props.searchQuery} />
            </a>
          )}
          <span>photo by: {photo.photographer} from unsplash</span>
        </div>
      );
    });
  }
}

export default Photos;
