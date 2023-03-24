import React from 'react';
import { Portal } from 'react-portal';
import { BodyClass } from '@plone/volto/helpers';
import HeroView from '@eeacms/volto-hero-block/components/Blocks/Hero/View';

function IsomorphicPortal({ children }) {
  const [isClient, setIsClient] = React.useState();
  React.useEffect(() => setIsClient(true), []);

  return isClient ? (
    <Portal node={document.getElementById('page-header')}>{children}</Portal>
  ) : (
    children
  );
}

const View = (props) => {
  return (
    <React.Fragment>
      <BodyClass className="with-hero-block" />
      <IsomorphicPortal>
        <div className="ui container hero-block-container">
          <HeroView {...props} />
        </div>
      </IsomorphicPortal>
    </React.Fragment>
  );
};

export default View;
