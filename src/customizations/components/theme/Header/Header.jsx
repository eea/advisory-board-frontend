/**
 * Header component.
 * @module components/theme/Header/Header
 */
import React, { useState, useEffect } from 'react';
import { Dropdown, Image, Container, Grid, Menu } from 'semantic-ui-react';
import { connect, useDispatch, useSelector } from 'react-redux';

import { withRouter } from 'react-router-dom';
import { UniversalLink, SearchWidget } from '@plone/volto/components';
import {
  getBaseUrl,
  hasApiExpander,
  flattenToAppURL,
} from '@plone/volto/helpers';
import { getNavigation } from '@plone/volto/actions';
import { Header, Logo } from '@eeacms/volto-eea-design-system/ui';
import { usePrevious } from '@eeacms/volto-eea-design-system/helpers';
import { find } from 'lodash';
import HeaderMenuPopUp from './HeaderMenuPopUp';

import closeIcon from '@eeacms/volto-eea-design-system/../theme/themes/eea/assets/images/Header/close-line.svg';
import burgerIcon from '@eeacms/volto-eea-design-system/../theme/themes/eea/assets/images/Header/menu-line.svg';
import globeIcon from '@eeacms/volto-eea-design-system/../theme/themes/eea/assets/images/Header/global-line.svg';
import eeaFlag from '@eeacms/volto-eea-design-system/../theme/themes/eea/assets/images/Header/eea.png';

import config from '@plone/volto/registry';
import { compose } from 'recompose';

import cx from 'classnames';

function removeTrailingSlash(path) {
  return path.replace(/\/+$/, '');
}

