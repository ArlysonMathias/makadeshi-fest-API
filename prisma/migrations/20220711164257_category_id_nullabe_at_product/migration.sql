-- DropForeignKey
ALTER TABLE "favorite" DROP CONSTRAINT "favorite_film_name_fkey";

-- DropForeignKey
ALTER TABLE "favorite" DROP CONSTRAINT "favorite_user_id_fkey";

-- DropForeignKey
ALTER TABLE "film" DROP CONSTRAINT "film_category_id_fkey";

-- AlterTable
ALTER TABLE "film" ALTER COLUMN "category_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "film" ADD CONSTRAINT "film_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorite" ADD CONSTRAINT "favorite_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorite" ADD CONSTRAINT "favorite_film_name_fkey" FOREIGN KEY ("film_name") REFERENCES "film"("name") ON DELETE CASCADE ON UPDATE CASCADE;
