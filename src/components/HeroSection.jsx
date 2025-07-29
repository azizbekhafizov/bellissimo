"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

const slides = [
  { id: 1, image: "/assets/images/carusel.webp", alt: "1-slide" },
  { id: 2, image: "/assets/images/carusel2.webp", alt: "2-slide" },
  { id: 3, image: "/assets/images/carusel3.webp", alt: "3-slide" },
  { id: 4, image: "/assets/images/carusel4.webp", alt: "4-slide" },
  { id: 5, image: "/assets/images/carusel5.webp", alt: "5-slide" },
];

export default function Carousel() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="relative w-full mx-auto md:w-[85%] lg:w-[80%] 2xl:w-[75%] rounded-2xl mt-6">
      {/* Previous button */}
      <button
        ref={prevRef}
        className="absolute cursor-pointer left-4 top-1/2 z-10 -translate-y-1/2 bg-black/40 hover:bg-black/60 rounded-full p-2 backdrop-blur-sm transition-all"
        aria-label="Oldingi slide"
      >
        <ChevronLeft className="w-8 h-8 text-white" />
      </button>

      {/* Next button */}
      <button
        ref={nextRef}
        className="absolute cursor-pointer right-4 top-1/2 z-10 -translate-y-1/2 bg-black/40 hover:bg-black/60 rounded-full p-2 backdrop-blur-sm transition-all"
        aria-label="Keyingi slide"
      >
        <ChevronRight className="w-8 h-8 text-white" />
      </button>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 7000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onInit={(swiper) => {
          if (
            swiper.params.navigation &&
            typeof swiper.params.navigation !== "boolean"
          ) {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }
          swiper.navigation.init();
          swiper.navigation.update();
        }}
        className="w-full h-full rounded-2xl"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full rounded-2xl">
              <img
                src={slide.image}
                alt={slide.alt}
                fill
                priority
                quality={90}
                className="rounded-2xl"
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
