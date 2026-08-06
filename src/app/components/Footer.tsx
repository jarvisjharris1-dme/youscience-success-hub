import { Facebook, Instagram, Linkedin, Youtube, Mail, Phone, Clock } from 'lucide-react';
import logo from 'figma:asset/4ea743211faada5967ed5a421ce44cc475b4d8f0.png';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Copyright */}
          <div className="flex flex-col gap-3 items-start">
            <div className="flex-shrink-0">
              <img src={logo} alt="YouScience" className="h-8 brightness-0 invert" />
            </div>
            <div className="text-sm text-gray-400">
              © 2026 YouScience. All rights reserved.
            </div>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col items-center md:items-start gap-2 text-sm">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#3EC6C2]" />
              <a href="mailto:support@youscience.com" className="hover:text-white transition-colors">
                support@youscience.com
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#3EC6C2]" />
              <span>Telephone: </span>
              <a href="tel:1-801-653-9356" className="hover:text-white transition-colors">
                (801) 653-9356
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#3EC6C2]" />
              <span>Toll Free: </span>
              <a href="tel:1-800-470-1215" className="hover:text-white transition-colors">
                (800) 470-1215
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#3EC6C2]" />
              <span>Support hours: Mon-Fri, 7:30 a.m. to 7:00 p.m. ET</span>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex gap-3">
            <a href="https://www.facebook.com/YouScienceLLC/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-gray-800 hover:bg-gradient-to-r hover:from-[#3EC6C2] hover:to-[#C15AB3] rounded-lg flex items-center justify-center transition-all">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="https://www.linkedin.com/company/youscience" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-gray-800 hover:bg-gradient-to-r hover:from-[#3EC6C2] hover:to-[#C15AB3] rounded-lg flex items-center justify-center transition-all">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="https://www.instagram.com/youscience/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-gray-800 hover:bg-gradient-to-r hover:from-[#3EC6C2] hover:to-[#C15AB3] rounded-lg flex items-center justify-center transition-all">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="https://www.youtube.com/@Youscience/videos" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-gray-800 hover:bg-gradient-to-r hover:from-[#3EC6C2] hover:to-[#C15AB3] rounded-lg flex items-center justify-center transition-all">
              <Youtube className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}