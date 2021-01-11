CREATE TYPE article_catagory AS ENUM (
    'Listicle',
    'How-to',
    'News',
    'Interview',
    'Story'
);

ALTER TABLE blogful_articles
    ADD COLUMN
        style article_catagory;