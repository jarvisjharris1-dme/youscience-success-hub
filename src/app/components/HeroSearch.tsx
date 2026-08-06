import { Search } from 'lucide-react';

export function HeroSearch() {
  return (
    <section className="bg-[#8e2880] text-white py-12 sm:py-14">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          How can we help you today?
        </h1>
        <p className="text-lg sm:text-xl text-white/90 mb-8">
          Search for specific answers or explore the topics below
        </p>

        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/70" />
          <input
            type="text"
            placeholder="Enter a question or topic"
            className="w-full pl-12 pr-4 py-4 rounded-xl text-white placeholder-white/70 bg-white/20 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white focus:bg-white/30 shadow-xl transition-all"
          />
        </div>
      </div>
    </section>
  );
}