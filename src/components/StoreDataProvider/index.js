import {createContext, useContext, useMemo, useState} from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {getStorefrontData} from '@site/src/lib/storeData';

const StoreDataContext = createContext(null);

function resolveImageUrl(baseUrl, image) {
  return image.startsWith('/') ? `${baseUrl}${image.slice(1)}` : image;
}

export function StoreDataProvider({children}) {
  const baseUrl = useBaseUrl('/');
  const [storeData] = useState(getStorefrontData);
  const value = useMemo(
    () => ({
      ...storeData,
      home: {
        ...storeData.home,
        image: resolveImageUrl(baseUrl, storeData.home.image),
      },
      categories: storeData.categories.map((category) => ({
        ...category,
        image: resolveImageUrl(baseUrl, category.image),
      })),
      products: storeData.products.map((product) => ({
        ...product,
        image: resolveImageUrl(baseUrl, product.image),
      })),
      loading: false,
      error: null,
    }),
    [baseUrl, storeData],
  );

  return (
    <StoreDataContext.Provider value={value}>
      {children}
    </StoreDataContext.Provider>
  );
}

export function useStoreData() {
  const context = useContext(StoreDataContext);
  if (!context) {
    throw new Error('useStoreData must be used within StoreDataProvider');
  }
  return context;
}
