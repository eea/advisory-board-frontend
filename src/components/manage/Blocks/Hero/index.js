import HeroEdit from './Edit';
import HeroView from './View';

export default (config) => {
  if (config.blocks.blocksConfig.hero) {
    config.blocks.blocksConfig.hero = {
      ...config.blocks.blocksConfig.hero,
      edit: HeroEdit,
      view: HeroView,
    };
  }

  return config;
};
