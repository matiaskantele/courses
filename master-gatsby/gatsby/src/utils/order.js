import { calculatePizzaPrice, formatMoney } from './prices';

export const attachNamesAndPrices = (order, pizzas) =>
  order.map((item) => {
    const pizza = pizzas.find((p) => p.id === item.id);
    return {
      ...item,
      name: pizza.name,
      thumbnail: pizza.image.asset.fluid.src,
      price: formatMoney(calculatePizzaPrice(pizza.price, item.size)),
    };
  });
