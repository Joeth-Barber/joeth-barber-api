/*
  Warnings:

  - The primary key for the `booking_services` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `booking_services` table. All the data in the column will be lost.
  - Added the required column `assignedBy` to the `booking_services` table without a default value. This is not possible if the table is not empty.
  - Made the column `isMonthlyPayer` on table `customers` required. This step will fail if there are existing NULL values in that column.
  - Made the column `debt` on table `customers` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "booking_services" DROP CONSTRAINT "booking_services_pkey",
DROP COLUMN "id",
ADD COLUMN     "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "assignedBy" TEXT NOT NULL,
ADD CONSTRAINT "booking_services_pkey" PRIMARY KEY ("serviceId", "bookingId");

-- AlterTable
ALTER TABLE "customers" ALTER COLUMN "isMonthlyPayer" SET NOT NULL,
ALTER COLUMN "debt" SET NOT NULL;
