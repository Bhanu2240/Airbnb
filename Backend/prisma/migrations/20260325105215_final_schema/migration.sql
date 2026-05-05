/*
  Warnings:

  - You are about to drop the column `userId` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Listing` table. All the data in the column will be lost.
  - Added the required column `checkIn` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `checkOut` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `guestId` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hostId` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalRent` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category` to the `Listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `Listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hostId` to the `Listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image1` to the `Listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `landmark` to the `Listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rent` to the `Listing` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('booked', 'cancel');

-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_userId_fkey";

-- DropForeignKey
ALTER TABLE "Listing" DROP CONSTRAINT "Listing_userId_fkey";

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "userId",
ADD COLUMN     "checkIn" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "checkOut" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "guestId" INTEGER NOT NULL,
ADD COLUMN     "hostId" INTEGER NOT NULL,
ADD COLUMN     "status" "BookingStatus" NOT NULL DEFAULT 'booked',
ADD COLUMN     "totalRent" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Listing" DROP COLUMN "userId",
ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "guestId" INTEGER,
ADD COLUMN     "hostId" INTEGER NOT NULL,
ADD COLUMN     "image1" TEXT NOT NULL,
ADD COLUMN     "image2" TEXT,
ADD COLUMN     "image3" TEXT,
ADD COLUMN     "isBooked" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "landmark" TEXT NOT NULL,
ADD COLUMN     "ratings" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "rent" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Listing" ADD CONSTRAINT "Listing_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Listing" ADD CONSTRAINT "Listing_guestId_fkey" FOREIGN KEY ("guestId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_guestId_fkey" FOREIGN KEY ("guestId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
