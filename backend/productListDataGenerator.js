import { faker } from '@faker-js/faker';
import fs from 'fs';

const generateProducts = (count) => {
  const productList = [];

  for (let i = 0; i < count; i++) {
    const product = {
      id: faker.string.uuid(),
      name: faker.lorem.words(),
      price: faker.finance.amount({ min: 0, max: 99, dec: 2 }),
      score: faker.number.int({ min: 0, max: 5 }),
      image: faker.image.urlLoremFlickr({
        category: 'nature',
        width: 320,
        height: 180,
      }),
    };

    productList.push(product);
  }

  return productList;
};

const mockData = generateProducts(7);
fs.writeFileSync('./productListData.json', JSON.stringify(mockData));
