-- CreateEnum
CREATE TYPE "TutorVerificationStatus" AS ENUM ('DRAFT', 'PENDING_AGE_REVIEW', 'PENDING_PROFILE_REVIEW', 'VERIFIED', 'REJECTED', 'SUSPENDED');

-- CreateEnum
CREATE TYPE "TutorBookingStatus" AS ENUM ('INQUIRY', 'CONFIRMED', 'DEPOSIT_PAID', 'COMPLETED', 'CANCELLED', 'REFUNDED');

-- CreateEnum
CREATE TYPE "TutorStudentAccessStatus" AS ENUM ('PENDING', 'ACTIVE', 'REVOKED');

-- CreateEnum
CREATE TYPE "TutorStudentAccessSource" AS ENUM ('MANUAL', 'BOOKING');

-- CreateEnum
CREATE TYPE "TutorConsentType" AS ENUM ('TUTOR_TERMS', 'TUTOR_FEE_DISCLOSURE');

-- CreateEnum
CREATE TYPE "TutorInquiryStatus" AS ENUM ('OPEN', 'RESPONDED', 'CLOSED');

-- CreateTable
CREATE TABLE "TutorProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "headline" TEXT NOT NULL DEFAULT '',
    "bio" TEXT NOT NULL DEFAULT '',
    "subjects" TEXT NOT NULL DEFAULT '[]',
    "ageBands" TEXT NOT NULL DEFAULT '[]',
    "qualifications" TEXT NOT NULL DEFAULT '[]',
    "hourlyRatePence" INTEGER NOT NULL DEFAULT 0,
    "profilePhotoUrl" TEXT,
    "dateOfBirth" TIMESTAMP(3),
    "ageVerifiedAt" TIMESTAMP(3),
    "verifiedAt" TIMESTAMP(3),
    "verificationStatus" "TutorVerificationStatus" NOT NULL DEFAULT 'DRAFT',
    "stripeAccountId" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "feeTermsAcceptedAt" TIMESTAMP(3),
    "feeTermsVersion" TEXT,
    "acceptsDeposits" BOOLEAN NOT NULL DEFAULT false,
    "depositPercent" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TutorProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TutorVerification" (
    "id" TEXT NOT NULL,
    "tutorId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "reviewedById" TEXT,
    "metadata" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TutorVerification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TutorConsentRecord" (
    "id" TEXT NOT NULL,
    "tutorId" TEXT NOT NULL,
    "type" "TutorConsentType" NOT NULL,
    "granted" BOOLEAN NOT NULL,
    "version" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TutorConsentRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TutorInquiry" (
    "id" TEXT NOT NULL,
    "tutorId" TEXT NOT NULL,
    "parentId" TEXT NOT NULL,
    "childId" TEXT,
    "message" TEXT NOT NULL,
    "response" TEXT,
    "status" "TutorInquiryStatus" NOT NULL DEFAULT 'OPEN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TutorInquiry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TutorBooking" (
    "id" TEXT NOT NULL,
    "tutorId" TEXT NOT NULL,
    "parentId" TEXT NOT NULL,
    "childId" TEXT,
    "amountPence" INTEGER NOT NULL,
    "depositPence" INTEGER,
    "platformFeePence" INTEGER NOT NULL DEFAULT 0,
    "stripePaymentIntentId" TEXT,
    "status" "TutorBookingStatus" NOT NULL DEFAULT 'INQUIRY',
    "autoShareProgress" BOOLEAN NOT NULL DEFAULT true,
    "learnerAlias" TEXT,
    "feeTermsVersion" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TutorBooking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TutorStudentAccess" (
    "id" TEXT NOT NULL,
    "tutorProfileId" TEXT NOT NULL,
    "childId" TEXT NOT NULL,
    "parentId" TEXT NOT NULL,
    "learnerAlias" TEXT NOT NULL,
    "status" "TutorStudentAccessStatus" NOT NULL DEFAULT 'PENDING',
    "source" "TutorStudentAccessSource" NOT NULL,
    "bookingId" TEXT,
    "grantedAt" TIMESTAMP(3),
    "revokedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TutorStudentAccess_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TutorProfile_userId_key" ON "TutorProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "TutorStudentAccess_tutorProfileId_childId_key" ON "TutorStudentAccess"("tutorProfileId", "childId");

-- AddForeignKey
ALTER TABLE "TutorProfile" ADD CONSTRAINT "TutorProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TutorVerification" ADD CONSTRAINT "TutorVerification_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "TutorProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TutorConsentRecord" ADD CONSTRAINT "TutorConsentRecord_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "TutorProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TutorInquiry" ADD CONSTRAINT "TutorInquiry_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "TutorProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TutorInquiry" ADD CONSTRAINT "TutorInquiry_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "ParentProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TutorBooking" ADD CONSTRAINT "TutorBooking_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "TutorProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TutorBooking" ADD CONSTRAINT "TutorBooking_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "ParentProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TutorStudentAccess" ADD CONSTRAINT "TutorStudentAccess_tutorProfileId_fkey" FOREIGN KEY ("tutorProfileId") REFERENCES "TutorProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TutorStudentAccess" ADD CONSTRAINT "TutorStudentAccess_childId_fkey" FOREIGN KEY ("childId") REFERENCES "ChildProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TutorStudentAccess" ADD CONSTRAINT "TutorStudentAccess_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "ParentProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TutorStudentAccess" ADD CONSTRAINT "TutorStudentAccess_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "TutorBooking"("id") ON DELETE SET NULL ON UPDATE CASCADE;
