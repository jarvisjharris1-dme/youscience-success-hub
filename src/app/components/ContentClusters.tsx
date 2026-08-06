import { Link } from 'react-router';
import iconUserAdmin from 'figma:asset/f6d8ac53ef8cac395ada9914a7fce0b307dd76fb.png';
import iconAptitude from 'figma:asset/61bd808221fd09ceeee369e906b07271bd5a8598.png';
import iconEduPlan from 'figma:asset/74c9c27407099f5efe538fee9fe50d37d869687f.png';
import iconCertifications from 'figma:asset/55a47baec99fb48d097e5d2e7d5f9584b2a86823.png';
import iconEduConnections from 'figma:asset/c4a0c0254f78fe92c57fcc76b06d8ed1614c5e26.png';
import iconWorkBased from 'figma:asset/6548d8b87d2fb7a9650b06065297d838dfa51269.png';
import iconCareerConnections from 'figma:asset/d2cedc79cb89c5f5cf71f8bc158c1aacace95120.png';
import iconDataReporting from 'figma:asset/d11ba798e243148eb3535ad5e5896b334a2de20f.png';
import brightpathLogo from '../../imports/Brightpath_1.png';

export function ContentClusters() {
  const clusters = [
    {
      id: 'about-brightpath',
      icon: brightpathLogo,
      title: 'Brightpath',
      description: 'Learn about Brightpath and get started with YouScience',
      articleCount: 18,
      topics: ['Getting Started', 'Setup & preparation', 'Training', 'Resources']
    },
    {
      id: 'user-administration',
      icon: iconUserAdmin,
      title: 'User Administration',
      description: 'Manage users, roles, and permissions across your organization',
      articleCount: 24,
      topics: ['Adding Users', 'Roles & Permissions', 'User Groups', 'SSO Integration']
    },
    {
      id: 'aptitude-career-discovery',
      icon: iconCareerConnections,
      title: 'Aptitude & Career Discovery',
      description: 'Help students discover their aptitudes and explore career pathways',
      articleCount: 32,
      topics: ['Aptitude Assessment', 'Career Exploration', 'Interest Inventory', 'Results Analysis']
    },
    {
      id: 'education-career-plan',
      icon: iconEduPlan,
      title: 'College & Career Readiness Planner',
      description: 'Create and manage personalized education and career plans',
      articleCount: 28,
      topics: ['Plan Creation', 'Goal Setting', 'Course Planning', 'Milestones']
    },
    {
      id: 'industry-certifications',
      icon: iconCertifications,
      title: 'Industry Certifications',
      description: 'Guide students toward industry-recognized certifications',
      articleCount: 18,
      topics: ['Certification Paths', 'Requirements', 'Preparation', 'Tracking']
    },
    {
      id: 'education-connections',
      icon: iconEduConnections,
      title: 'Education Connections',
      description: 'Connect educational programs with career opportunities',
      articleCount: 22,
      topics: ['Program Alignment', 'Postsecondary Links', 'Partnerships', 'Pathways']
    },
    {
      id: 'work-based-learning',
      icon: iconWorkBased,
      title: 'Work-Based Learning',
      description: 'Manage internships, apprenticeships, and work experiences',
      articleCount: 26,
      topics: ['Internships', 'Apprenticeships', 'Job Shadowing', 'Placement']
    },
    {
      id: 'career-connections',
      icon: iconDataReporting,
      title: 'Career Connections',
      description: 'Link students with career opportunities and industry partners',
      articleCount: 20,
      topics: ['Industry Partners', 'Career Events', 'Networking', 'Mentorship']
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">Browse by Product</h2>
        <p className="text-lg text-gray-600">Find answers organized by topic area</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {clusters.map((cluster, index) => {
          return (
            <Link
              key={index}
              to={`/product/${cluster.id}`}
              className="bg-white rounded-xl p-6 border border-gray-200 hover:border-[#C15AB3] hover:shadow-lg transition-all group cursor-pointer"
            >
              <div className="mb-3">
                <img
                  src={cluster.icon}
                  alt={cluster.title}
                  className={cluster.id === 'about-brightpath' ? 'max-w-24 max-h-12 object-contain' : 'w-12 h-12 object-contain'}
                />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">{cluster.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{cluster.description}</p>
                <div className="text-sm text-gray-500 font-medium">
                  {cluster.articleCount} articles
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}