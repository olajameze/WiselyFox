-- AlterTable
ALTER TABLE "TutorProfile" ADD COLUMN "dbsLetterUrl" TEXT,
ADD COLUMN "photoIdUrl" TEXT,
ADD COLUMN "proofOfAddressUrl" TEXT,
ADD COLUMN "isVerified" BOOLEAN NOT NULL DEFAULT false;