const EEAHeader = ({ pathname, token, items, history, subsite }) => {
  const currentLang = useSelector((state) => state.intl.locale);
  const translations = useSelector(
    (state) => state.content.data?.['@components']?.translations?.items,
  );

  const router_pathname = useSelector((state) => {
    return removeTrailingSlash(state.router?.location?.pathname) || '';
  });

  const isSubsite = subsite?.['@type'] === 'Subsite';
  const { eea } = config.settings;
  const headerOpts = eea.headerOpts || {};
  const { logo, logoWhite } = headerOpts || {};
  const width = useSelector((state) => state.screen?.width);
  const dispatch = useDispatch();
  const previousToken = usePrevious(token);
  const [language, setLanguage] = useState(currentLang || eea.defaultLanguage);

  const [activeItem, setActiveItem] = useState(pathname);
  const [menuIsActive, setMenuIsActive] = useState(false);
  const [searchIsActive, setSearchIsActive] = useState(false);
  const [burger, setBurger] = useState('');
  const searchInputRef = React.useRef(null);

  const node = React.useRef();
  const mobileMenuBurgerRef = React.useRef();
  const desktopMenuRef = React.useRef();

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

  const menuOnClickOutside = () => {
    // restore active element if nothing was selected from the menu dropdown
    if (pathname !== activeItem) {
      setActiveItem(pathname);
    }
    // close mobile navigation when clicking outside if we have value for nav
    if (burger) {
      setBurger('');
    }
    // always close the  menu
    setMenuIsActive(false);
  };

  const mobileBurgerOnClick = () => {
    if (searchIsActive === true) {
      setSearchIsActive(false);
    }

    if (burger === '') {
      setBurger('open');
      setMenuIsActive(true);
    } else {
      setBurger('');
      setMenuIsActive(false);
      setActiveItem('');
    }
  };

  useEffect(() => {
    const { settings } = config;
    const base_url = getBaseUrl(pathname);
    if (!hasApiExpander('navigation', base_url)) {
      dispatch(getNavigation(base_url, settings.navDepth));
    }
  }, [pathname, dispatch]);

  useEffect(() => {
    if (token !== previousToken) {
      const { settings } = config;
      const base = getBaseUrl(pathname);
      if (!hasApiExpander('navigation', base)) {
        dispatch(getNavigation(base, settings.navDepth));
      }
    }
  }, [token, dispatch, pathname, previousToken]);

  useEffect(() => {
    if (searchIsActive) {
      searchInputRef.current && searchInputRef.current.focus();
    }
  }, [searchIsActive]);

  useEffect(() => {
    setMenuIsActive(false);
    setSearchIsActive(false);
    setBurger('');
    // remove active menu when we have no pathname which means we hit logo to go home
    if (!pathname) {
      setActiveItem('');
    }
  }, [pathname]);

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

  const [yOffset, setYOffset] = useState(
    typeof window !== 'undefined' ? window.pageYOffset : '',
  );
  const [visible, setVisible] = useState(true);
  const [topPage, setTopPage] = useState(true);
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  function handleScroll() {
    const currentYOffset = window.pageYOffset;
    const visible = yOffset > currentYOffset;
    const isTopPage = currentYOffset < 1;
    setYOffset(currentYOffset);
    setVisible(visible);
    setTopPage(isTopPage);
  }

  const redirectToPage = (item) => {
    history.push(item);
  };

  return (
    <div
      className={`eea header ${
        visible
          ? topPage
            ? 'navbar navbar--static'
            : 'navbar navbar--fixed'
          : 'navbar--hidden'
      }`}
    >
      <div className="top bar">
        <Header.TopHeader>
          <Header.TopItem className="official-union">
            <Image src={eeaFlag} alt="eea flag"></Image>
            <Header.TopDropdownMenu
              text="An official website of the European Union | How do you know?"
              tabletText="EEA information systems"
              mobileText=" "
              icon="chevron down"
              aria-label="dropdown"
              className=""
              viewportWidth={width}
            >
              <div
                className="content"
                role="menu"
                tabIndex="0"
                onClick={(evt) => evt.stopPropagation()}
                onKeyDown={(evt) => evt.stopPropagation()}
              >
                <p>
                  All official European Union website addresses are in the{' '}
                  <b>europa.eu</b> domain.
                </p>
                <a
                  href="https://europa.eu/european-union/contact/institutions-bodies_en"
                  target="_blank"
                  rel="noreferrer"
                  role="option"
                  aria-selected="false"
                >
                  See all EU institutions and bodies
                </a>
              </div>
            </Header.TopDropdownMenu>
          </Header.TopItem>
        </Header.TopHeader>
      </div>
      <div className={'main bar'} ref={node}>
        <Container>
          <Grid>
            <Grid.Column
              mobile={4}
              tablet={4}
              computer={2}
              className="left-menu"
              floated="left"
            >
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
            <Grid.Column
              mobile={1}
              tablet={2}
              computer={7}
              className="mobile hidden tablet hidden"
            >
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
                          onClick: config.settings.ab.noChildrenNavigation.includes(
                            item.url,
                          )
                            ? () => redirectToPage(item.url)
                            : menuOnClick,
                        })}
                      </Menu.Item>
                    ))}
                  </div>
                )}
              </div>
            </Grid.Column>
            <Grid.Column
              mobile={6}
              tablet={6}
              computer={3}
              className="right-menu"
              floated="right"
            >
              <div className="language-column mobile hidden tablet hidden">
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
                <SearchWidget pathname={pathname} />
              </div>
              <Header.BurgerAction
                className={`mobile ${burger} ${
                  visible ? 'burger-transition-in' : 'burger-transition-out'
                }`}
                onClick={mobileBurgerOnClick}
                ref={mobileMenuBurgerRef}
              >
                <Image
                  src={burger === 'open' ? `${closeIcon}` : `${burgerIcon}`}
                  alt="menu icon open/close"
                />
              </Header.BurgerAction>
            </Grid.Column>
          </Grid>
          <HeaderMenuPopUp
            renderMenuItem={(item, options, props) => (
              <UniversalLink
                href={item.url || '/'}
                title={item.nav_title || item.title}
                {...(options || {})}
                className={cx(options?.className, {
                  active: item.url === router_pathname,
                })}
              >
                {props?.iconPosition !== 'right' && props?.children}
                <span>{item.nav_title || item.title}</span>
                {props?.iconPosition === 'right' && props?.children}
              </UniversalLink>
            )}
            activeItem={activeItem}
            menuItems={items}
            pathName={pathname}
            onClose={menuOnClickOutside}
            triggerRefs={[mobileMenuBurgerRef, desktopMenuRef]}
            visible={menuIsActive}
          />
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
)(EEAHeader);
