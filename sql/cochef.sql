DROP TABLE IF EXISTS typeofgood;
DROP TABLE IF EXISTS goods;
DROP TABLE IF EXISTS ingredients;
DROP TABLE IF EXISTS recipes;

CREATE TABLE typeofgood (
  typeofgood_id SERIAL PRIMARY KEY,
  typeofgood_name VARCHAR(30) UNIQUE NOT NULL
);

INSERT INTO typeofgood (typeofgood_id, typeofgood_name) VALUES
(1, 'Dairy'),
(2, 'Meat'),
(3, 'Vegetables'),
(4, 'Baking'),
(5, 'Oils'),
(6, 'Fish');

CREATE TABLE goods (
  good_id SERIAL PRIMARY KEY,
  good_name VARCHAR(30) UNIQUE NOT NULL,
  typeofgood_id INT NOT NULL
);

INSERT INTO goods (good_id, good_name, typeofgood_id) VALUES
    (1, 'Beef', 2),
    (2, 'Pepper', 3),
    (3, 'Tomato', 3),
    (4, 'Eggs', 1),
    (5, 'Cheese', 1),
    (6, 'Milk', 1),
    (7, 'Bread', 1),
    (8, 'Chicken Breast', 2),
    (9, 'Potato', 2),
    (10, 'Butter', 1),
    (11, 'Flour', 4),
    (12, 'Olive Oil', 5),
    (13, 'Tuna', 6),
    (14, 'Broccoli', 3);

CREATE TABLE ingredients (
  ingredient_id SERIAL PRIMARY KEY,
  recipe_id INT NOT NULL,
  good_id INT NOT NULL
);

INSERT INTO ingredients (recipe_id, good_id) VALUES
    (1, 8),
    (1, 10),
    (2, 10),
    (2, 4),
    (2, 2),
    (3, 3),
    (4, 11),
    (4, 4),
    (4, 12),
    (4, 9),
    (5, 8),
    (5, 4),
    (5, 10),
    (6, 13),
    (6, 12),
    (6, 2),
    (7, 8),
    (7, 10),
    (7, 9),
    (7, 14);

CREATE TABLE recipes (
  recipe_id SERIAL PRIMARY KEY NOT NULL,
  recipe_name VARCHAR(99) NOT NULL,
  imgurl VARCHAR(255) NOT NULL,
  url VARCHAR(255) NOT NULL
);

INSERT INTO recipes (recipe_id, recipe_name, imgurl, url)
VALUES
    (1,'Baked Chicken', 'http://assets.simplyrecipes.com/wp-content/uploads/2008/01/baked-chicken-horizontal-600.jpg', 'http://www.food.com/recipe/baked-chicken-111514'),
    (2,'Scrambled Eggs', 'http://assets.epicurious.com/photos/57b35f844924889253994109/6:4/w_620%2Ch_413/scrambled-eggs.jpg', 'http://www.epicurious.com/recipes/food/views/Scrambled-Eggs-40038'),
    (3,'Tomato Juice', 'http://img.sndimg.com/food/image/upload/h_420,w_560,c_fit/v1/img/recipes/18/89/81/picGdB6S4.jpg', 'http://www.food.com/recipe/tomato-juice-canning-188981'),
    (4,'Grandmas Gnocchi', 'http://images.media-allrecipes.com/userphotos/560x315/3069557.jpg', 'http://allrecipes.com/recipe/84136/grandmas-gnocchi/'),
    (5,'Chicken Schnitzel', 'http://img.sndimg.com/food/image/upload/h_420,w_560,c_fit/v1/img/recipes/14/36/78/picvuS5uA.jpg', 'http://www.food.com/recipe/chicken-schnitzel-143678'),
    (6,'Tuna with Grilled Tomato', 'https://eatsmarter.com/sites/default/files/styles/920x517/public/tuna-with-grilled-tomato-610934.jpg', 'https://eatsmarter.com/recipes/tuna-with-grilled-tomato'),
    (7,'Roast Chicken Breast with Vegetables', 'https://eatsmarter.com/sites/default/files/styles/920x517/public/roast-chicken-breast-with-vegetables-600424.jpg', 'https://eatsmarter.com/recipes/roast-chicken-breast-with-vegetables');
