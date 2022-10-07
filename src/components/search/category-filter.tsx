import { useTranslation } from 'next-i18next';
import Heading from '@components/ui/heading';
import CategoryFilterMenu from '@components/search/category-filter-menu';
import Alert from '@components/ui/alert';
import Scrollbar from '@components/ui/scrollbar';
import CategoryListCardLoader from '@components/ui/loaders/category-list-card-loader';
import { useCategoriesQuery } from '@framework/category/get-all-categories';
import { useEffect, useState } from 'react';

export const CategoryFilter = () => {
  const [serverCategory, setServerCategory] = useState([]);

  useEffect(() => {
    // console.log('Start from here');
    getUser();
  }, [serverCategory]);

  async function getUser() {
    try {
      const response = await fetch(
        // `https://sami-project.herokuapp.com/api/products/allcategory`,
        // `https://sami-project.herokuapp.com/api/products/allcategory`,
        `http://localhost:5055/api/category/`,
        {
          method: 'GET',
          headers: {
            'access-control-allow-origin': '*',
            'Content-type': 'application/json; charset=UTF-8',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }

      const result = await response.json();
      // console.log("result for category:",result )
      setServerCategory(result);
      return result;
    } catch (err) {
      console.log(err);
    }
  }

  const { t } = useTranslation('common');
  const {
    data,
    isLoading: loading,
    error,
  } = useCategoriesQuery({
    limit: 10,
  });

  if (loading) {
    return (
      <div className="hidden xl:block">
        <div className="w-72 mt-8 px-2">
          <CategoryListCardLoader uniqueKey="category-list-card-loader" />
        </div>
      </div>
    );
  }
  if (error) return <Alert message={error.message} />;

  return (
    <div className="block">
      <Heading className="mb-5 -mt-1">{t('text-categories')}</Heading>
      <div className="max-h-full overflow-hidden rounded border border-border-base">
        <Scrollbar className="w-full category-filter-scrollbar">
          {/* {[1] ? (
            <CategoryFilterMenu items={[]} />
          ) : (
            <div className="min-h-full pt-6 pb-8 px-9 lg:p-8">
              {t('text-no-results-found')}
            </div>
          )} */}
          {serverCategory.map((i: any, index: any) => (
            <li key={index} className="carList">
              {i?.parent}
            </li>
          ))}
        </Scrollbar>
      </div>
    </div>
  );
};
