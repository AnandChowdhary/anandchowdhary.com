import { hydrateRoot } from 'react-dom/client';
import { TimelineItemBirthday } from '@/views/components/timeline-item-birthday';
import { TimelineItemFitness } from '@/views/components/timeline-item-fitness';

export const hydrate = (element: HTMLElement) => {
  const value = Number(element.dataset.counterValue);
  if (!Number.isFinite(value)) return;
  if (element.dataset.counter === 'birthday') {
    hydrateRoot(element, <TimelineItemBirthday initialAge={value} contentOnly />);
  } else {
    hydrateRoot(element, <TimelineItemFitness value={value} total={Number(element.dataset.counterTotal)} contentOnly />);
  }
};
