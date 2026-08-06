import { Link } from 'react-router';
import { ChevronRight, Home, BookOpen } from 'lucide-react';
import iconUserAdmin from 'figma:asset/f6d8ac53ef8cac395ada9914a7fce0b307dd76fb.png';
import iconAptitude from 'figma:asset/61bd808221fd09ceeee369e906b07271bd5a8598.png';
import iconEduPlan from 'figma:asset/74c9c27407099f5efe538fee9fe50d37d869687f.png';
import iconCertifications from 'figma:asset/55a47baec99fb48d097e5d2e7d5f9584b2a86823.png';
import iconEduConnections from 'figma:asset/c4a0c0254f78fe92c57fcc76b06d8ed1614c5e26.png';
import iconWorkBased from 'figma:asset/6548d8b87d2fb7a9650b06065297d838dfa51269.png';
import iconCareerConnections from 'figma:asset/d2cedc79cb89c5f5cf71f8bc158c1aacace95120.png';
import iconDataReporting from 'figma:asset/d11ba798e243148eb3535ad5e5896b334a2de20f.png';
import { articleUrls } from '../data/articleUrls';

export default function QuickStartGuides() {
  const quickGuides = [
    {
      productId: 'user-administration',
      productName: 'User Administration',
      displayName: 'User Administration: Quick start guide',
      icon: iconUserAdmin,
      articleTitle: 'User Administration: Admin quick start guide'
    },
    {
      productId: 'aptitude-career-discovery',
      productName: 'Aptitude & Career Discovery',
      displayName: 'Aptitude & Career Discovery: Quick start guide',
      icon: iconCareerConnections,
      articleTitle: 'Aptitude & Career Discovery: Quick start guide'
    },
    {
      productId: 'education-career-plan',
      productName: 'College & Career Readiness Planner',
      displayName: 'College & Career Readiness Planner: Quick start guide',
      icon: iconEduPlan,
      articleTitle: 'Quick start guide'
    },
    {
      productId: 'industry-certifications',
      productName: 'Industry Certifications',
      displayName: 'Industry Certifications: Admin quick start guide',
      icon: iconCertifications,
      articleTitle: 'Industry Certifications: Admin quick start guide'
    },
    {
      productId: 'industry-certifications',
      productName: 'Industry Certifications',
      displayName: 'Industry Certifications: Proctor quick start guide',
      icon: iconCertifications,
      articleTitle: 'Industry Certifications: Proctor quick start guide'
    },
    {
      productId: 'education-connections',
      productName: 'Education Connections',
      displayName: 'Education Connections: Quick start guide',
      icon: iconEduConnections,
      articleTitle: 'Quick start guide'
    },
    {
      productId: 'work-based-learning',
      productName: 'Work-Based Learning',
      displayName: 'Work-Based Learning: Quick start guide',
      icon: iconWorkBased,
      articleTitle: 'Quick start guide'
    },
    {
      productId: 'career-connections',
      productName: 'Career Connections',
      displayName: 'Career Connections: Quick start guide',
      icon: iconDataReporting,
      articleTitle: 'Quick start guide'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm mb-6">
        <Link to="/" className="text-gray-500 hover:text-[#C15AB3] transition-colors flex items-center gap-1">
          <Home className="w-4 h-4" />
          Home
        </Link>
        <ChevronRight className="w-4 h-4 text-gray-400" />
        <span className="text-gray-900 font-medium">Quick Start Guides</span>
      </nav>

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Quick Start Guides</h1>
        <p className="text-lg text-gray-600">Get up and running quickly with these product guides</p>
      </div>

      {/* Quick Guides List */}
      <div className="grid md:grid-cols-2 gap-4">
        {quickGuides.map((guide, index) => {
          const url = articleUrls[guide.articleTitle];
          const content = (
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
                <img src={guide.icon} alt={guide.productName} className="w-12 h-12" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 group-hover:text-[#C15AB3] transition-colors">
                  {guide.displayName}
                </h3>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#C15AB3] transition-colors" />
            </div>
          );

          return url ? (
            <a
              key={`${guide.productId}-${index}`}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-xl border border-gray-200 p-6 hover:border-[#C15AB3] hover:shadow-lg transition-all group"
            >
              {content}
            </a>
          ) : (
            <Link
              key={`${guide.productId}-${index}`}
              to={`/product/${guide.productId}/article/${guide.articleTitle}`}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:border-[#C15AB3] hover:shadow-lg transition-all group"
            >
              {content}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
