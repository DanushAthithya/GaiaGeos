import React, { useState, useEffect } from 'react';
import { storage } from './Firebase';
import { listAll,ref,getDownloadURL } from 'firebase/storage';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';


// import required modules
import { Pagination } from 'swiper/modules';

const Event = () => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const storageRef = ref(storage);
  const imagesRef = ref(storageRef, 'images');        //replace with path 'event' after creating one
  
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

    <Swiper
        slidesPerView={1}            
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        style={{
            maxWidth: '70vw',
            maxHeight: '25vh',
            paddingTop:'10vh',
          }}
        className="mySwiper"
      >
        {images.map(url => (
          <SwiperSlide>
            <img src={url} style={{
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain', 
            }} alt="uploaded" className="hhov" />
          </SwiperSlide>
        ))}
      </Swiper>

  );
};

export default Event;
