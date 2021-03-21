import faker from "faker";

export const generateBids = (id: number, quantity: number) => {
  return Array.from(Array(quantity).keys()).map((index) => {
    faker.seed(index + id * 1000);
    return {
      id: String(index),
      carTitle: faker.vehicle.model(),
      amount: faker.finance.amount(),
      created: faker.date.past(),
    };
  });
};

export const calculateMetaBids = (
  page: number,
  size: number,
  total: number
) => {
  return {
    page,
    size,
    items: page * size + size,
    total,
    hasMore: page * size + size < total,
  };
};
