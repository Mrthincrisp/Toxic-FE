'use client';

import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { getCategoryTopics } from '../../../api/TopicCalls';

export default function CategoryTopics({ params }) {
  const { id } = params;
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    getCategoryTopics(id).then(setTopics);
  }, [id]);

  return <div>topics related to category in console {console.warn('topics', topics)}</div>;
}

CategoryTopics.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
};
