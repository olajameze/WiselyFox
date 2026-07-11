-- AlterTable
ALTER TABLE "QuestProgress" ADD COLUMN "completedAt" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "QuestSticker" (
    "id" TEXT NOT NULL,
    "childId" TEXT NOT NULL,
    "questSlug" TEXT NOT NULL,
    "questTitle" TEXT NOT NULL,
    "stickerSeed" TEXT NOT NULL,
    "emoji" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "bgColor" TEXT NOT NULL,
    "xpBonus" INTEGER NOT NULL DEFAULT 15,
    "periodStart" TIMESTAMP(3) NOT NULL,
    "earnedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "QuestSticker_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "QuestSticker_childId_questSlug_periodStart_key" ON "QuestSticker"("childId", "questSlug", "periodStart");

-- AddForeignKey
ALTER TABLE "QuestSticker" ADD CONSTRAINT "QuestSticker_childId_fkey" FOREIGN KEY ("childId") REFERENCES "ChildProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AlterTable
ALTER TABLE "SubjectCompletion" ADD COLUMN "certificateCode" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "SubjectCompletion_certificateCode_key" ON "SubjectCompletion"("certificateCode");
