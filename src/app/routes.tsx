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

export const router = createBrowserRouter([
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