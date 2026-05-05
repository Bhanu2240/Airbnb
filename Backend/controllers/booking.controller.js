import prisma from '../config/prisma.js';

// Create a new booking
export const createBooking = async (req, res) => {
  try {
    const { listingId, startDate, endDate, totalPrice } = req.body;
    const userId = req.userId; // From isAuth middleware

    // Parse dates
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Check for overlapping dates
    const overlaps = await prisma.booking.findMany({
      where: {
        listingId,
        OR: [
          {
            startDate: { lte: end },
            endDate: { gte: start }
          }
        ]
      }
    });

    if (overlaps.length > 0) {
      return res.status(400).json({ success: false, message: "These dates are already booked for this listing." });
    }

    const booking = await prisma.booking.create({
      data: {
        userId,
        listingId,
        startDate: start,
        endDate: end,
        totalPrice
      }
    });

    return res.status(201).json({ success: true, booking, message: "Booking created successfully!" });
  } catch (error) {
    console.error("createBooking error:", error);
    return res.status(500).json({ success: false, message: "Failed to create booking.", error: error.message });
  }
};

// Fetch bookings made by the current user (My Trips)
export const getUserTrips = async (req, res) => {
  try {
    const userId = req.userId;
    const trips = await prisma.booking.findMany({
      where: { userId },
      include: { listing: true },
      orderBy: { startDate: 'desc' }
    });
    return res.status(200).json({ success: true, trips });
  } catch (error) {
    console.error("getUserTrips error:", error);
    return res.status(500).json({ success: false, message: "Failed to fetch trips.", error: error.message });
  }
};

// Fetch bookings for listings owned by the current user (My Reservations)
export const getOwnerReservations = async (req, res) => {
  try {
    const userId = req.userId;

    const reservations = await prisma.booking.findMany({
      where: {
        listing: {
          userId: userId
        }
      },
      include: {
        listing: true,
        user: {
          select: { id: true, name: true, email: true }
        }
      },
      orderBy: { startDate: 'desc' }
    });

    return res.status(200).json({ success: true, reservations });
  } catch (error) {
    console.error("getOwnerReservations error:", error);
    return res.status(500).json({ success: false, message: "Failed to fetch reservations.", error: error.message });
  }
};
