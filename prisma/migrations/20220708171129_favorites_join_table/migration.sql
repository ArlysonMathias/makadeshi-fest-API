/*
  Warnings:

  - You are about to drop the `_FilmToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_FilmToUser" DROP CONSTRAINT "_FilmToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_FilmToUser" DROP CONSTRAINT "_FilmToUser_B_fkey";

-- DropTable
DROP TABLE "_FilmToUser";

-- CreateTable
CREATE TABLE "favorite" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,
    "film_name" TEXT NOT NULL,

    CONSTRAINT "favorite_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "favorite" ADD CONSTRAINT "favorite_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorite" ADD CONSTRAINT "favorite_film_name_fkey" FOREIGN KEY ("film_name") REFERENCES "film"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
