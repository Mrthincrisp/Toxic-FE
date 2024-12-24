import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';

export default function CategoryCard({ categoryObj }) {
  return (
    <Link href={`/Topics/${categoryObj.id}`}>
      <div style={{ cursor: 'pointer' }}>
        <h3>{categoryObj.title}</h3>
      </div>
    </Link>
  );
}

CategoryCard.propTypes = {
  categoryObj: PropTypes.shape({
    title: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
};
