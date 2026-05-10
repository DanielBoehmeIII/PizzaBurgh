export const BUSINESS = {
  name: 'Pizza Burgh',
  tagline: "Pittsburgh's Finest Slice",
  phone: '(412) 555-0187',
  email: 'hello@pizzaburgh.com',
  address: {
    street: '1234 Forbes Ave',
    city: 'Pittsburgh',
    state: 'PA',
    zip: '15213',
  },
  hours: [
    { days: 'Monday – Thursday', hours: '11:00 AM – 10:00 PM' },
    { days: 'Friday – Saturday',  hours: '11:00 AM – 11:00 PM' },
    { days: 'Sunday',              hours: '12:00 PM – 9:00 PM' },
  ],
  social: {
    instagram: 'https://instagram.com/pizzaburgh',
    facebook:  'https://facebook.com/pizzaburgh',
    twitter:   'https://twitter.com/pizzaburgh',
  },
  faqs: [
    {
      q: 'Do you offer delivery?',
      a: 'Yes! We deliver within a 5-mile radius. You can order through our website or on Uber Eats for delivery.',
    },
    {
      q: 'Can I pick up my order?',
      a: 'Absolutely. Select pickup at checkout and your order will be ready in 20–30 minutes.',
    },
    {
      q: 'Do you offer catering or party orders?',
      a: 'We do! We can handle events of all sizes. Contact us at least 48 hours in advance for catering orders.',
    },
    {
      q: 'What is a pepperoni roll?',
      a: 'It\'s a Pittsburgh tradition — soft bread dough filled with pepperoni and cheese, baked golden. A must-try.',
    },
    {
      q: 'Do you have gluten-free options?',
      a: 'We offer a gluten-free crust for an additional $2. Please note our kitchen is not gluten-free certified.',
    },
    {
      q: 'How do I place a large catering order?',
      a: 'Use our Contact page or call us directly. We\'ll work with you to create a custom menu for your event.',
    },
  ],
  about: `
Pizza Burgh was born in the heart of Pittsburgh, where every neighborhood has a story and every table has a family.
We make our dough fresh every morning, slow-simmer our sauce with San Marzano tomatoes, and pile on the toppings
the way Pittsburgh folks have always liked it — generously and without apology.

From a classic cheese slice to our signature Pittsburgh Special loaded with everything good,
every pie that leaves our oven carries the same pride as the city it was made in.

We're your neighborhood pizza shop. Come hungry, leave happy.
  `.trim(),
};
