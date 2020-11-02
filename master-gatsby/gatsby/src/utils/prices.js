const formatter = Intl.NumberFormat('fi-FI', {
  style: 'currency',
  currency: 'EUR',
});

export const formatMoney = (cents) => formatter.format(cents / 100);

const sizes = {
  S: 0.75,
  M: 1,
  L: 1.25,
};

export const calculatePizzaPrice = (cents, size) => cents * sizes[size];

export const calculateOrderTotal = (order, pizzas) =>
  order.reduce((acc, orderItem) => {
    const pizza = pizzas.find((p) => p.id === orderItem.id);
    return acc + calculatePizzaPrice(pizza.price, orderItem.size);
  }, 0);
