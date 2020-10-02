import path from 'path';

const generatePizzaPages = async ({ graphql, actions }) => {
  // 1. Get a template for this page
  const pizzaTemplate = path.resolve('./src/templates/PizzaPage.js');
  // 2. Query all pizzas
  const {
    data: { pizzas },
  } = await graphql(`
    query {
      pizzas: allSanityPizza {
        nodes {
          name
          slug {
            current
          }
        }
      }
    }
  `);
  // 3. Loop over all pizzas and run generate pages for each
  pizzas.nodes.forEach((pizza) => {
    actions.createPage({
      path: `pizza/${pizza.slug.current}`,
      component: pizzaTemplate,
      context: {
        slug: pizza.slug.current,
      },
    });
  });
};

const generateToppingsPages = async ({ graphql, actions }) => {
  // 1. Get a template for this page
  const toppingTemplate = path.resolve('./src/pages/pizzas.js');
  // 2. Query all pizzas
  const {
    data: { toppings },
  } = await graphql(`
    query {
      toppings: allSanityTopping {
        nodes {
          name
          id
        }
      }
    }
  `);
  // 3. Loop over all pizzas and run generate pages for each
  toppings.nodes.forEach((topping) => {
    actions.createPage({
      path: `topping/${topping.name}`,
      component: toppingTemplate,
      context: {
        topping: topping.name,
        // TODO: Regex for topping
      },
    });
  });
};

export const createPages = async (params) => {
  // Create dynamically & concurrently: Pizzas, Toppings, SliceMasters
  await Promise.all([
    generatePizzaPages(params),
    generateToppingsPages(params),
  ]);
};
