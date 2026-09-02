export const HOME_DUMMY_IMAGES = [
  '/asset/images/dummy-products/product-01.svg',
  '/asset/images/dummy-products/product-02.svg',
  '/asset/images/dummy-products/product-03.svg',
  '/asset/images/dummy-products/product-04.svg',
  '/asset/images/dummy-products/product-05.svg',
  '/asset/images/dummy-products/product-06.svg',
  '/asset/images/dummy-products/product-07.svg',
  '/asset/images/dummy-products/product-08.svg',
] as const;

// Temporary presentation mode: keep homepage product imagery local until the API media is ready.
// To return to API images later, change the value to `import.meta.env.VITE_HOME_DUMMY_IMAGES !== 'false'`
// or simply set VITE_HOME_DUMMY_IMAGES=false in .env and use the API media.
export const USE_HOME_DUMMY_IMAGES = false;
