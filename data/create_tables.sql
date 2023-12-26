BEGIN;

DROP TABLE IF EXISTS "paintings";
DROP TABLE IF EXISTS "messages";

CREATE TABLE "paintings" (
    "id" SERIAL PRIMARY KEY,
    "url_img" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "messages" (
    "id" SERIAL PRIMARY KEY,
    "lastname" TEXT,
    "firstname" TEXT NOT NULL,
    "mail" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ
);

COMMIT;
