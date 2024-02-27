import Slider from "react-slick";
import slider_1 from "@/assets/slider-image-1.jpeg";
import slider_2 from "@/assets/slider-image-2.jpeg";
import slider_3 from "@/assets/slider-image-3.jpeg";
import banner_1 from "@/assets/grocery-banner.png";
import banner_2 from "@/assets/grocery-banner-2.jpeg";
import {
  useGetUserCartQuery,
  useGetUserWishlistQuery,
} from "@/store/cart/cartApi";
import Loader from "./Loader";

const MainSlider = () => {
  const { isLoading: cartLoading } = useGetUserCartQuery();

  const { isLoading: wishlistLoading } = useGetUserWishlistQuery();

  if (cartLoading || wishlistLoading) {
    return <Loader />;
  }

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
  return (
    <section className="px-2 py-12">
      <div className="grid grid-cols-12">
        <div className="lg:col-span-9 md:col-span-7 col-span-6">
          <Slider {...sliderSettings}>
            <img
              className="xl:h-[450px] lg:h-[350px] md:h-[280px] h-[150px]"
              src={slider_1}
              alt="slider_1"
            />
            <img
              className="xl:h-[450px] lg:h-[350px] md:h-[280px] h-[150px]"
              src={slider_2}
              alt="slider_2"
            />
            <img
              className="xl:h-[450px] lg:h-[350px] md:h-[280px] h-[150px]"
              src={slider_3}
              alt="slider_3"
            />
          </Slider>
        </div>
        <div className="lg:col-span-3 md:col-span-5 col-span-6">
          <img
            className="xl:h-[225px] lg:h-[175px] md:h-[140px] h-[75px]"
            src={banner_1}
            alt="banner_1"
          />
          <img
            className="xl:h-[225px] lg:h-[175px] md:h-[140px] h-[75px]"
            src={banner_2}
            alt="banner_2"
          />
        </div>
      </div>
    </section>
  );
};

export default MainSlider;
