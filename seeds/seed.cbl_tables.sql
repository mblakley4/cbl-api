BEGIN:

TRUNCATE
  cbl_breweries,
  cbl_beers,
  cbl_comments
  RESTART IDENTITY CASCADE;

INSERT INTO cbl_breweries (name, city, us_state, image)
VALUES
  ('SweetWater', 'Atlanta', 'GA', 'https://sweetwaterbrew.com/wp-content/themes/sweetwater/assets/production/images/sw-header-logo.png'),
  ('Wicked Barley', 'Jacksonville', 'FL', 'https://www.wickedbarley.com/wp-content/uploads/2015/02/logo.png'),
  ('Southern Swells', 'Jacksonville', 'FL', 'https://static1.squarespace.com/static/5bbd5969348cd96fd293f13f/t/5be3172f4ae2375f274be673/1575644508652/?format=1500w');

INSERT INTO cbl_beers (name, style, ABV, IBU, description, beerColor, breweryId, rating)
VALUES
  ('beer1', 'Session IPA', '4.4', '32', 'Lorem ipsum dolor sit amet, consectetur adipisicing','#C1963C', 3, '5'),
  ('beer2', 'Mai Bach', '4.4', '', 'Lorem ipsum dolor sit amet, consectetur adipisicing','#E0D01B', 1, '3'),
  ('beer3', 'Red IPA', '', '32', 'Lorem ipsum dolor sit amet, consectetur adipisicing','#361F1B', 2, '1'),
  ('beer4', 'Lager', '4.4', '32', 'Lorem ipsum dolor sit amet, consectetur adipisicing','#C1963C', 2, '4'),
  ('beer5', 'IPA', '4.4', '32', 'Lorem ipsum dolor sit amet, consectetur adipisicing','#6B3A1E', 3, '2'),
  ('beer6', 'Stout', '4.4', '32', 'Lorem ipsum dolor sit amet, consectetur adipisicing','#19100F', 1, '5');

INSERT INTO cbl_comments (text, userName, beerId)
VALUES
  ('Mike', 'This beer rocks!', 5),
  ('Marie', 'Yea it does', 5),
  ('Mark', 'Great beer', 6);

COMMIT;
