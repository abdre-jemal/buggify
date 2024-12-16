import { Compare } from "./Compare";
import { BackgroundGradient } from "./ui/BgGredient";

const Hero = () => {
  return (
    <section className=" flex justify-center items-center min-h-[100vh] w-full bg-slate-900">
      <div className="flex gap-x-4 items-center justify-center">
        <div className="md:w-10/12 lg:w-5/12 xl:w-5/12 md:!ml-[8.33333333%] lg:!ml-0 xl:!ml-0 flex-[0_0_auto] px-[15px] xl:px-[35px] lg:px-[20px] mt-[50px] max-w-full text-center lg:text-left xl:text-left z-50">
          <h1 className="text-[calc(1.375rem_+_1.5vw)] font-bold leading-[1.15] xl:text-[2.5rem] mb-5 md:mx-[-1.25rem] lg:mx-0 text-p1">
            Master React by Fixing <br /> Real Bugs!
          </h1>
          <p className="lead !text-[1.1rem] leading-[1.55] mb-7 text-white">
            Level up your React skills by solving real-world bugs in code.
            Choose a topic, tackle challenges, and learn by debugging.
          </p>
          <BackgroundGradient className="max-w-44 py-2">
            {/* <button className="text-s1 !bg-none hover:!bg-none "> */}
            Start Debugging Now!
            {/* </button> */}
          </BackgroundGradient>
        </div>
        <Compare autoplay={true} />
      </div>
    </section>
  );
};

export default Hero;













// git
// git repo -> git init
// git add
// git commit



// github