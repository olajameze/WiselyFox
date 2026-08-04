-- Data-preserving rename: WaitlistSignup -> WaitlistLead, plus ageBands column.
-- Existing waitlist rows keep their IDs, emails, and consent flags.
-- In PostgreSQL, ALTER TABLE ... RENAME TO automatically renames dependent
-- constraints and indexes (e.g. WaitlistSignup_pkey -> WaitlistLead_pkey), so
-- no explicit ALTER INDEX / RENAME CONSTRAINT statements are needed.

ALTER TABLE "WaitlistSignup" RENAME TO "WaitlistLead";

ALTER TABLE "WaitlistLead" ADD COLUMN "ageBands" TEXT NOT NULL DEFAULT '[]';
