import { useParams, Link } from 'react-router';
import { ChevronRight, Home, PlayCircle, Play } from 'lucide-react';

export default function SupportTVCategoryPlaylists() {
  const { category } = useParams();
  
  // Mock data structure with categories containing playlists AND single videos
  const categoryData: Record<string, any> = {
    'whats-new': {
      title: "What's New",
      description: 'Check out our latest updates and feature releases',
      items: [
        {
          id: 'latest-features',
          type: 'playlist',
          title: 'Latest Features & Updates',
          description: 'Discover the newest features and improvements to the platform',
          videoCount: 7,
          duration: '32 min',
          thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=225&fit=crop'
        },
        {
          id: 'product-releases',
          type: 'playlist',
          title: 'Product Release Highlights',
          description: 'Major product releases and what they mean for you',
          videoCount: 5,
          duration: '24 min',
          thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=225&fit=crop'
        },
        {
          id: 'quick-tip-dashboards',
          type: 'video',
          title: 'Quick Tip: New Dashboard Layout',
          description: 'Learn about the redesigned dashboard interface',
          duration: '3 min',
          thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=225&fit=crop'
        }
      ]
    },
    'user-administration': {
      title: 'User Administration',
      description: 'Learn how to manage users, roles, and permissions',
      items: [
        {
          id: 'getting-started',
          type: 'playlist',
          title: 'Getting Started with Users',
          description: 'Learn the basics of adding and managing users',
          videoCount: 5,
          duration: '22 min',
          thumbnail: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=225&fit=crop'
        },
        {
          id: 'advanced-management',
          type: 'playlist',
          title: 'Advanced User Management',
          description: 'Deep dive into user management features and best practices',
          videoCount: 8,
          duration: '45 min',
          thumbnail: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=225&fit=crop'
        },
        {
          id: 'roles-permissions',
          type: 'playlist',
          title: 'Roles & Permissions',
          description: 'Configure roles and set up permission structures',
          videoCount: 6,
          duration: '28 min',
          thumbnail: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=225&fit=crop'
        },
        {
          id: 'bulk-import',
          type: 'video',
          title: 'Bulk User Import',
          description: 'Import multiple users at once using CSV files',
          duration: '5 min',
          thumbnail: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=225&fit=crop'
        }
      ]
    },
    'aptitude-career-discovery': {
      title: 'Aptitude & Career Discovery',
      description: 'Help students discover their aptitudes and explore careers',
      items: [
        {
          id: 'aptitude-assessments',
          type: 'playlist',
          title: 'Aptitude Assessments',
          description: 'Guide to administering and interpreting aptitude assessments',
          videoCount: 6,
          duration: '30 min',
          thumbnail: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=225&fit=crop'
        },
        {
          id: 'career-exploration',
          type: 'playlist',
          title: 'Career Exploration Tools',
          description: 'Help students explore career paths based on their aptitudes',
          videoCount: 9,
          duration: '42 min',
          thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=225&fit=crop'
        },
        {
          id: 'intro-aptitudes',
          type: 'video',
          title: 'Introduction to Aptitudes',
          description: 'Understand what aptitudes are and why they matter',
          duration: '4 min',
          thumbnail: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=225&fit=crop'
        }
      ]
    },
    'education-career-plan': {
      title: 'College & Career Readiness Planner',
      description: 'Create and manage personalized education plans',
      items: [
        {
          id: 'creating-plans',
          type: 'playlist',
          title: 'Creating Education Plans',
          description: 'Step-by-step guide to creating personalized education plans',
          videoCount: 5,
          duration: '25 min',
          thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=225&fit=crop'
        },
        {
          id: 'plan-management',
          type: 'playlist',
          title: 'Managing & Tracking Plans',
          description: 'Monitor student progress and update plans accordingly',
          videoCount: 5,
          duration: '22 min',
          thumbnail: 'https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=400&h=225&fit=crop'
        },
        {
          id: 'plan-templates',
          type: 'video',
          title: 'Using Plan Templates',
          description: 'Save time with pre-built education plan templates',
          duration: '6 min',
          thumbnail: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=400&h=225&fit=crop'
        }
      ]
    },
    'industry-certifications': {
      title: 'Industry Certifications',
      description: 'Guide students toward industry certifications',
      items: [
        {
          id: 'certification-pathways',
          type: 'playlist',
          title: 'Certification Pathways',
          description: 'Explore available certification options and requirements',
          videoCount: 4,
          duration: '18 min',
          thumbnail: 'https://images.unsplash.com/photo-1589561253898-768105ca91a8?w=400&h=225&fit=crop'
        },
        {
          id: 'tracking-certifications',
          type: 'playlist',
          title: 'Tracking Student Certifications',
          description: 'Monitor and report on student certification progress',
          videoCount: 4,
          duration: '20 min',
          thumbnail: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=225&fit=crop'
        }
      ]
    },
    'education-connections': {
      title: 'Education Connections',
      description: 'Connect educational programs with career opportunities',
      items: [
        {
          id: 'program-mapping',
          type: 'playlist',
          title: 'Program Mapping',
          description: 'Map educational programs to career pathways',
          videoCount: 5,
          duration: '24 min',
          thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=225&fit=crop'
        },
        {
          id: 'partnership-management',
          type: 'playlist',
          title: 'Partnership Management',
          description: 'Manage partnerships with educational institutions',
          videoCount: 4,
          duration: '19 min',
          thumbnail: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&h=225&fit=crop'
        },
        {
          id: 'quick-connect',
          type: 'video',
          title: 'Quick Connect Setup',
          description: 'Fast track your education connections',
          duration: '3 min',
          thumbnail: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=225&fit=crop'
        }
      ]
    },
    'work-based-learning': {
      title: 'Work-Based Learning',
      description: 'Manage internships and work experiences',
      items: [
        {
          id: 'internship-setup',
          type: 'playlist',
          title: 'Setting Up Internships',
          description: 'Create and manage internship opportunities',
          videoCount: 6,
          duration: '28 min',
          thumbnail: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=225&fit=crop'
        },
        {
          id: 'experience-tracking',
          type: 'playlist',
          title: 'Tracking Work Experience',
          description: 'Monitor and evaluate student work experiences',
          videoCount: 5,
          duration: '23 min',
          thumbnail: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=400&h=225&fit=crop'
        }
      ]
    },
    'career-connections': {
      title: 'Career Connections',
      description: 'Link students with career opportunities',
      items: [
        {
          id: 'career-matching',
          type: 'playlist',
          title: 'Career Matching Tools',
          description: 'Use data-driven tools to match students with careers',
          videoCount: 7,
          duration: '32 min',
          thumbnail: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&h=225&fit=crop'
        },
        {
          id: 'employer-engagement',
          type: 'playlist',
          title: 'Employer Engagement',
          description: 'Connect with employers and create opportunities',
          videoCount: 6,
          duration: '27 min',
          thumbnail: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=225&fit=crop'
        },
        {
          id: 'networking-tips',
          type: 'video',
          title: 'Student Networking Tips',
          description: 'Help students build professional networks',
          duration: '7 min',
          thumbnail: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=225&fit=crop'
        }
      ]
    },
    'data-reporting': {
      title: 'Data & Reporting',
      description: 'Access comprehensive analytics and reporting',
      items: [
        {
          id: 'dashboard-basics',
          type: 'playlist',
          title: 'Dashboard Basics',
          description: 'Navigate and understand your data dashboard',
          videoCount: 5,
          duration: '22 min',
          thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=225&fit=crop'
        },
        {
          id: 'custom-reports',
          type: 'playlist',
          title: 'Creating Custom Reports',
          description: 'Build custom reports tailored to your needs',
          videoCount: 6,
          duration: '30 min',
          thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=225&fit=crop'
        },
        {
          id: 'data-export',
          type: 'playlist',
          title: 'Data Export & Integration',
          description: 'Export data and integrate with other systems',
          videoCount: 3,
          duration: '15 min',
          thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=225&fit=crop'
        },
        {
          id: 'quick-export',
          type: 'video',
          title: 'Quick Export to Excel',
          description: 'Export your data to Excel in seconds',
          duration: '2 min',
          thumbnail: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=225&fit=crop'
        }
      ]
    }
  };

  const currentCategory = categoryData[category || 'whats-new'] || categoryData['whats-new'];

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
        <span className="text-gray-900 font-medium">{currentCategory.title}</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">{currentCategory.title}</h1>
        <p className="text-lg text-gray-600">{currentCategory.description}</p>
      </div>

      {/* Items Grid (Playlists + Single Videos) */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentCategory.items.map((item: any) => (
          <Link
            key={item.id}
            to={`/support-tv/${category}/${item.id}`}
            className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-[#C15AB3] hover:shadow-lg transition-all group"
          >
            {/* Thumbnail with stacked effect for playlists */}
            <div className="relative">
              {item.type === 'playlist' && (
                <>
                  {/* Stacked card effects - bottom layers */}
                  <div className="absolute top-1 left-2 right-2 h-2 bg-gray-300 rounded-t-lg z-0"></div>
                  <div className="absolute top-2 left-1 right-1 h-2 bg-gray-200 rounded-t-lg z-0"></div>
                </>
              )}
              
              {/* Main thumbnail */}
              <div className="relative aspect-video bg-gray-100">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    {item.type === 'playlist' ? (
                      <PlayCircle className="w-8 h-8 text-[#C15AB3]" />
                    ) : (
                      <Play className="w-8 h-8 text-[#C15AB3]" fill="currentColor" />
                    )}
                  </div>
                </div>
                
                {/* Playlist badge and info */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  {item.type === 'playlist' && (
                    <span className="px-2.5 py-1 bg-gradient-to-r from-[#C15AB3] to-[#3EC6C2] text-white text-xs rounded font-semibold uppercase tracking-wide">
                      Playlist
                    </span>
                  )}
                  {item.type === 'playlist' && (
                    <span className="px-2 py-1 bg-black/80 text-white text-xs rounded font-medium">
                      {item.videoCount} videos
                    </span>
                  )}
                </div>
                
                {/* Duration badge */}
                <div className="absolute top-3 right-3">
                  <span className="px-2 py-1 bg-black/80 text-white text-xs rounded">
                    {item.duration}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Content */}
            <div className="p-5">
              <h3 className="font-bold text-gray-900 mb-2 group-hover:text-[#C15AB3] transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}