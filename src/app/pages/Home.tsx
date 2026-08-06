import { HeroSearch } from '@/app/components/HeroSearch';
import { QuickLinks } from '@/app/components/QuickLinks';
import { ContentClusters } from '@/app/components/ContentClusters';
import { VideoTutorials } from '@/app/components/VideoTutorials';

export default function Home() {
  return (
    <>
      <HeroSearch />
      <QuickLinks />
      <ContentClusters />
      <VideoTutorials />
    </>
  );
}