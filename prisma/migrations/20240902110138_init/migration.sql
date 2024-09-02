-- DropForeignKey
ALTER TABLE "Analysis" DROP CONSTRAINT "Analysis_entryID_fkey";

-- AddForeignKey
ALTER TABLE "Analysis" ADD CONSTRAINT "Analysis_entryID_fkey" FOREIGN KEY ("entryID") REFERENCES "JournalEntry"("id") ON DELETE CASCADE ON UPDATE CASCADE;
