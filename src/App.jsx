import { BackgroundLines } from "./components/BackgroundLines";
import Challenge from "./components/Challenge";
import Hero from "./components/Hero";
// import Challenge from "./components/Challenge";

import { BackgroundBeamsWithCollision } from "./components/ui/BgBeamCollusion";
import {KeyHighlights} from "./components/ui/KeyHighlights";

function App() {
  return (
    <section>
      <BackgroundLines>
        <Hero />
      </BackgroundLines>
      {/* KeyHighlights */}
      <BackgroundBeamsWithCollision>
        <KeyHighlights />
      </BackgroundBeamsWithCollision>
      {/* challenges */}
      <section className="">
        <Challenge />
      </section>
    </section>
  );
}

export default App;
