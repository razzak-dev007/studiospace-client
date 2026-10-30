import HeroSlider from '../components/HeroSlider';
import CategoryShowcase from '../components/CategoryShowcase';
import FeaturedStudios from '../components/FeaturedStudios';
import HowBookingWorks from '../components/HowBookingWorks';
import HostGuarantee from '../components/HostGuarantee';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Showcase Slider */}
      <section className="pt-6 sm:pt-8 pb-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <HeroSlider />
      </section>

      {/* 2. Browse by Studio Categories */}
      <CategoryShowcase />

      {/* 3. Featured Studios Dynamic MongoDB Section */}
      <FeaturedStudios />

      {/* 4. Extra Section 1: How Booking Works */}
      <HowBookingWorks />

      {/* 5. Extra Section 2: Host Guarantee & Creator Support */}
      <HostGuarantee />
    </div>
  );
}
