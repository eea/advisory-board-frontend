import installHeroBlock from './Hero';
import installTitleBlock from './Title';
import installNewsLetterForm from './NewsletterForm';

export default function applyConfig(config) {
  return [installHeroBlock, installTitleBlock, installNewsLetterForm].reduce(
    (acc, apply) => apply(acc),
    config,
  );
}
