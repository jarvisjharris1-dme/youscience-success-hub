import { Link } from 'react-router';
import { useState } from 'react';
import { ChevronRight, ChevronDown, Home, Video } from 'lucide-react';
import { articleUrls } from '../data/articleUrls';

interface Article {
  id: string;
  title: string;
}

interface Category {
  id: string;
  title: string;
  articles: Article[];
}

export default function TrainingWebinars() {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const categories: Category[] = [
    {
      id: 'live-webinars',
      title: 'Live webinars',
      articles: [
        { id: 'register-live-webinar', title: 'Register for a live training webinar' }
      ]
    },
    {
      id: 'pre-recorded-webinars',
      title: 'Pre-recorded training webinars',
      articles: [
        { id: 'brightpath-recordings', title: 'Brightpath webinar recordings' },
        { id: 'user-administration', title: 'Pre-recorded training webinars: User Administration' },
        { id: 'aptitude-career-discovery', title: 'Pre-recorded training webinars: Aptitude & Career Discovery' },
        { id: 'industry-certifications', title: 'Pre-recorded training webinars: Industry Certifications' },
        { id: 'education-career-connections', title: 'Pre-recorded training webinars: Education Connections & Career Connections' },
        { id: 'work-based-learning', title: 'Pre-recorded training webinars: Work-Based Learning (WBL)' }
      ]
    },
    {
      id: 'courses-guides',
      title: 'Courses & digital guides',
      articles: [
        { id: 'brightpath-courses-guides', title: 'Brightpath courses & digital guides' }
      ]
    }
  ];

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm mb-6">
        <Link to="/" className="text-gray-500 hover:text-[#C15AB3] transition-colors flex items-center gap-1">
          <Home className="w-4 h-4" />
          Home
        </Link>
        <ChevronRight className="w-4 h-4 text-gray-400" />
        <span className="text-gray-900 font-medium">Training Webinars</span>
      </nav>

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Training Webinars</h1>
        <p className="text-lg text-gray-600">Access live and pre-recorded training sessions</p>
      </div>

      {/* Categories */}
      <div className="bg-white rounded-xl border border-gray-200">
        {categories.map((category, index) => (
          <div key={category.id} className={index !== 0 ? 'border-t border-gray-200' : ''}>
            <button
              onClick={() => toggleCategory(category.id)}
              className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
            >
              <h2 className="text-xl font-bold text-gray-900">{category.title}</h2>
              {expandedCategories.includes(category.id) ? (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronRight className="w-5 h-5 text-gray-400" />
              )}
            </button>

            {expandedCategories.includes(category.id) && category.articles.length > 0 && (
              <div className="border-t border-gray-100">
                {category.articles.map((article) => {
                  const url = articleUrls[article.title];
                  const content = (
                    <>
                      <span className="text-gray-700 group-hover:text-[#C15AB3] transition-colors">
                        {article.title}
                      </span>
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#C15AB3] transition-colors" />
                    </>
                  );

                  return url ? (
                    <a
                      key={article.id}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between px-6 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors group"
                    >
                      {content}
                    </a>
                  ) : (
                    <Link
                      key={article.id}
                      to={`/training-webinars/${article.id}`}
                      className="flex items-center justify-between px-6 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors group"
                    >
                      {content}
                    </Link>
                  );
                })}
              </div>
            )}

            {expandedCategories.includes(category.id) && category.articles.length === 0 && (
              <div className="px-6 py-4 text-gray-500 text-sm border-t border-gray-100">
                No articles available yet
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
