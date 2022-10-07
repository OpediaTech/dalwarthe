import ProductsCarousel from '@components/product/products-carousel';
import { useRelatedProductsQuery } from '@framework/product/get-related-product';
import { LIMITS } from '@framework/utils/limits';
import { useEffect, useState } from 'react';

interface RelatedProductsProps {
  carouselBreakpoint?: {} | any;
  className?: string;
  uniqueKey?: string;
}

const RelatedProductFeed: React.FC<RelatedProductsProps> = ({
  carouselBreakpoint,
  className,
  uniqueKey = 'related-product-popup',
}) => {
  // const { data, isLoading, error } = useRelatedProductsQuery({
  //   limit: LIMITS.RELATED_PRODUCTS_LIMITS,
  // });
  const [serverProducts, setServerProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Start from here');
    getUser();
  }, []);

  async function getUser() {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5055/api/products`, {
        method: 'GET',
        headers: {
          'access-control-allow-origin': '*',
          'Content-type': 'application/json; charset=UTF-8',
        },
      });

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }

      const result = await response.json();
      setLoading(false);
      setServerProducts(result);
      return result;
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <ProductsCarousel
      sectionHeading="text-related-products"
      categorySlug="/search"
      className={className}
      products={serverProducts}
      loading={loading}
      // error={error?.message}
      limit={LIMITS.RELATED_PRODUCTS_LIMITS}
      uniqueKey={uniqueKey}
      carouselBreakpoint={carouselBreakpoint}
    />
  );
};

export default RelatedProductFeed;
