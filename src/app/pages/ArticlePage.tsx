import { useParams, Link } from 'react-router';
import { ChevronRight, Home, ThumbsUp, ThumbsDown } from 'lucide-react';
import { useState } from 'react';
import iconUserAdmin from 'figma:asset/f6d8ac53ef8cac395ada9914a7fce0b307dd76fb.png';
import iconAptitude from 'figma:asset/61bd808221fd09ceeee369e906b07271bd5a8598.png';
import iconEduPlan from 'figma:asset/74c9c27407099f5efe538fee9fe50d37d869687f.png';
import iconCertifications from 'figma:asset/55a47baec99fb48d097e5d2e7d5f9584b2a86823.png';
import iconEduConnections from 'figma:asset/c4a0c0254f78fe92c57fcc76b06d8ed1614c5e26.png';
import iconWorkBased from 'figma:asset/6548d8b87d2fb7a9650b06065297d838dfa51269.png';
import iconCareerConnections from 'figma:asset/d2cedc79cb89c5f5cf71f8bc158c1aacace95120.png';
import iconDataReporting from 'figma:asset/d11ba798e243148eb3535ad5e5896b334a2de20f.png';
import brightpathLogo from '../../imports/Brightpath_1.png';

export default function ArticlePage() {
  const { productId, articleId } = useParams();
  const [helpfulVote, setHelpfulVote] = useState<'yes' | 'no' | null>(null);

  // Mock data - in a real app, this would be fetched based on articleId
  const products: Record<string, any> = {
    'about-brightpath': {
      title: 'Brightpath',
      icon: brightpathLogo
    },
    'industry-certifications': {
      title: 'Industry Certifications',
      icon: iconCertifications
    },
    'user-administration': {
      title: 'User Administration',
      icon: iconUserAdmin
    },
    'aptitude-career-discovery': {
      title: 'Aptitude & Career Discovery',
      icon: iconCareerConnections
    },
    'education-career-plan': {
      title: 'College & Career Readiness Planner',
      icon: iconEduPlan
    },
    'education-connections': {
      title: 'Education Connections',
      icon: iconEduConnections
    },
    'work-based-learning': {
      title: 'Work-Based Learning',
      icon: iconWorkBased
    },
    'career-connections': {
      title: 'Career Connections',
      icon: iconDataReporting
    },
    'data-reporting': {
      title: 'Data & Reporting',
      icon: iconAptitude
    }
  };

  const articles: Record<string, any> = {
    'cert-intro': {
      title: 'Introduction to Industry Certifications',
      category: 'Overview',
      lastUpdated: 'March 15, 2026',
      readTime: '5 min read',
      content: `
        <h2>What are Industry Certifications?</h2>
        <p>Industry certifications are credentials that validate a student's knowledge and skills in specific career fields. These certifications are recognized by employers and can significantly enhance a student's employability and career prospects.</p>
        
        <h3>Why Industry Certifications Matter</h3>
        <p>Industry certifications provide several key benefits:</p>
        <ul>
          <li><strong>Career Readiness:</strong> Certifications demonstrate that students have the practical skills needed for specific careers</li>
          <li><strong>College Credit:</strong> Many certifications can be applied toward college credit, saving time and money</li>
          <li><strong>Competitive Advantage:</strong> Students with certifications stand out to employers and college admissions</li>
          <li><strong>Industry Recognition:</strong> Certifications are developed and recognized by industry leaders</li>
        </ul>

        <h3>Types of Certifications Available</h3>
        <p>YouScience supports a wide range of industry certifications across multiple career clusters:</p>
        <ul>
          <li>Information Technology (CompTIA, Cisco, Microsoft)</li>
          <li>Healthcare (CNA, EMT, Medical Assistant)</li>
          <li>Manufacturing (NIMS, AWS)</li>
          <li>Business & Finance (QuickBooks, MOS)</li>
          <li>Hospitality & Tourism (ServSafe, AHLEI)</li>
        </ul>

        <h3>Getting Started</h3>
        <p>To begin using Industry Certifications in YouScience:</p>
        <ol>
          <li>Review available certifications in your state or region</li>
          <li>Identify certifications that align with your curriculum</li>
          <li>Set up certification pathways for students</li>
          <li>Track student progress and exam results</li>
        </ol>

        <h3>Next Steps</h3>
        <p>Ready to dive deeper? Check out these related articles:</p>
        <ul>
          <li>Benefits of Industry Certifications</li>
          <li>Understanding Certification Pathways</li>
          <li>Initial Setup for Certifications</li>
        </ul>
      `
    },
    'tracking-progress': {
      title: 'Tracking Student Progress',
      category: 'Using Industry Certifications',
      lastUpdated: 'March 10, 2026',
      readTime: '7 min read',
      content: `
        <h2>Monitoring Student Certification Progress</h2>
        <p>Effectively tracking student progress through certification pathways is essential for ensuring success. YouScience provides comprehensive tools to monitor every stage of the certification journey.</p>
        
        <h3>Progress Dashboard</h3>
        <p>The Progress Dashboard gives you a complete overview of student certification activities:</p>
        <ul>
          <li>Current certifications in progress</li>
          <li>Completion percentages</li>
          <li>Upcoming exam dates</li>
          <li>Areas requiring additional support</li>
        </ul>

        <h3>Individual Student Tracking</h3>
        <p>For each student, you can view:</p>
        <ul>
          <li><strong>Certification Path:</strong> The complete pathway from enrollment to certification</li>
          <li><strong>Milestones:</strong> Key checkpoints and their completion status</li>
          <li><strong>Study Hours:</strong> Time invested in preparation</li>
          <li><strong>Practice Exam Results:</strong> Performance on practice assessments</li>
        </ul>

        <h3>Setting Up Progress Tracking</h3>
        <ol>
          <li>Navigate to the Industry Certifications module</li>
          <li>Select a student or group of students</li>
          <li>View their certification progress dashboard</li>
          <li>Set milestones and deadlines as needed</li>
          <li>Configure automated progress notifications</li>
        </ol>
      `
    }
  };

  const currentProduct = products[productId || 'industry-certifications'];
  const currentArticle = articles[articleId || 'cert-intro'] || {
    title: 'Article Coming Soon',
    category: 'General',
    lastUpdated: 'April 21, 2026',
    readTime: '5 min read',
    content: `
      <h2>Content Coming Soon</h2>
      <p>This article is currently being developed. Please check back soon for detailed information on this topic.</p>
      <p>In the meantime, feel free to explore other articles in the <strong>${currentProduct?.title || 'product'}</strong> section.</p>
    `
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
        <Link to={`/product/${productId}`} className="text-gray-500 hover:text-[#C15AB3] transition-colors">
          {currentProduct.title}
        </Link>
        <ChevronRight className="w-4 h-4 text-gray-400" />
        <span className="text-gray-900 font-medium">{currentArticle.title}</span>
      </nav>

      {/* Article Content */}
      <div className="max-w-4xl">
        <article className="bg-white rounded-xl border border-gray-200 p-8 lg:p-12">
          {/* Article Header */}
          <div className="mb-8 pb-6 border-b border-gray-200">
            <div className="inline-block px-3 py-1 bg-[#C15AB3]/10 text-[#C15AB3] rounded-full text-sm font-medium mb-4">
              {currentArticle.category}
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{currentArticle.title}</h1>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span>Last updated: {currentArticle.lastUpdated}</span>
              <span>•</span>
              <span>{currentArticle.readTime}</span>
            </div>
          </div>

          {/* Article Body */}
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: currentArticle.content }}
            style={{
              fontSize: '16px',
              lineHeight: '1.75',
              color: '#374151'
            }}
          />

          {/* Feedback Section */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-4">Was this article helpful?</h3>
              <div className="flex gap-3">
                <button
                  onClick={() => setHelpfulVote('yes')}
                  className={`flex items-center gap-2 px-6 py-2 border rounded-lg font-medium transition-all ${
                    helpfulVote === 'yes'
                      ? 'bg-[#C15AB3] text-white border-[#C15AB3]'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-[#C15AB3]'
                  }`}
                >
                  <ThumbsUp className="w-5 h-5" />
                  Yes
                </button>
                <button
                  onClick={() => setHelpfulVote('no')}
                  className={`flex items-center gap-2 px-6 py-2 border rounded-lg font-medium transition-all ${
                    helpfulVote === 'no'
                      ? 'bg-gray-700 text-white border-gray-700'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-gray-700'
                  }`}
                >
                  <ThumbsDown className="w-5 h-5" />
                  No
                </button>
              </div>
              {helpfulVote && (
                <p className="mt-4 text-sm text-gray-600">
                  Thank you for your feedback!
                </p>
              )}
            </div>
          </div>

          {/* Back to Product */}
          <div className="mt-8">
            <Link
              to={`/product/${productId}`}
              className="inline-flex items-center gap-2 text-[#C15AB3] hover:text-[#C15AB3]/80 font-medium"
            >
              <ChevronRight className="w-4 h-4 rotate-180" />
              Back to {currentProduct.title}
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}