DROP TABLE IF EXISTS typeofgood;
DROP TABLE IF EXISTS goods;
DROP TABLE IF EXISTS ingredients;
DROP TABLE IF EXISTS recipes;
DROP TABLE IF EXISTS userinfo;

CREATE TABLE userinfo (
  user_id SERIAL PRIMARY KEY,
  firstname VARCHAR(30) NOT NULL,
  lastname VARCHAR(30) NOT NULL,
  email VARCHAR(30) UNIQUE NOT NULL,
  hashedPass VARCHAR(99) UNIQUE NOT NULL
);

CREATE TABLE typeofgood (
  typeofgood_id SERIAL PRIMARY KEY,
  typeofgood_name VARCHAR(30) UNIQUE NOT NULL,
);

INSERT INTO typeofgood
    (typeofgood_id, typeofgood_name)
VALUES
    (1, "Dairy"),
    (2, "Meat"),


CREATE TABLE goods (
  good_id SERIAL PRIMARY KEY,
  good_name VARCHAR(30) UNIQUE NOT NULL,
);

INSERT INTO goods
    (good_id, good_name)
VALUES
    (1, "Beef"),
    (2, "Lettuce"),
    (3, "Tomatoes"),
    (4, "Taco Shell"),
    (5, "Cheese"),
    (6, "Milk"),
    (7, "Bread");

CREATE TABLE ingredients (
  ingredient_id SERIAL PRIMARY KEY,
  recipe_id INT NOT NULL,
  good_id INT NOT NULL,
  volume INT NOT NULL,
  unit INT NOT NULL,
);

INSERT INTO ingredients
    (recipe_id, good_id, volume, unit)
VALUES
    (2, 1, 5, "kilogram"),
    (3, 2, 1, "piece"),
    (1, 3, 2, "gram"),
    (2, 4, 2, "tablespoons"),
    (1, 5, 3, "slice"),
    (2, 6, 1, "cups"),
    (6, 7, 2, "liter");

CREATE TABLE recipes (
  recipe_id INT NOT NULL,
  recipe_name VARCHAR(30) NOT NULL,
  ready_in_time VARCHAR (10) NOT NULL,
  servings INT NOT NULL,
  cals INT NOT NULL,
  vegan BOOLEAN,
  vegetarian BOOLEAN,
  url VARCHAR(255) NOT NULL,
  PRIMARY KEY (recipe_id),
  UNIQUE (recipe_name)
);

INSERT INTO recipes
    (recipe_id, recipe_name, servings, cals, vegan, vegetarian)
VALUES
    (1,"Tacos", "4", "300", TRUE, FALSE),
    (2,"Tomato Soup", "4", "300", TRUE, FALSE),
    (3,"Grilled Cheese", "4", "300", FALSE, FALSE);


// first create goods table
// second ingr table
// recipes table
