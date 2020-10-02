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

export const createPages = async (params) => {
  // Create dynamically: Pizzas, Toppings, SliceMasters
  await generatePizzaPages(params);
};
