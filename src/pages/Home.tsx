import AdBanner from "@/components/AdBanner";
import CategoriesSlider from "@/components/CategoriesSlider";
import FeaturedProduct from "@/components/FeaturedProduct";
import MainSlider from "@/components/MainSlider";

const Home = () => {
  return (
    <>
      <AdBanner
        isStatic={true} // Replace with real slot from AdSense
        adSlot="YOUR_AD_SLOT_ID" // Replace with real slot from AdSense        adFormat="auto"
        className="my-4 border border-gray-300 rounded"
      />
      <MainSlider />
      <CategoriesSlider />
      <FeaturedProduct />
    </>
  );
};

export default Home;
