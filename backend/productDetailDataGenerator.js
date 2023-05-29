import { faker } from '@faker-js/faker';
import fs from 'fs';

const generateComments = (count) => {
  const comments = [];

  for (let i = 0; i < count; i++) {
    const comment = {
      id: faker.string.uuid(),
      username: faker.internet.userName(),
      comment: faker.lorem.sentence(5),
      rating: faker.number.int({ min: 0, max: 5 }),
    };

    comments.push(comment);
  }

  return comments;
};

const generateProductDetail = (count) => {
  const productDetail = [];

  for (let i = 0; i < count; i++) {
    const detail = {
      id: faker.string.uuid(),
      name: faker.lorem.words(),
      description: faker.lorem.paragraphs(),
      price: faker.finance.amount({ min: 0, max: 99, dec: 2, symbol: '$' }),
      arrivalDate: faker.date.recent(),
      comments: generateComments(faker.number.int({ min: 1, max: count })),
    };

    productDetail.push(detail);
  }

  return productDetail;
};

const mockData = generateProductDetail(7);
fs.writeFileSync('./productDetailData.json', JSON.stringify(mockData));
