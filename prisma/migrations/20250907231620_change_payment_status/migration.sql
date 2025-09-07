/*
  Warnings:

  - The `paymentStatus` column on the `Order` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('SUCCESS', 'PENDING', 'FAILED');

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "paymentStatus",
ADD COLUMN     "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'PENDING';
