import { BookOpen, Video, MessageSquare, FileText, Users, Zap, Bell, User } from 'lucide-react';
import { Link } from 'react-router';

export function QuickLinks() {
  const quickLinks = [
    {
      icon: BookOpen,
      title: 'Quick Start Guide',
      description: 'Get up and running in minutes',
      color: 'bg-[#3EC6C2]',
      link: '/quick-start-guides',
      isClickable: true
    },
    {
      icon: Video,
      title: 'Support TV',
      description: 'Learn with step-by-step videos',
      color: 'bg-[#3EC6C2]',
      link: '/support-tv',
      isClickable: true
    },
    {
      icon: User,
      title: 'YouScience Academy',
      description: 'Explore role-based training',
      color: 'bg-[#3EC6C2]',
      link: 'https://main.d1ejgsskjo7hmj.amplifyapp.com/',
      isClickable: true,
      isExternal: true
    },
    {
      icon: Bell,
      title: 'What\'s New',
      description: 'Latest updates and features',
      color: 'bg-[#3EC6C2]',
      link: 'https://www.youscience.com/resources/product-releases/',
      isClickable: true,
      isExternal: true
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickLinks.map((link, index) => {
          const Icon = link.icon;
          const content = (
            <>
              <div className={`${link.color} w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div className="font-semibold text-gray-900 text-sm mb-1">{link.title}</div>
              <div className="text-xs text-gray-500">{link.description}</div>
            </>
          );

          if (link.isClickable) {
            if (link.isExternal) {
              return (
                <a
                  key={index}
                  href={link.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 text-center group"
                >
                  {content}
                </a>
              );
            }
            return (
              <Link
                key={index}
                to={link.link}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 text-center group"
              >
                {content}
              </Link>
            );
          }

          return (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg text-center"
            >
              {content}
            </div>
          );
        })}
      </div>
    </section>
  );
}