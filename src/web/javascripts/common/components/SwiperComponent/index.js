import React from 'react';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import 'swiper/swiper.scss';
import 'swiper/modules/navigation/navigation.scss';

const SwiperComponent = ({
  data, SlideComponent, swiperModules, swiperProps, LastSlideComponent = false,
}) => {
  const modulesList = [];

  if (swiperModules.navigation) modulesList.push(Navigation);

  return (
    <>
      <Swiper
        {...swiperProps}
        modules={modulesList}
      >
        {
          data.map((item, index) => (
            <SwiperSlide key={index}>
              <SlideComponent data={item} />
            </SwiperSlide>
          ))
        }
        {
          LastSlideComponent && <SwiperSlide>
            <LastSlideComponent />
          </SwiperSlide>
        }
      </Swiper>
    </>
  );
};

export default SwiperComponent;
