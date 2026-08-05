-- CreateEnum
CREATE TYPE "ProposalStatus" AS ENUM ('PENDING_PARENT_APPROVAL', 'APPROVED_AND_PAID', 'DECLINED');

-- CreateEnum
CREATE TYPE "AssignmentStatus" AS ENUM ('ASSIGNED', 'IN_PROGRESS', 'COMPLETED', 'REVIEWED');

-- AlterTable
ALTER TABLE "WaitlistLead" RENAME CONSTRAINT "WaitlistSignup_pkey" TO "WaitlistLead_pkey";

-- CreateTable
CREATE TABLE "TutorProposal" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "tutorId" TEXT NOT NULL,
    "parentId" TEXT NOT NULL,
    "status" "ProposalStatus" NOT NULL DEFAULT 'PENDING_PARENT_APPROVAL',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TutorProposal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LessonAssignment" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "tutorId" TEXT NOT NULL,
    "parentId" TEXT NOT NULL,
    "lessonTitle" TEXT NOT NULL,
    "tutorNotes" TEXT NOT NULL,
    "status" "AssignmentStatus" NOT NULL DEFAULT 'ASSIGNED',
    "isFlaggedByParent" BOOLEAN NOT NULL DEFAULT false,
    "parentFlagReason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LessonAssignment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TutorProposal" ADD CONSTRAINT "TutorProposal_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TutorProposal" ADD CONSTRAINT "TutorProposal_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LessonAssignment" ADD CONSTRAINT "LessonAssignment_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LessonAssignment" ADD CONSTRAINT "LessonAssignment_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER INDEX "WaitlistSignup_email_key" RENAME TO "WaitlistLead_email_key";
