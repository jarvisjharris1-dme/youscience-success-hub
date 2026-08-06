import { Search, Menu, HelpCircle, BookOpen } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';
import logo from 'figma:asset/4ea743211faada5967ed5a421ce44cc475b4d8f0.png';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-3">
              <img src={logo} alt="YouScience" className="h-8" />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/quick-start-guides" className="text-sm font-medium text-gray-700 hover:text-[#C15AB3] transition-colors">
                Quick Start Guides
              </Link>
              <Link to="/support-tv" className="text-sm font-medium text-gray-700 hover:text-[#C15AB3] transition-colors">
                Support TV
              </Link>
              <Link to="/training-webinars" className="text-sm font-medium text-gray-700 hover:text-[#C15AB3] transition-colors">
                Training Webinars
              </Link>
              <a href="https://youscience.my.site.com/helpcenter/s/article/Product-Updates" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-gray-700 hover:text-[#C15AB3] transition-colors">
                Product Updates
              </a>
            </nav>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            <button className="hidden lg:flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
              <HelpCircle className="w-4 h-4" />
              Contact Support
            </button>
            <button 
              className="md:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col gap-3">
              <Link to="/quick-start-guides" className="text-sm font-medium text-gray-700 hover:text-[#C15AB3] py-2">
                Quick Start Guides
              </Link>
              <Link to="/support-tv" className="text-sm font-medium text-gray-700 hover:text-[#C15AB3] py-2">
                Support TV
              </Link>
              <Link to="/training-webinars" className="text-sm font-medium text-gray-700 hover:text-[#C15AB3] py-2">
                Training Webinars
              </Link>
              <a href="https://youscience.my.site.com/helpcenter/s/article/Product-Updates" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-gray-700 hover:text-[#C15AB3] py-2">
                Product Updates
              </a>
              <a href="#" className="text-sm font-medium text-gray-700 hover:text-[#C15AB3] py-2 flex items-center gap-2">
                <HelpCircle className="w-4 h-4" />
                Contact Support
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}