import express from 'express';
import { login, logOut, register } from '../controllers/user.controller.js';
import isAuthenticated from '../middlewares/user.middleware.js';
import { singleUpload } from '../middlewares/multer.middleware.js';

const router = express.Router();

router.post('/register', singleUpload, register);
router.post('/login', login);
router.get('/logout', logOut);

//  direct try-catch ke sath route
router.post("/update/profile", isAuthenticated, singleUpload, async (req, res) => {
  try {

    res.json({ success: true, message: "Profile updated successfully" });
  } catch (err) {
    console.error(" Error in update profile:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message

    });
  }
});

export default router;
