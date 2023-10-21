import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import "firebase/compat/firestore";
import { getStorage, ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "./Firebase";



const storageRef = ref(storage);
const imagesRef = ref(storageRef, 'images');

const Gallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    listAll(imagesRef)
      .then(res => {
        const imagePromises = res.items.map(item => getDownloadURL(item));
        Promise.all(imagePromises)
          .then(urls => {
            setImages(urls);
          })
          .catch(error => {
            console.error(error);
          });
      })
      .catch(error => {
        console.error(error);
      });
  }, []);



  return (
    <>
      <Helmet>
        <title>Gaia Geo Science</title>
      </Helmet>
      <div className="masonry-container">
        {images.map(url => (
          <div key={url} className="masonry-item">
            <img src={url} alt="uploaded" className="hhov" />
          </div>
        ))}
      </div>
    </>
  );
};

export default Gallery;
