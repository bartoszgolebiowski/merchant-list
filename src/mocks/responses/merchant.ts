import faker from "faker";

export const generateMerchants = (quantity: number) => {
  return Array.from(Array(quantity).keys()).map((id) => {
    faker.seed(id);
    return {
      id: String(id),
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      avatarUrl: faker.image.people(),
      email: faker.internet.email(),
      phone: faker.phone.phoneNumber('###-###-###'),
      hasPremium: faker.random.boolean(),
    };
  });
};

export const calculateMetaMerchant = (
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
