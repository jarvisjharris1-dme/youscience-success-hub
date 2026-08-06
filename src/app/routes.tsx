import { createBrowserRouter } from 'react-router';
import Root from './pages/Root';
import Home from './pages/Home';
import SupportTVCategories from './pages/SupportTVCategories';
import SupportTVCategoryPlaylists from './pages/SupportTVCategoryPlaylists';
import SupportTVPlaylist from './pages/SupportTVPlaylist';
import ProductPage from './pages/ProductPage';
import ArticlePage from './pages/ArticlePage';
import QuickStartGuides from './pages/QuickStartGuides';
import TrainingWebinars from './pages/TrainingWebinars';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminArticleList from './pages/admin/AdminArticleList';
import AdminArticleEditor from './pages/admin/AdminArticleEditor';
import AdminTaxonomy from './pages/admin/AdminTaxonomy';
import AdminSupportTV from './pages/admin/AdminSupportTV';
import AdminPlaylistVideos from './pages/admin/AdminPlaylistVideos';
import AdminWebinars from './pages/admin/AdminWebinars';

export const router = createBrowserRouter([
  {
    path: '/admin',
    Component: AdminLayout,
    children: [
      { index: true, Component: AdminDashboard },
      { path: 'articles', Component: AdminArticleList },
      { path: 'articles/new', Component: AdminArticleEditor },
      { path: 'articles/:articleId', Component: AdminArticleEditor },
      { path: 'taxonomy', Component: AdminTaxonomy },
      { path: 'support-tv', Component: AdminSupportTV },
      { path: 'support-tv/:itemId/videos', Component: AdminPlaylistVideos },
      { path: 'webinars', Component: AdminWebinars }
    ]
  },
  {
    path: '/',
    Component: Root,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: 'quick-start-guides',
        Component: QuickStartGuides
      },
      {
        path: 'training-webinars',
        Component: TrainingWebinars
      },
      {
        path: 'support-tv',
        Component: SupportTVCategories
      },
      {
        path: 'support-tv/:category',
        Component: SupportTVCategoryPlaylists
      },
      {
        path: 'support-tv/:category/:playlist',
        Component: SupportTVPlaylist
      },
      {
        path: 'product/:productId',
        Component: ProductPage
      },
      {
        path: 'product/:productId/article/:articleId',
        Component: ArticlePage
      }
    ]
  }
]);