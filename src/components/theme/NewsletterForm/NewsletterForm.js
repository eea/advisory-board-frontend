import React from 'react';
import newsLetterFormHTML from './newsLetterFormHTML'

const markup = { __html: newsLetterFormHTML };

const NewsletterForm = (props) => {
  return (
      <div dangerouslySetInnerHTML={markup} ></div>
  );
};

export default NewsletterForm;
