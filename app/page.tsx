import CTASection from "./pages/CTA";
import Hero from "./pages/Hero";
import ReviewsCarouselSection from "./pages/Reviews";
import Services from "./pages/Services";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <ReviewsCarouselSection />
      <CTASection />
    </>
  );
}
