/*
  Warnings:

  - A unique constraint covering the columns `[studentId,type]` on the table `Parent` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `type` to the `Parent` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ParentType" AS ENUM ('Father', 'Mother', 'Guardain');

-- AlterTable
ALTER TABLE "Parent" ADD COLUMN     "type" "ParentType" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Parent_studentId_type_key" ON "Parent"("studentId", "type");
