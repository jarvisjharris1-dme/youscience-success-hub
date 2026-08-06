import { Sparkles, Calendar, ArrowRight } from 'lucide-react';

export function LatestUpdates() {
  const updates = [
    {
      title: 'Admin Discovery Dashboard',
      description: 'View comprehensive student data and insights with our enhanced admin dashboard featuring real-time analytics and customizable reporting.',
      date: 'January 10, 2026',
      badge: 'Enhancement',
      badgeColor: 'bg-[#ADD632]'
    },
    {
      title: 'Family Connect',
      description: 'Enable families to access student aptitude results and career recommendations through our new parent portal and mobile experience.',
      date: 'January 5, 2026',
      badge: 'New Feature',
      badgeColor: 'bg-[#ADD632]'
    },
    {
      title: 'Get Started with WBL',
      description: 'Launch work-based learning programs with our comprehensive toolkit including employer partnerships, student tracking, and experience logging.',
      date: 'December 28, 2025',
      badge: 'Major Update',
      badgeColor: 'bg-[#ADD632]'
    }
  ];

  return (
    <section className="bg-gradient-to-br from-gray-50 via-[#3EC6C2]/5 to-[#C15AB3]/5 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Latest Updates */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-gray-900">What's New</h2>
            </div>

            <div className="space-y-4">
              {updates.map((update, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 border border-gray-200 hover:border-[#C15AB3] hover:shadow-lg transition-all group cursor-pointer"
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <span className="text-xs px-3 py-1 rounded-full font-medium bg-gradient-to-r from-[#C15AB3] to-[#3EC6C2] text-white">
                      {update.badge}
                    </span>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      {update.date}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-[#C15AB3] transition-colors">
                    {update.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{update.description}</p>
                  <button className="text-[#C15AB3] hover:text-[#A855B8] font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                    Learn more
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <button className="mt-6 px-6 py-3 bg-[#C15AB3] text-white hover:bg-[#A049A0] rounded-lg font-medium transition-all flex items-center gap-2">
              View All Release Notes
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Webinars */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#C15AB3]" />
                Upcoming Webinars
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Join our expert-led webinars to learn best practices, discover new features, and connect with other educators.
              </p>
              <a
                href="https://youscience.my.site.com/helpcenter/s/article/register-for-a-live-webinar"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full px-4 py-2 bg-[#C15AB3] hover:bg-[#C15AB3]/90 text-white rounded-lg text-sm font-medium transition-all block text-center"
              >
                Register Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}