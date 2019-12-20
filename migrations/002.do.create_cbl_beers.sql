CREATE TABLE cbl_beers (
  id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  name TEXT NOT NULL,
  style TEXT NOT NULL,
  ABV TEXT DEFAULT 'N/A',
  IBU TEXT DEFAULT 'N/A',
  description TEXT,
  beerColor TEXT NOT NULL,
  rating TEXT NOT NULL,
  date_created TIMESTAMP DEFAULT now() NOT NULL,
  date_modified TIMESTAMP,
  breweryId INTEGER
    REFERENCES cbl_breweries(id) ON DELETE CASCADE NOT NULL
);
