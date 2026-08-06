import { useParams, Link } from 'react-router';
import { ChevronRight, Home, Play } from 'lucide-react';
import { useState } from 'react';

export default function SupportTVPlaylist() {
  const { category, playlist } = useParams();
  
  // Mock data - you would fetch this based on the category and playlist
  const playlistData: Record<string, any> = {
    'whats-new': {
      'latest-features': {
        title: 'Latest Features & Updates',
        categoryTitle: "What's New",
        description: 'Discover the newest features and improvements to the platform',
        videos: [
          {
            id: 1,
            title: 'New Career Pathway Visualizations',
            description: 'Explore enhanced career pathway visualizations with interactive elements and improved data insights.',
            duration: '4:32',
            thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=225&fit=crop',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
          },
          {
            id: 2,
            title: 'Enhanced API Rate Limits',
            description: 'Learn about increased API rate limits for enterprise customers to support larger data operations.',
            duration: '3:15',
            thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=225&fit=crop',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
          },
          {
            id: 3,
            title: 'Mobile App 3.0 Released',
            description: 'Discover the new mobile app features including offline mode and push notifications.',
            duration: '5:48',
            thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=225&fit=crop',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
          },
          {
            id: 4,
            title: 'Improved Dashboard Analytics',
            description: 'See how the redesigned dashboard provides better insights at a glance.',
            duration: '6:20',
            thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=225&fit=crop',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
          },
          {
            id: 5,
            title: 'New Reporting Features',
            description: 'Explore the new custom reporting capabilities and export options.',
            duration: '4:05',
            thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=225&fit=crop',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
          },
          {
            id: 6,
            title: 'Integration Updates',
            description: 'Learn about new third-party integrations and improved API documentation.',
            duration: '3:42',
            thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=225&fit=crop',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
          },
          {
            id: 7,
            title: 'Performance Improvements',
            description: 'Discover how we\'ve made the platform faster and more responsive.',
            duration: '2:58',
            thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=225&fit=crop',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
          }
        ]
      },
      'quick-tip-dashboards': {
        title: 'Quick Tip: New Dashboard Layout',
        categoryTitle: "What's New",
        description: 'Learn about the redesigned dashboard interface',
        videos: [
          {
            id: 1,
            title: 'Quick Tip: New Dashboard Layout',
            description: 'Learn about the redesigned dashboard interface in just 3 minutes.',
            duration: '3:00',
            thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=225&fit=crop',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
          }
        ]
      }
    },
    'user-administration': {
      'getting-started': {
        title: 'Getting Started with Users',
        categoryTitle: 'User Administration',
        description: 'Learn the basics of adding and managing users',
        videos: [
          {
            id: 1,
            title: 'Adding New Users',
            description: 'Step-by-step guide to adding new users to your organization.',
            duration: '5:12',
            thumbnail: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=225&fit=crop',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
          },
          {
            id: 2,
            title: 'Managing Roles & Permissions',
            description: 'Learn how to set up and manage user roles and permissions effectively.',
            duration: '7:30',
            thumbnail: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=225&fit=crop',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
          },
          {
            id: 3,
            title: 'User Profile Settings',
            description: 'Configure user profile settings and preferences.',
            duration: '4:45',
            thumbnail: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=225&fit=crop',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
          },
          {
            id: 4,
            title: 'Understanding User Groups',
            description: 'Organize users into groups for easier management.',
            duration: '5:55',
            thumbnail: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=225&fit=crop',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
          },
          {
            id: 5,
            title: 'User Import Best Practices',
            description: 'Tips for successfully importing large user lists.',
            duration: '6:20',
            thumbnail: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=225&fit=crop',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
          }
        ]
      },
      'bulk-import': {
        title: 'Bulk User Import',
        categoryTitle: 'User Administration',
        description: 'Import multiple users at once using CSV files',
        videos: [
          {
            id: 1,
            title: 'Bulk User Import',
            description: 'Import multiple users at once using CSV files. A quick guide to streamline your user setup process.',
            duration: '5:00',
            thumbnail: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=225&fit=crop',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
          }
        ]
      }
    }
  };

  const currentPlaylist = playlistData[category || 'whats-new'][playlist || 'latest-features'] || playlistData['whats-new']['latest-features'];
  const [selectedVideo, setSelectedVideo] = useState(currentPlaylist.videos[0]);
  
  // Check if this is a single video or a playlist
  const isSingleVideo = currentPlaylist.videos.length === 1;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm mb-6">
        <Link to="/" className="text-gray-500 hover:text-[#C15AB3] transition-colors flex items-center gap-1">
          <Home className="w-4 h-4" />
          Home
        </Link>
        <ChevronRight className="w-4 h-4 text-gray-400" />
        <Link to="/support-tv" className="text-gray-500 hover:text-[#C15AB3] transition-colors">
          Support TV
        </Link>
        <ChevronRight className="w-4 h-4 text-gray-400" />
        <span className="text-gray-900 font-medium">{currentPlaylist.categoryTitle}</span>
        <ChevronRight className="w-4 h-4 text-gray-400" />
        <span className="text-gray-900 font-medium">{currentPlaylist.title}</span>
      </nav>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{currentPlaylist.title}</h1>
        <p className="text-gray-600">{currentPlaylist.description}</p>
      </div>

      {/* Video Player and Playlist */}
      <div className={isSingleVideo ? '' : 'grid lg:grid-cols-3 gap-6'}>
        {/* Main Video Player */}
        <div className={isSingleVideo ? 'max-w-5xl mx-auto' : 'lg:col-span-2'}>
          <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm">
            <div className="aspect-video bg-gray-900">
              <iframe
                src={selectedVideo.videoUrl}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={selectedVideo.title}
              ></iframe>
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedVideo.title}</h2>
              <p className="text-gray-600 mb-4">{selectedVideo.description}</p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="font-medium">{selectedVideo.duration}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Playlist - Only show if not a single video */}
        {!isSingleVideo && (
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="bg-gradient-to-r from-[#3EC6C2] to-[#C15AB3] text-white px-4 py-3">
                <h3 className="font-bold">Playlist</h3>
                <p className="text-sm text-white/90">{currentPlaylist.videos.length} videos</p>
              </div>
              <div className="max-h-[600px] overflow-y-auto">
                {currentPlaylist.videos.map((video: any) => (
                  <button
                    key={video.id}
                    onClick={() => setSelectedVideo(video)}
                    className={`w-full text-left p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors ${
                      selectedVideo.id === video.id ? 'bg-[#C15AB3]/5 border-l-4 border-l-[#C15AB3]' : ''
                    }`}
                  >
                    <div className="flex gap-3">
                      <div className="relative flex-shrink-0 w-32 h-18">
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-full h-full object-cover rounded"
                        />
                        <div className="absolute inset-0 bg-black/30 rounded flex items-center justify-center">
                          <Play className="w-6 h-6 text-white" fill="white" />
                        </div>
                        <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">
                          {video.duration}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2">
                          {video.title}
                        </h4>
                        <p className="text-xs text-gray-600 line-clamp-2">{video.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}