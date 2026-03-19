import { CampaignGrid } from './campaign-grid';
import { CredibilityRow } from './credibility-row';
import { CuratedRail } from './curated-rail';
import { FlagshipCarousel } from './flagship-carousel';
import { FreshDropGrid } from './fresh-drop-grid';
import { HelpAccordion } from './help-accordion';
import { InsightJournal } from './insight-journal';
import { LimitedEditionBanner } from './limited-edition-banner';
import { PartnerMarquee } from './partner-marquee';
import { PulseList } from './pulse-list';
import { SpotlightSlider } from './spotlight-slider';
import type { LiveCatalogCard } from '../normalizers';

type NexmartHomeProps = {
  spotlightItems: LiveCatalogCard[];
  newArrivalItems: LiveCatalogCard[];
  trendingItems: LiveCatalogCard[];
  recommendedItems: LiveCatalogCard[];
  categoryOptions: string[];
  selectedCategory: string;
  selectedPage: number;
};

export function NexmartHome({
  spotlightItems,
  newArrivalItems,
  trendingItems,
  recommendedItems,
  categoryOptions,
  selectedCategory,
  selectedPage,
}: NexmartHomeProps) {
  return (
    <main className="pb-8">
      <SpotlightSlider />
      <CredibilityRow />
      <FlagshipCarousel items={spotlightItems} />
      <CampaignGrid />
      <FreshDropGrid
        items={newArrivalItems}
        categoryOptions={categoryOptions}
        selectedCategory={selectedCategory}
        currentPage={selectedPage}
      />
      <LimitedEditionBanner />
      <PulseList items={trendingItems} />
      <PartnerMarquee />
      <CuratedRail items={recommendedItems} />
      <HelpAccordion />
      <InsightJournal />
    </main>
  );
}
