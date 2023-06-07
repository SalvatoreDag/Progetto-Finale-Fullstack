import React from "react";
import Lottie from "lottie-react";
import animation from "../../img/personal-finance.json";

function Hero() {
  return (
    <section className="bg-indigo-200 -mt-12 lg:-mt-20">
      <div className="h-[70vh]  p-10 flex flex-col justify-center md:h-[80vh] lg:h-[70vh] lg:flex-row lg:jusitfy-end lg:ml-72 ">
        <div className="flex flex-col justify-center gap-10 md:gap-10 lg:w-1/2 lg:p-10">
          <div>
            <h1 className="mt-12 text-center uppercase text-2xl font-extrabold text-gray-800 md:text-3xl lg:text-5xl lg:text-start">
              Your financial companion, just a tap away!
            </h1>
            {/* <p className="text-center italic lg:text-start lg:text-xl">Your financial companion, just a tap away!</p> */}
          </div>
          <button className="bg-indigo-600 mx-auto hover:bg-indigo-900 transition duration-150 ease-in-out text-white font-bold py-2 px-4 rounded-3xl md:w-40 md:h-14 lg:mx-0">
            Start Saving
          </button>
        </div>
        <div className="lg:w-1/2">
          <Lottie animationData={animation} className="h-80 md:h-96 lg:h-max" />
        </div>
      </div>
      <div className="-mt-16 ">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#ffffff"
            fill-opacity="1"
            d="M0,160L80,144C160,128,320,96,480,101.3C640,107,800,149,960,165.3C1120,181,1280,171,1360,165.3L1440,160L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>
  );
}

export default Hero;
