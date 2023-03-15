import React, { useMemo } from 'react';
import { Button, Checkbox, Form } from 'semantic-ui-react';
import Logo from './Logo.png';

import './newsletterForm.less';

const NewsletterForm = (props) => {
  const query = useMemo(() => new URLSearchParams(props.location.search), [
    props.location.search,
  ]);
  const email = query.get('email');

  const handleSubmit = (event) => {
    const form = event.target;
    const data =
      form.checkboxPrivacy?.checked === true
        ? {
            email,
            firstName: form.firstName?.value,
            lastName: form.lastName?.value,
            organization: form.organization?.value,
            checkboxPrivacy: form.checkboxPrivacy?.checked,
            checkboxNewsletter: form.checkboxNewsletter?.checked,
          }
        : 'checkbox not selected';
    return data;
  };

  return (
    <div className="newsletterFormPage">
      <a href="/">
        <img className="newsletterLogo" src={Logo} alt="logo"></img>
      </a>
      <p>
        Get the latest information about the European Scientific Advisory Board
        on Climate Change
      </p>
      <hr style={{ width: '100%' }} />
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <p className="required">First Name</p>
          <input name="firstName" required />
        </Form.Field>
        <Form.Field>
          <p className="required">Last Name</p>
          <input name="lastName" required />
        </Form.Field>
        <Form.Field>
          <p className="required">Organization</p>
          <input name="organization" required />
        </Form.Field>
        <Form.Field>
          <Checkbox
            className="checkboxPrivacy"
            name="checkboxPrivacy"
            label="I agree to ESABCC’s Privacy Policy"
          />
        </Form.Field>
        <Form.Field>
          <Checkbox
            name="checkboxNewsletter"
            label="I agree to have my response to ESABCC newsletters tracked (for example opned newsletter, link clicks, city location)"
          />
        </Form.Field>
        <Form.Field>
          <a href="/">Link to Privacy Policy</a>
        </Form.Field>
        <Button className="newsletterButton" type="submit">
          Subscribe
        </Button>
      </Form>
    </div>
  );
};

export default NewsletterForm;
