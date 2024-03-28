-- CreateEnum
CREATE TYPE "ClassType" AS ENUM ('First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth', 'Seventh', 'Eighth', 'Ninth', 'Tenth', 'Eleventh', 'Twelfth', 'Degree');

-- CreateEnum
CREATE TYPE "GenderType" AS ENUM ('MALE', 'FEMALE', 'OTHERS');

-- CreateTable
CREATE TABLE "Branch" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "head" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "place" TEXT NOT NULL,
    "pincode" INTEGER NOT NULL,

    CONSTRAINT "Branch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Student" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "class" "ClassType" NOT NULL,
    "academicYear" TIMESTAMP(3) NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "gender" "GenderType" NOT NULL,
    "religion" TEXT NOT NULL,
    "caste" TEXT NOT NULL,
    "aadharNo" BIGINT NOT NULL,
    "mobileNo" BIGINT NOT NULL,
    "address" TEXT NOT NULL,
    "pincode" INTEGER NOT NULL,
    "motherTongue" TEXT NOT NULL,
    "bloodGroup" TEXT NOT NULL,
    "father" BOOLEAN NOT NULL,
    "mother" BOOLEAN NOT NULL,
    "staysWith" TEXT NOT NULL,
    "branchId" TEXT NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Parent" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "qualification" TEXT NOT NULL,
    "occupation" TEXT NOT NULL,
    "aadharNo" BIGINT NOT NULL,
    "mobileNo" BIGINT NOT NULL,
    "income" BIGINT NOT NULL,
    "studentId" TEXT NOT NULL,

    CONSTRAINT "Parent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sibling" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "gender" "GenderType" NOT NULL,
    "age" INTEGER NOT NULL,
    "class" "ClassType" NOT NULL,
    "nameOfSchool" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,

    CONSTRAINT "Sibling_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PreviousRecord" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "place" TEXT NOT NULL,
    "class" "ClassType" NOT NULL,
    "yearOfStudy" TIMESTAMP(3) NOT NULL,
    "percentage" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,

    CONSTRAINT "PreviousRecord_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Parent" ADD CONSTRAINT "Parent_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sibling" ADD CONSTRAINT "Sibling_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PreviousRecord" ADD CONSTRAINT "PreviousRecord_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
