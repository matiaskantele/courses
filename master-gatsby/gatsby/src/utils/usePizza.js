import { useContext } from 'react';

import OrderContext from '../components/OrderContext';

const usePizza = () => {
  const [order, setOrder] = useContext(OrderContext);

  const addToOrder = (orderedPizza) => setOrder([...order, orderedPizza]);

  const removeFromOrder = (index) =>
    setOrder([...order.slice(0, index), ...order.slice(index + 1)]);

  return {
    order,
    addToOrder,
    removeFromOrder,
  };
};

export default usePizza;
