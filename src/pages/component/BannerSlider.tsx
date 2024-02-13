import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

const BannerSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [totalSlides, setTotalSlides] = useState<number>(0);

  const handleSlideChange = (swiper: any) => {
    setCurrentIndex(swiper.realIndex);
    setTotalSlides(swiper.slides.length);
  };

  return (
    <div>
      <Swiper
        className='w-full rounded-3xl max-w-[480px] mb-[20px]'
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        pagination={{ clickable: true }}
        autoplay= {{delay:2000 , disableOnInteraction: false}}
        onSlideChange={handleSlideChange}
      >
        <SwiperSlide>
          <img className='w-full object-cover' src="/assets/banner/banner1.png" alt="banner" />
        </SwiperSlide>
        <SwiperSlide>
          <img className='w-full object-cover' src="/assets/banner/banner1.png" alt="banner" />
        </SwiperSlide>
        <SwiperSlide>
          <img className='w-full object-cover' src="/assets/banner/banner1.png" alt="banner" />
        </SwiperSlide>
        <SwiperSlide>
          <img className='w-full object-cover' src="/assets/banner/banner1.png" alt="banner" />
        </SwiperSlide>
        <div className="absolute px-2 py-1 re text-xs bottom-3 right-5 text-[#ffffff] rounded-lg bg-black bg-opacity-50 z-40">{currentIndex+1} / {totalSlides}</div>
      </Swiper>
    </div>
  );
};

export default BannerSlider;
