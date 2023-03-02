/**
 * Header component.
 * @module components/theme/Header/Header
 */

import React from 'react';
import { Dropdown, Image, Container, Grid, Menu } from 'semantic-ui-react';
import { connect, useDispatch, useSelector } from 'react-redux';

import { withRouter } from 'react-router-dom';
import { UniversalLink } from '@plone/volto/components';
import {
  getBaseUrl,
  hasApiExpander,
  flattenToAppURL,
} from '@plone/volto/helpers';
import { getNavigation } from '@plone/volto/actions';
import { Logo } from '@eeacms/volto-eea-design-system/ui';
import { usePrevious } from '@eeacms/volto-eea-design-system/helpers';
import { find } from 'lodash';
import globeIcon from '@eeacms/volto-eea-design-system/../theme/themes/eea/assets/images/Header/global-line.svg';

import config from '@plone/volto/registry';
import { compose } from 'recompose';

import searchIcon from '@eeacms/volto-eea-design-system/../theme/themes/eea/assets/images/Header/search-line.svg';

function removeTrailingSlash(path) {
  return path.replace(/\/+$/, '');
}

const Header = ({ pathname, token, items, history, subsite }) => {
  const currentLang = useSelector((state) => state.intl.locale);
  const translations = useSelector(
    (state) => state.content.data?.['@components']?.translations?.items,
  );

  const router_pathname = useSelector((state) => {
    return removeTrailingSlash(state.router?.location?.pathname) || '';
  });

  const isSubsite = subsite?.['@type'] === 'Subsite';

  const isHomePageInverse = useSelector((state) => {
    const layout = state.content?.data?.layout;
    const has_home_layout =
      layout === 'homepage_inverse_view' ||
      (__CLIENT__ && document.body.classList.contains('homepage-inverse'));
    return (
      has_home_layout &&
      (removeTrailingSlash(pathname) === router_pathname ||
        router_pathname.endsWith('/edit'))
    );
  });

  const { eea } = config.settings;
  const headerOpts = eea.headerOpts || {};
  const { logo, logoWhite } = headerOpts || {};
  const width = useSelector((state) => state.screen?.width);
  const dispatch = useDispatch();
  const previousToken = usePrevious(token);
  const [language, setLanguage] = React.useState(
    currentLang || eea.defaultLanguage,
  );

  React.useEffect(() => {
    const { settings } = config;
    const base_url = getBaseUrl(pathname);
    if (!hasApiExpander('navigation', base_url)) {
      dispatch(getNavigation(base_url, settings.navDepth));
    }
  }, [pathname, dispatch]);

  React.useEffect(() => {
    if (token !== previousToken) {
      const { settings } = config;
      const base = getBaseUrl(pathname);
      if (!hasApiExpander('navigation', base)) {
        dispatch(getNavigation(base, settings.navDepth));
      }
    }
  }, [token, dispatch, pathname, previousToken]);

  const [activeItem, setActiveItem] = React.useState(pathname);
  const [menuIsActive, setMenuIsActive] = React.useState(false);
  const [searchIsActive, setSearchIsActive] = React.useState(false);
  const [burger, setBurger] = React.useState('');
  const searchInputRef = React.useRef(null);

  const node = React.useRef();
  const searchButtonRef = React.useRef();
  const mobileMenuBurgerRef = React.useRef();
  const desktopMenuRef = React.useRef();

  React.useEffect(() => {
    if (searchIsActive) {
      searchInputRef.current && searchInputRef.current.focus();
    }
  }, [searchIsActive]);

  const renderGlobalMenuItem = (item, { onClick }) => (
    <a
      href={item.url || '/'}
      title={item.title}
      onClick={(e) => {
        e.preventDefault();
        onClick(e, item);
      }}
    >
      {item.title}
    </a>
  );

  const menuOnClick = (e, item) => {
    if (searchIsActive) setSearchIsActive(false);
    setActiveItem(item['@id'] || item.url);
    if (item.items.length) {
      setMenuIsActive(true);
    } else {
      history.push(item.url);
    }
  };

  const searchOnClick = (e, x) => {
    if (menuIsActive === true) {
      setBurger('');
      setMenuIsActive(false);
      setActiveItem('');
    }
    setSearchIsActive(!searchIsActive);
  };

  return (
    <div className="eea header">
      <div className={'main bar'} ref={node}>
        <Container>
          <Grid>
            <Grid.Column mobile={8} tablet={8} computer={2}>
              <div {...(isSubsite ? { className: 'logo-wrapper' } : {})}>
                <Logo
                  src={isHomePageInverse ? logoWhite : logo}
                  title={eea.websiteTitle}
                  alt={eea.organisationName}
                  url={eea.logoTargetUrl}
                />

                {!!subsite && subsite.title && (
                  <UniversalLink item={subsite} className="subsite-logo">
                    {subsite.title}
                  </UniversalLink>
                )}
              </div>
            </Grid.Column>
            <Grid.Column mobile={4} tablet={4} computer={6}>
              <div
                className={
                  isHomePageInverse ? 'main-menu inverted' : 'main-menu'
                }
              >
                {items && (
                  <div
                    className="ui text eea-main-menu tablet or lower hidden menu"
                    ref={desktopMenuRef}
                    id={'navigation'}
                  >
                    {items.map((item) => (
                      <Menu.Item
                        name={item['@id'] || item.url}
                        key={item['@id'] || item.url}
                        active={
                          activeItem.indexOf(item['@id']) !== -1 ||
                          activeItem.indexOf(item.url) !== -1
                        }
                      >
                        {renderGlobalMenuItem(item, {
                          onClick: menuOnClick,
                        })}
                      </Menu.Item>
                    ))}
                  </div>
                )}
              </div>
            </Grid.Column>
            <Grid.Column
              mobile={8}
              tablet={8}
              computer={3}
              className="right-menu"
            >
              <div className="language-column">
                <Dropdown
                  id={'language-switcher'}
                  className={'item header-top-item'}
                  text={`${language.toUpperCase()}`}
                  icon={
                    <Image
                      src={globeIcon}
                      alt="language dropdown globe icon"
                    ></Image>
                  }
                  aria-label="dropdown"
                  closeOnChange={false}
                  closeOnBlur={true}
                >
                  <Dropdown.Menu role="group">
                    <ul
                      className="wrapper language-list"
                      role="listbox"
                      aria-label="language switcher"
                    >
                      {eea.languages.map((item, index) => (
                        <Dropdown.Item
                          as="li"
                          key={index}
                          text={
                            <span>
                              {item.name}
                              <span className="country-code">
                                {item.code.toUpperCase()}
                              </span>
                            </span>
                          }
                          onClick={() => {
                            const translation = find(translations, {
                              language: item.code,
                            });
                            const to = translation
                              ? flattenToAppURL(translation['@id'])
                              : `/${item.code}`;
                            setLanguage(item.code);
                            history.push(to);
                          }}
                        ></Dropdown.Item>
                      ))}
                    </ul>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              <div className="search-ab">
                <div
                  className="search-icon-ab"
                  onClick={searchOnClick}
                  role="none"
                  ref={searchButtonRef}
                >
                  <Image src={searchIcon} alt="search button open/close" />
                </div>
                <input className="search-input-ab" placeholder="Search" />
              </div>
            </Grid.Column>
          </Grid>
        </Container>
      </div>
    </div>
  );
};

export default compose(
  withRouter,
  connect(
    (state) => ({
      token: state.userSession.token,
      items: state.navigation.items,
      subsite: state.content.data?.['@components']?.subsite,
    }),
    { getNavigation },
  ),
)(Header);
