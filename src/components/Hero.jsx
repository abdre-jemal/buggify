import { Link } from "react-router";
import { Compare } from "./Compare";
import Nav from "./Nav";

const Hero = () => {
  return (
    <section className="min-h-[110vh]  relative">
      <Nav />
      <div className="flex justify-center  min-h-screen w-full  items-center bg-transparent">
        <div className="flex flex-col lg:flex-row gap-y-6 lg:gap-x-8 items-center flex-wrap justify-center w-full max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          {/* Text Content */}
          <div className="flex-[0_0_auto] text-center lg:text-left w-full md:w-10/12 lg:w-5/12 xl:w-5/12 px-4 md:px-8 lg:px-4 mt-10 max-w-full">
            <h1 className="text-[calc(1.375rem+1.5vw)] font-bold leading-snug xl:text-5xl mb-5 text-p1 font-roboto">
              Master React by Fixing Real Bugs!
            </h1>
            <p className="text-base md:text-lg leading-relaxed max-w-lg md:max-w-2xl mb-7 text-white">
              Level up your React skills by solving real-world bugs in code.
              Choose a topic, tackle challenges, and learn by debugging.
            </p>
            <Link to='challenges'  type="button" className="btn mx-auto md:mx-0 ">
              <strong>Start Debugging Now!</strong>
              <div id="container-stars">
                <div id="stars"></div>
              </div>
              <div id="glow">
                <div className="circle font-roboto"></div>
                <div className="circle"></div>
              </div>
            </Link>
          </div>
          {/* Comparison Component */}
          <div className="w-full md:w-10/12 lg:w-6/12 flex justify-center lg:justify-end px-4">
            <Compare autoplay={true} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
