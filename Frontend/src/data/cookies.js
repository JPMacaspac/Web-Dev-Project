// single source of truth for the Shop AND the homepage carousel.
// order matters: the homepage uses the first 5 in this order.
export const cookies = [
  {
    id: 1, name: "Choco Chip", price: 50, category: "classic",
    description: "Classic chocolate chip cookie, crispy edges, gooey center.",
    dough: "#d9993f", edge: "#b97a2e", chip: "#3b2418",
  },
  {
    id: 3, name: "Double Choco", price: 55, category: "choc",
    description: "Rich chocolate cookie loaded with chocolate chunks.",
    dough: "#4a2c1c", edge: "#33200f", chip: "#e8cfa0",
  },
  {
    id: 4, name: "Salted Caramel", price: 65, category: "special", // placeholder price
    description: "Soft center with ribbons of salted caramel.",
    dough: "#c9843a", edge: "#a8672a", chip: "#f5d08a",
  },
  {
    id: 2, name: "Oatmeal Raisin", price: 45, category: "classic",
    description: "Chewy oatmeal cookie packed with sweet raisins.",
    dough: "#c2a26a", edge: "#a3834c", chip: "#5a2a2a",
  },
  {
    id: 5, name: "White Choc Macadamia", price: 70, category: "special", // placeholder price
    description: "Creamy white chocolate with crunchy macadamia.",
    dough: "#efd9a8", edge: "#d9bb7e", chip: "#fff7e6",
  },
];