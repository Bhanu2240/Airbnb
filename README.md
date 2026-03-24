# Airbnb Clone
A full-stack Airbnb clone where users can list properties, view listings, and reserve stays.
## Features
- User Signup & Login (JWT Authentication)
- Add Listing
- Edit Listing
- Delete Listing
- View Listings
- Upload Property Images
- Book / Reserve Property
- Responsive UI
## Tech Stack
Frontend: React.js, Tailwind CSS
Backend: Node.js, Express.js
Database: postgres
ORM: Prisma
Authentication: JWT (JSON Web Token)
Image Upload: Multer / Cloudinary
## Installation

1. Clone the repository
git clone https://github.com/your-username/airbnb-clone.git

2. Go to project folder
cd airbnb-clone

3. Install frontend dependencies
cd client
npm install

4. Install backend dependencies
cd server
npm install

5. Create .env file in server folder and add:
PORT=5000
DATABASE_URL=your_database_url
JWT_SECRET=your_secret_key

6. Run backend
npm run dev

7. Run frontend
npm start
## Folder Structure

client/
  src/
    components/
    pages/
    context/

server/
  routes/
  controllers/
  middleware/
  prisma/

  ## API Routes

POST   /api/auth/signup
POST   /api/auth/login
GET    /api/listing/get
POST   /api/listing/add
PUT    /api/listing/update/:id
DELETE /api/listing/delete/:
## Author
Bhanu Aitireddy