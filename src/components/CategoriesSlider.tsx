import Loader from "./Loader";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { useGetAllCategoriesQuery } from "@/store/cart/cartApi";
import { selectCart } from "@/store/cart/cartSlice";
import { useAppSelector } from "@/store/redux-hooks";
import arrayShuffle from "array-shuffle";

const CategoriesSlider = () => {
  const { categories } = useAppSelector(selectCart);

  const { isLoading, isError } = useGetAllCategoriesQuery();

  const shuffleCategories = arrayShuffle(categories);

  if (isLoading) {
    return <Loader />;
  }

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 5,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <section className="px-2 py-12">
      <h2 className="mb-8 text-3xl font-medium text-gray-500">
        Featured Categories
      </h2>
      {isError && (
        <p className="my-12 text-4xl font-semibold text-red-500">
          Something Wrong happened, Please Try again Later ...
        </p>
      )}

      {shuffleCategories.length > 0 && (
        <div>
          <Slider {...sliderSettings}>
            {shuffleCategories.map(({ _id, image, name }) => (
              <div key={_id} className="group cursor-pointer">
                <Link to="/categories">
                  <img className="h-52 mx-auto mb-4" src={image} alt={name} />
                  <p className="group-hover:text-teal-500 mb-4 text-lg text-center text-gray-500 transition-all duration-300">
                    {name}
                  </p>
                </Link>
              </div>
            ))}
          </Slider>
        </div>
      )}
    </section>
  );
};

export default CategoriesSlider;
