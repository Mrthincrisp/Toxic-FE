'use client';

import React, { useEffect, useState } from 'react';
import { allCategories } from '../../api/CategoryCalls';
import CategoryCard from '../../components/Cards/CategoryCard';

export default function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    allCategories().then(setCategories);
  }, []);

  return (
    <div>
      {categories.map((category) => (
        <CategoryCard key={category.id} categoryObj={category} />
      ))}
    </div>
  );
}
