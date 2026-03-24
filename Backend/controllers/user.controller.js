import prisma from "../config/prisma.js";

export const getCurrentUser = async (req, res) => {
    try {
        let user = await prisma.user.findUnique({
            where: {
                id: req.userId
            },
            select: {
                id: true,
                name: true,
                email: true,
                listing: {          // this is populate
                    select: {
                        id: true,
                        title: true,
                        image1: true,
                        image2: true,
                        image3: true,
                        description: true,
                        rent: true,
                        category: true,
                        city: true,
                        landmark: true
                    }
                }
            }
        });

        if (!user) {
            return res.status(400).json({ message: "user doesn't found" });
        }

        res.status(200).json(user);

    } catch (error) {
        res.status(500).json({ message: `getCurrentUser error ${error}` });
    }
};