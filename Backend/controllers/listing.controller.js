import uploadOnCloudinary from "../config/cloudinary.js";
import prisma from "../config/prisma.js";
export const addListing = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILES:", req.files);
    console.log("USER ID:", req.userId);

    let { title, description, rent, city, landmark, category } = req.body;

    if (!req.userId) {
      return res.status(400).json({ message: "User not authenticated" });
    }

    let image1 = null;
    let image2 = null;
    let image3 = null;

    if (req.files && req.files.image1) {
      console.log("Uploading image1...");
      image1 = await uploadOnCloudinary(req.files.image1[0].path);
    }

    if (req.files && req.files.image2) {
      console.log("Uploading image2...");
      image2 = await uploadOnCloudinary(req.files.image2[0].path);
    }

    if (req.files && req.files.image3) {
      console.log("Uploading image3...");
      image3 = await uploadOnCloudinary(req.files.image3[0].path);
    }

    console.log("Creating listing in DB...");

    let listing = await prisma.listing.create({
      data: {
        title,
        description,
        rent: Number(rent),
        city,
        landmark,
        category,
        image1,
        image2,
        image3,
        userId: req.userId
      }
    });

    console.log("Listing created:", listing);

    res.status(201).json(listing);
  } catch (error) {
    console.log("AddListing error:", error);
    res.status(500).json({ message: error.message });
  }
};



export const getListing = async (req, res) => {
  try {
    let listing = await prisma.listing.findMany({
      orderBy: {
        createdAt: "desc"
      }
    });

    res.status(200).json(listing);
  } catch (error) {
    res.status(500).json({ message: `getListing error ${error}` });
  }
};
export const findListing = async (req, res) => {
  try {
    let { id } = req.params;

    let listing = await prisma.listing.findUnique({
      where: { id: Number(id) },   // ⚠️ id must be Number
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    return res.status(200).json(listing);

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `findListing error ${error}` });
  }
};
export const updateListing = async (req, res) => {
  try {
    let { id } = req.params;
    let { title, description, rent, city, landmark, category } = req.body;

    let image1, image2, image3;

    if (req.files.image1) {
      let result1 = await uploadOnCloudinary(req.files.image1[0].path);
      image1 = result1.secure_url;
    }

    if (req.files.image2) {
      let result2 = await uploadOnCloudinary(req.files.image2[0].path);
      image2 = result2.secure_url;
    }

    if (req.files.image3) {
      let result3 = await uploadOnCloudinary(req.files.image3[0].path);
      image3 = result3.secure_url;
    }

    let listing = await prisma.listing.update({
      where: { id: Number(id) },
      data: {
        title,
        description,
        rent: Number(rent),
        city,
        landmark,
        category,
        image1,
        image2,
        image3,
      },
    });

    res.status(200).json({
      message: "Listing updated",
      listing,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Update failed",
    });
  }
};