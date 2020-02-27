-- Up
CREATE TABLE users (
    id          VARCHAR primary key,
    name        VARCHAR not null,
    email       VARCHAR not null,
    password    VARCHAR not null,
    role        VARCHAR not null
);
CREATE TABLE projects (
    id          VARCHAR PRIMARY KEY,
    name        VARCHAR DEFAULT "Unknown project" not null,
    description VARCHAR DEFAULT "No description" not null,
    git         VARCHAR DEFAULT "No git repository" not null,
    url         VARCHAR DEFAULT "No public url" not null,
    private     INTEGER DEFAULT 0 not null,
    owner       VARCHAR not null
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