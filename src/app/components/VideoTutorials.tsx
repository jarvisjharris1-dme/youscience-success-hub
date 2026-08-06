import { Play, Clock, Calendar } from 'lucide-react';
import { Link } from 'react-router';

export function VideoTutorials() {
  const videos = [
    {
      title: 'Platform Overview: A Complete Walkthrough',
      duration: '12:34',
      thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=450&fit=crop',
      category: 'Getting Started',
      views: '8.3k'
    },
    {
      title: 'Creating and Managing Assessments',
      duration: '8:45',
      thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=450&fit=crop',
      category: 'Assessment Management',
      views: '6.1k'
    },
    {
      title: 'Understanding and Sharing Results',
      duration: '10:22',
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop',
      category: 'Results & Reporting',
      views: '5.7k'
    },
    {
      title: 'Advanced User Management',
      duration: '15:18',
      thumbnail: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=450&fit=crop',
      category: 'User Management',
      views: '4.2k'
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Support TV</h2>
          <p className="text-lg text-gray-600">Check out our latest videos or explore all videos.</p>
        </div>
        <Link 
          to="/support-tv"
          className="hidden sm:block px-6 py-2 bg-[#C15AB3] hover:bg-[#C15AB3]/90 text-white rounded-lg font-medium transition-all"
        >
          View All Videos
        </Link>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {videos.map((video, index) => (
          <div
            key={index}
            className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-[#C15AB3] hover:shadow-lg transition-all group cursor-pointer"
          >
            <div className="relative aspect-video bg-gray-200">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play className="w-8 h-8 text-[#C15AB3] ml-1" fill="currentColor" />
                </div>
              </div>
              <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 text-white text-xs rounded flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {video.duration}
              </div>
            </div>
            <div className="p-4">
              <span className="text-xs px-2 py-1 bg-gradient-to-r from-[#C15AB3] to-[#3EC6C2] text-white rounded font-medium">
                {video.category}
              </span>
              <h3 className="font-semibold text-gray-900 mt-2 mb-1 group-hover:text-[#C15AB3] transition-colors">
                {video.title}
              </h3>
              <p className="text-sm text-gray-500">{video.views} views</p>
            </div>
          </div>
        ))}
      </div>

      {/* Webinar Registration Box */}
      <div className="bg-gradient-to-br from-[#3EC6C2]/10 to-[#C15AB3]/10 rounded-xl p-8 border border-[#3EC6C2]/30">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="bg-[#3EC6C2] p-4 rounded-xl">
            <Calendar className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Upcoming Webinars</h3>
            <p className="text-gray-600 mb-4">
              Join our expert-led webinars to learn best practices, discover new features, and connect with other educators.
            </p>
          </div>
          <button className="px-8 py-3 bg-[#C15AB3] hover:bg-[#A049A0] text-white rounded-lg font-medium transition-all whitespace-nowrap">
            Register Now
          </button>
        </div>
      </div>

      <Link 
        to="/support-tv"
        className="sm:hidden w-full mt-6 px-6 py-3 bg-[#C15AB3] hover:bg-[#C15AB3]/90 text-white rounded-lg font-medium transition-all block text-center"
      >
        View All Videos
      </Link>
    </section>
  );
}