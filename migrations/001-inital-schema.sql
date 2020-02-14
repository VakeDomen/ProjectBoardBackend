-- Up
CREATE TABLE users (
    id          VARCHAR primary key,
    name        VARCHAR not null,
    password    VARCHAR not null
);
CREATE TABLE projects (
    id          VARCHAR PRIMARY KEY,
    name        VARCHAR not null,
    description VARCHAR null,
    git         VARCHAR null,
    url         VARCHAR null,
    private     INTEGER not null
);
CREATE TABLE images (
    id          VARCHAR PRIMARY KEY,
    project_id  VARCHAR not null,
    path        VARCHAR not null
);

-- Down
DROP TABLE users;
DROP TABLE projects;
DROP TABLE images;