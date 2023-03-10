/**
 * Footer component.
 * @module components/theme/Footer/Footer
 */

import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { flattenToAppURL } from '@plone/volto/helpers';
import EEAFooter from '@eeacms/volto-eea-design-system/ui/Footer/Footer';
<<<<<<< HEAD
import FooterSites from './FooterSites';
=======
>>>>>>> b3a64fe (merge develop)
import config from '@plone/volto/registry';
import { Grid } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
<<<<<<< HEAD

const Footer = () => {
  const { eea } = config.settings;
  const logo = eea.footerOpts.logoWhite;
=======
import LogoImage from '../Logo/Logo.png';

const Footer = () => {
  const { eea } = config.settings;
>>>>>>> b3a64fe (merge develop)
  const {
    footerActions = [],
    copyrightActions = [],
    socialActions = [],
<<<<<<< HEAD
=======
    contactActions = [],
    contactExtraActions = [],
>>>>>>> b3a64fe (merge develop)
  } = useSelector(
    (state) => ({
      footerActions: state.actions?.actions?.footer_actions,
      copyrightActions: state.actions?.actions?.copyright_actions,
      socialActions: state.actions?.actions?.social_actions,
<<<<<<< HEAD
=======
      contactActions: state.actions?.actions?.contact_actions,
      contactExtraActions: state.actions?.actions?.contact_extra_actions,
>>>>>>> b3a64fe (merge develop)
    }),
    shallowEqual,
  );
  // ZMI > portal_actions > footer_actions
  const actions = footerActions.length
    ? footerActions.map((action) => ({
        title: action.title,
        link: flattenToAppURL(action.url),
      }))
    : eea.footerOpts.actions;

  // ZMI > portal_actions > copyright_actions
  const copyright = copyrightActions.length
    ? copyrightActions.map((action) => ({
        title: action.title,
        site: action.title,
        link: flattenToAppURL(action.url),
      }))
    : eea.footerOpts.copyright;

  // ZMI > portal_actions > social_actions
  const social = socialActions.length
    ? socialActions.map((action) => ({
        name: action.id,
        icon: action.icon,
        link: action.url,
      }))
    : eea.footerOpts.social;

<<<<<<< HEAD
  // Update options with actions from backend
  const options = {
    social,
=======
  // ZMI > portal_actions > contact_actions
  const contacts = contactActions.length
    ? contactActions.map((action, idx) => ({
        text: action.title,
        icon: action.icon,
        link: flattenToAppURL(action.url),
        children:
          idx === 0
            ? contactExtraActions.map((child) => ({
                text: child.title,
                icon: child.icon,
                link: flattenToAppURL(child.url),
              }))
            : [],
      }))
    : eea.footerOpts.contacts;

  // Update options with actions from backend
  const options = {
    // ...eea.footerOpts,
    social,
    // contacts,
>>>>>>> b3a64fe (merge develop)
  };

  return (
    <EEAFooter>
      <Grid stackable>
        <Grid.Row>
          <Grid.Column mobile={16} tablet={10} computer={10}>
            <ul className="footer-nav" id="footer_links">
              <li>
                <Link className="item" to="/">
                  <FormattedMessage id="home" defaultMessage="Home" />
                </Link>
              </li>
              <li>
                <Link className="item" to="/reports-and-publications">
                  <FormattedMessage
                    id="report-and=publications"
                    defaultMessage="Reports and publications"
                  />
                </Link>
              </li>
              <li>
                <Link className="item" to="/news">
                  <FormattedMessage id="news" defaultMessage="News" />
                </Link>
              </li>
              <li>
                <Link className="item" to="/about">
                  <FormattedMessage id="about" defaultMessage="About" />
                </Link>
              </li>
              <li>
                <Link className="item" to="/contact">
                  <FormattedMessage id="contact" defaultMessage="Contact" />
                </Link>
              </li>
            </ul>
          </Grid.Column>
          <Grid.Column mobile={16} tablet={2} computer={2}>
            <img
              className="ab-footer"
<<<<<<< HEAD
              src={logo}
=======
              src={LogoImage}
>>>>>>> b3a64fe (merge develop)
              alt="ADVISORY"
              height={80}
              width={150}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <hr />
      <div className="subfooter-info">
        <div className="subfooter-social">
          <h5>Follow us</h5>
          <EEAFooter.SubFooter {...options} />
        </div>
        <div className="subfooter-contact">
          <h5>Contact us</h5>
          <div className="subfooter-contact-info">
<<<<<<< HEAD
            <a href="/contact">
              <i aria-hidden="true" className="icon mail outline"></i>
              Send us an e-mail
            </a>
            <a href="/contact">
              <i aria-hidden="true" className="icon call"></i>
=======
            <a href="/">
              <i aria-hidden="true" class="icon mail outline"></i>
              Send us an e-mail
            </a>
            <a href="/">
              <i aria-hidden="true" class="icon call"></i>
>>>>>>> b3a64fe (merge develop)
              Call us
            </a>
          </div>
        </div>
        <div className="subfooter-other">
          <h5>Other European Information Systems</h5>
<<<<<<< HEAD
          {/* <EEAFooter.Sites sites={eea.footerOpts.sites} /> */}
          <FooterSites sites={eea.footerOpts.sites} />
        </div>
      </div>

=======
          <EEAFooter.Sites sites={eea.footerOpts.sites} />
        </div>
      </div>

      {/* <EEAFooter.Header>{eea.footerOpts.header}</EEAFooter.Header> */}
>>>>>>> b3a64fe (merge develop)
      <EEAFooter.Actions actions={actions} copyright={copyright} />
    </EEAFooter>
  );
};

export default Footer;
