import React from 'react';
import { Card as UiCard } from 'semantic-ui-react';

const CardOrganization = (props) => {
  const { item, itemModel = {}, description } = props;
  const { Description, organization } = item;
  const { hasDescription } = itemModel;
  const desc = description || Description;
  const show = hasDescription && desc;

  console.log({description, Description, organization})

  return show ? (
    <>
      {' '}
      <UiCard.Description content={`(${desc})`} />
      {' '}
      <UiCard.Description content={organization} />
    </>
  ) : null;
};

export default CardOrganization;
