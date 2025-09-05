/*
  Warnings:

  - The values [PAYPAL] on the enum `PaymentType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PaymentType_new" AS ENUM ('CASH', 'STRIPE');
ALTER TABLE "Order" ALTER COLUMN "paymentType" DROP DEFAULT;
ALTER TABLE "Order" ALTER COLUMN "paymentType" TYPE "PaymentType_new" USING ("paymentType"::text::"PaymentType_new");
ALTER TYPE "PaymentType" RENAME TO "PaymentType_old";
ALTER TYPE "PaymentType_new" RENAME TO "PaymentType";
DROP TYPE "PaymentType_old";
ALTER TABLE "Order" ALTER COLUMN "paymentType" SET DEFAULT 'CASH';
COMMIT;

-- AlterTable
ALTER TABLE "FoodOptions" ADD COLUMN     "stripePriceId" TEXT NOT NULL DEFAULT 'test';
