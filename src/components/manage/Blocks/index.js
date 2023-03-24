import installHeroBlock from './Hero';
import installTitleBlock from './Title';

export default function applyConfig(config) {
  return [installHeroBlock, installTitleBlock].reduce(
    (acc, apply) => apply(acc),
    config,
  );
}
