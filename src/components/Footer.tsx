import amazon from "@/assets/amazonpay.svg";
import paypal from "@/assets/paypal.svg";
import express from "@/assets/american-express.svg";
import mastercard from "@/assets/mastercard.svg";
import visa from "@/assets/visa.svg";
import googlePlay from "@/assets/googleplay-btn.svg";
import appStore from "@/assets/appstore-btn.svg";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#eee] py-16">
      <div className="container px-4 mx-auto">
        <div className="mb-2">
          <h3 className="mb-1 text-2xl">Get The FreshCart App</h3>
          <p className="text-gray-500">
            We will send you a link, open it on your phone to download the app.
          </p>
        </div>

        <div className="sm:flex-row sm:gap-8 flex flex-col items-center gap-4 pt-4 pb-6">
          <input
            type="text"
            placeholder="Email .."
            className="h-[35px] rounded-lg border border-solid border-gray-300 px-4 focus:shadow-input-focus focus:outline-none font-medium py-2 flex-1 sm:mb-0 w-full"
          />
          <button className="hover:bg-teal-600 sm:w-auto w-full px-6 py-1 font-semibold text-center text-white transition-all duration-300 bg-teal-500 rounded-lg cursor-pointer">
            Share App Link
          </button>
        </div>

        <div className="border-y py-4 border-gray-300">
          <div className="lg:flex-row flex flex-col items-center justify-between">
            <div className="lg:mb-0 mb-3">
              <ul className="flex items-center justify-center">
                <li className=" mr-2 font-medium">Payment Partners</li>
                <li className="mr-2">
                  <a href="#">
                    <img src={amazon} alt="amazon" />
                  </a>
                </li>
                <li className="mr-2">
                  <a href="#">
                    <img src={express} alt="american-express" />
                  </a>
                </li>
                <li className="mr-2">
                  <a href="#">
                    <img src={mastercard} alt="mastercard" />
                  </a>
                </li>
                <li className="mr-2">
                  <a href="#">
                    <img src={paypal} alt="paypal" />
                  </a>
                </li>
                <li className="mr-2">
                  <a href="#">
                    <img src={visa} alt="visa" />
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <ul className="lg:flex-row flex flex-col items-center justify-center">
                <li className="lg:mb-0 mb-3 mr-4 font-medium">
                  Get deliveries with FreshCart
                </li>
                <div className="flex">
                  <li className="sm:ml-4 mr-2">
                    <a href="#">
                      <img src={googlePlay} alt="google-paly" />
                    </a>
                  </li>
                  <li className="mr-2">
                    <a href="#">
                      <img src={appStore} alt="app-store" />
                    </a>
                  </li>
                </div>
              </ul>
            </div>
          </div>
        </div>

        <div className="md:flex-row md:items-center flex flex-col items-start justify-between py-5">
          <div className="md:mb-0 mb-4">
            <span className="text-sm font-medium text-gray-400">
              © 2022 <span> - 2024 </span>
              FreshCart e-Commerce HTML Template. All rights reserved.
            </span>
            <p className="text-sm font-medium text-gray-400">
              {" "}
              Powered by{" "}
              <a href="https://codescandy.com/" className="text-teal-500">
                Codescandy
              </a>
            </p>
          </div>
          <div>
            <ul className="flex items-center text-sm font-medium text-gray-400">
              <li className="mr-2">Follow us on</li>
              <li className="hover:text-teal-500 hover:border-teal-500 p-1 mr-2 transition-all duration-300 border border-gray-400 rounded-md cursor-pointer">
                <FaFacebook size={18} />
              </li>
              <li className="hover:text-teal-500 hover:border-teal-500 p-1 mr-2 transition-all duration-300 border border-gray-400 rounded-md cursor-pointer">
                <FaTwitter size={18} />
              </li>
              <li className="hover:text-teal-500 hover:border-teal-500 p-1 transition-all duration-300 border border-gray-400 rounded-md cursor-pointer">
                <FaInstagram size={18} />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
