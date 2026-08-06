import { TrendingUp, Clock, ChevronRight } from 'lucide-react';

export function PopularArticles() {
  const popularArticles = [
    {
      title: 'How to Create Your First Assessment',
      category: 'Getting Started',
      readTime: '5 min read',
      views: '12.5k views'
    },
    {
      title: 'Understanding Student Aptitude Results',
      category: 'Results & Reporting',
      readTime: '8 min read',
      views: '9.2k views'
    },
    {
      title: 'Setting Up Single Sign-On (SSO)',
      category: 'Configuration',
      readTime: '10 min read',
      views: '7.8k views'
    },
    {
      title: 'Bulk Student Enrollment Guide',
      category: 'User Management',
      readTime: '6 min read',
      views: '6.4k views'
    },
    {
      title: 'Exporting Assessment Data to CSV',
      category: 'Results & Reporting',
      readTime: '4 min read',
      views: '5.9k views'
    },
    {
      title: 'Integrating with Your LMS',
      category: 'API & Integrations',
      readTime: '12 min read',
      views: '5.1k views'
    }
  ];

  const recentlyUpdated = [
    {
      title: 'New Dashboard Features Overview',
      category: 'What\'s New',
      date: 'Updated 2 days ago'
    },
    {
      title: 'API Rate Limits and Best Practices',
      category: 'API & Integrations',
      date: 'Updated 5 days ago'
    },
    {
      title: 'Mobile App User Guide',
      category: 'Getting Started',
      date: 'Updated 1 week ago'
    }
  ];

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Popular Articles */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="w-6 h-6 text-[#C15AB3]" />
              <h2 className="text-2xl font-bold text-gray-900">Most Popular Articles</h2>
            </div>

            <div className="space-y-4">
              {popularArticles.map((article, index) => (
                <button
                  key={index}
                  className="w-full bg-gray-50 hover:bg-gradient-to-r hover:from-[#3EC6C2]/5 hover:to-[#C15AB3]/5 rounded-lg p-4 text-left border border-gray-200 hover:border-[#C15AB3] transition-all group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-[#C15AB3] transition-colors">
                        {article.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                        <span className="px-2 py-0.5 bg-gradient-to-r from-[#3EC6C2] to-[#C15AB3] text-white rounded text-xs font-medium">
                          {article.category}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {article.readTime}
                        </span>
                        <span className="text-gray-500">{article.views}</span>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#C15AB3] group-hover:translate-x-1 transition-all flex-shrink-0" />
                  </div>
                </button>
              ))}
            </div>

            <button className="mt-6 text-[#C15AB3] hover:text-[#A855B8] font-medium text-sm flex items-center gap-1">
              View all articles
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Recently Updated */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Recently Updated</h2>
            <div className="space-y-4">
              {recentlyUpdated.map((article, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-[#3EC6C2]/10 to-[#C15AB3]/10 rounded-lg p-4 border border-[#3EC6C2]/20 hover:border-[#C15AB3] transition-colors cursor-pointer group"
                >
                  <span className="text-xs px-2 py-0.5 bg-gradient-to-r from-[#3EC6C2] to-[#C15AB3] text-white rounded font-medium mb-2 inline-block">
                    {article.category}
                  </span>
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-[#C15AB3] transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-600">{article.date}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}