/*
  Warnings:

  - You are about to drop the column `url` on the `Video` table. All the data in the column will be lost.
  - Added the required column `fileName` to the `Video` table without a default value. This is not possible if the table is not empty.
  - Added the required column `originalFileName` to the `Video` table without a default value. This is not possible if the table is not empty.
  - Added the required column `path` to the `Video` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Video" DROP COLUMN "url",
ADD COLUMN     "fileName" TEXT NOT NULL,
ADD COLUMN     "originalFileName" TEXT NOT NULL,
ADD COLUMN     "path" TEXT NOT NULL;
