
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const Banner = () => {
    return (
        <div className="md:max-w-10/12 mx-auto p-1 md:mt-5">
            <Swiper
                loop={true}
                autoplay={{ delay: 2000 }}
                speed={1200}
                slidesPerView={1}
                modules={[Autoplay]}
            >
                <SwiperSlide>
                    <img className="rounded-2xl h-100 w-full md:h-140 lg:h-190" src="https://i.ibb.co.com/5hDNRb4m/top-view-beyti-kebab-served-with-ayran-pickles.jpg" />
                </SwiperSlide>


                <SwiperSlide>
                    <img className="rounded-2xl h-100 w-full md:h-140 lg:h-190" src="https://i.ibb.co.com/DsHjyk7/lavash-rolls-top-view-table.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <img className="rounded-2xl h-100 w-full md:h-140 lg:h-190" src="https://i.ibb.co.com/MkVvJrxG/beyti-kebab-served-with-ayran-pickles-2.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <img className="rounded-2xl h-100 w-full md:h-140 lg:h-190" src="https://i.ibb.co.com/Psn70BC0/arrangement-thanksgiving-day-delicious-dinner.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <img className="rounded-2xl h-100 w-full md:h-140 lg:h-190" src="https://i.ibb.co.com/WvpgNcv2/top-view-table-full-delicious-food-composition.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <img className="rounded-2xl h-100 w-full md:h-140 lg:h-190" src="https://i.ibb.co.com/Z6c1q4TV/delicious-lobster-gourmet-seafood.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <img className="rounded-2xl h-100 w-full md:h-140 lg:h-190" src="https://i.ibb.co.com/DD1kN2bV/top-view-meals-tasty-yummy-different-pastries-dishes-brown-surface.jpg" />
                </SwiperSlide>

                <SwiperSlide>
                    <img className="rounded-2xl h-100 w-full md:h-140 lg:h-190" src="https://i.ibb.co.com/23hQhnJC/turkish-beyti-kebab-served-with-yogurt-pepper-tomato.jpg" />
                </SwiperSlide>

                <SwiperSlide>
                    <img className="rounded-2xl h-100 w-full md:h-140 lg:h-190" src="https://i.ibb.co.com/84rLy1NH/meat-cutlet-with-french-fries-ketchup-mayo-tarhun-lemonade-bread-table-1.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <img className="rounded-2xl h-100 w-full md:h-140 lg:h-190" src="https://i.ibb.co.com/84rLy1NH/meat-cutlet-with-french-fries-ketchup-mayo-tarhun-lemonade-bread-table-1.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <img className="rounded-2xl h-100 w-full md:h-140 lg:h-190" src="https://i.ibb.co.com/PG35sqDL/well-done-steak-homemade-potatoes.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <img className="rounded-2xl h-100 w-full md:h-140 lg:h-190" src="https://i.ibb.co.com/QF4fJtDZ/beyti-kebab-served-with-ayran-pickles.jpg" />
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Banner;
