import React, { useEffect, useState } from 'react';
import ProductLayout from '../../components/layouts/ProductsLayout';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../../features/products/productSlice';
import ProductCard from '../../components/ProductCard';

const AllProducts = () => {
  const dispatch = useDispatch();
  const [pages, setPages] = useState(1);

  const { products, totalPages, isLoading, error } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    dispatch(
      getAllProducts({
        limit: 20,
        page: pages,
      })
    );
    window.scrollTo({ top: 0  , behavior: 'smooth'  } );
  }, [dispatch, pages]);

  const handleNext = () => {
    if (pages < totalPages) {
      setPages((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (pages > 1) {
      setPages((prev) => prev - 1);
    }
  };

  return (
    <ProductLayout>
      <div className="mb-8 flex flex-row flex-wrap gap-4 justify-center items-center">
        {products.map((product) => (
          <div key={product._id} className="w-[215px]">
            <ProductCard
              id={product._id}
              title={product.name}
              image={product?.images[0]?.url}
              price={product?.price}
              category={product.category}
            />
          </div>
        ))}
      </div>

      <div className="flex gap-6 justify-center items-center mt-10">
        <button
          disabled={pages === 1}
          onClick={handlePrev}
          className="text-lg border border-gray-500 px-4 py-1 rounded-lg text-black dark:text-white disabled:opacity-50"
        >
          ← Previous
        </button>

        <span className="text-black dark:text-white text-lg font-semibold">
          Page {pages} / {totalPages}
        </span>

        <button
          disabled={pages === totalPages}
          onClick={handleNext}
          className="text-lg border border-gray-500 px-4 py-1 rounded-lg text-black dark:text-white disabled:opacity-50"
        >
          Next →
        </button>
      </div>
    </ProductLayout>
  );
};

export default AllProducts;
