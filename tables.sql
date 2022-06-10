CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    "createdAt" DATE DEFAULT NOW()
);

CREATE TABLE urls (
    id SERIAL PRIMARY KEY,
    url TEXT NOT NULL,
    "shortUrl" TEXT NOT NULL UNIQUE,
    "userId" INTEGER NOT NULL REFERENCES users(id),
    clicks INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATE DEFAULT NOW()
);
