-- DropIndex
DROP INDEX "Link_original_key";

-- AlterTable
ALTER TABLE "Click" ADD COLUMN     "browser" TEXT,
ADD COLUMN     "device" TEXT,
ADD COLUMN     "os" TEXT,
ADD COLUMN     "referrer" TEXT;
