import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Workflow from './components/Workflow';
import Playground from './components/Playground';
import Comparison from './components/Comparison';
import Pricing from './components/Pricing';
import Faq from './components/Faq';
import Footer from './components/Footer';

export default function App() {
  
  // Handles automated navigation transitions cleanly between section tags
  const handleScrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#050505] text-white flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* 1. Header Toolbar */}
      <Navigation onScrollToSection={handleScrollToSection} />

      {/* 2. Main Content Stack */}
      <main className="flex-grow">
        
        {/* Hero Section containing the Interactive Sandbox Converter */}
        <Hero />

        {/* 4-Step Interactive Pipeline Diagram */}
        <Workflow />

        {/* Style Variations Playground Grid */}
        <Playground />

        {/* Platforms format resolutions comparing area */}
        <Comparison />

        {/* Subscription pricing systems */}
        <Pricing />

        {/* Documentation FAQ Collapse Accordions */}
        <Faq />

      </main>

      {/* 3. Footer Branding */}
      <Footer onScrollToSection={handleScrollToSection} />

    </div>
  );
}
