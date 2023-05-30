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

function formatDate(date) {
  const d = new Date(date);
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const year = d.getFullYear();

  return `${month}.${day}.${year}`;
}

const generateProductDetail = (count) => {
  const productDetail = [];

  for (let i = 0; i < count; i++) {
    const detail = {
      id: faker.string.uuid(),
      image: faker.image.urlLoremFlickr({
        category: 'nature',
        width: 320,
        height: 120,
      }),
      name: faker.lorem.words(),
      description: faker.lorem.paragraphs(),
      details: faker.lorem.paragraphs(),
      price: faker.finance.amount({ min: 0, max: 99, dec: 2, symbol: '$' }),
      arrivalDate: formatDate(faker.date.recent()),
      comments: generateComments(faker.number.int({ min: 1, max: count })),
    };

    productDetail.push(detail);
  }

  return productDetail;
};

const mockData = generateProductDetail(7);
fs.writeFileSync('./productDetailData.json', JSON.stringify(mockData));
