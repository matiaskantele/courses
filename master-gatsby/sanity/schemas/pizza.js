import { MdLocalPizza as icon } from 'react-icons/md';

const pizzaSchema = {
  // computer name
  name: 'pizza',
  // visible title
  title: 'Pizzas',
  type: 'document',
  icon,
  fields: [
    {
      name: 'name',
      title: 'Pizza Name',
      type: 'string',
      description: 'Name of the pizza',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 100,
      },
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
      description: 'Price of the pizza in cents',
      validation: (Rule) => Rule.min(1000).max(50000),
      // TODO: Add custom input component
    },
    {
      name: 'toppings',
      title: 'Toppings',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'topping' }] }],
    },
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
      vege0: 'toppings.0.vegetarian',
      vege1: 'toppings.1.vegetarian',
      vege2: 'toppings.2.vegetarian',
      vege3: 'toppings.3.vegetarian',
      topping0: 'toppings.0.name',
      topping1: 'toppings.1.name',
      topping2: 'toppings.2.name',
      topping3: 'toppings.3.name',
    },
    prepare: ({
      title,
      media,
      vege0,
      vege1,
      vege2,
      vege3,
      topping0,
      topping1,
      topping2,
      topping3,
    }) =>
      // 1. Filter undefined toppings out
      // 2. return the preview object for the pizza
      ({
        title: `${title}${
          [vege0, vege1, vege2, vege3]
            .filter((t) => typeof t !== 'undefined')
            .every((t) => t)
            ? ' 🌱'
            : ''
        }`,
        media,
        subtitle: [topping0, topping1, topping2, topping3]
          .filter(Boolean)
          .join(', '),
      }),
  },
};

export default pizzaSchema;
