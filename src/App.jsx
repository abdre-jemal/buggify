import About from "./components/About";
import { BackgroundLines } from "./components/BackgroundLines";
import Hero from "./components/Hero";
// import Challenge from "./components/Challenge";

import { BackgroundBeamsWithCollision } from "./components/ui/BgBeamCollusion";
import { KeyHighlights } from "./components/ui/KeyHighlights";

function App() {
  return (
    <section className="relative">
      <BackgroundLines>
        <Hero />
      </BackgroundLines>
      {/* KeyHighlights */}
      <BackgroundBeamsWithCollision>
        <KeyHighlights />
      </BackgroundBeamsWithCollision>
      <BackgroundLines>
          <About />
      </BackgroundLines>
    </section>
  );
}

export default App;
