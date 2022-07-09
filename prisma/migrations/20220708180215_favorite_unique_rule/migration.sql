/*
  Warnings:

  - A unique constraint covering the columns `[user_id,film_name]` on the table `favorite` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "favorite_user_id_film_name_key" ON "favorite"("user_id", "film_name");
