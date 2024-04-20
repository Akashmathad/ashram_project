/*
  Warnings:

  - Added the required column `imageDisplay` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageDownload` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Parent" DROP CONSTRAINT "Parent_studentId_fkey";

-- DropForeignKey
ALTER TABLE "PreviousRecord" DROP CONSTRAINT "PreviousRecord_studentId_fkey";

-- DropForeignKey
ALTER TABLE "Sibling" DROP CONSTRAINT "Sibling_studentId_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_branchId_fkey";

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "imageDisplay" TEXT NOT NULL,
ADD COLUMN     "imageDownload" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Parent" ADD CONSTRAINT "Parent_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sibling" ADD CONSTRAINT "Sibling_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PreviousRecord" ADD CONSTRAINT "PreviousRecord_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;
