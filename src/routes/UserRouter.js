const router = require("express").Router();
const UserController = require("@controllers/UserController");
const { loginUser } = require("@middlewares/user");
const verifyToken = require("@middlewares/auth/verifyToken");
const registrationValid = require("@middlewares/registration/registrationValid");
const updateProfile = require("@middlewares/user/updateProfile");

/**
 * @swagger
 * tags:
 *   - name: Author
 *     description: Everything about Authors
 *   - name: User
 *     description: Everything about Users
 * 
 * paths:
 *   /user/login:
 *     post:
 *       summary: User login
 *       tags:
 *         - User
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                   description: User's email address.
 *                   example: user@example.com
 *                 password:
 *                   type: string
 *                   description: User's password.
 *                   example: examplePassword
 *       responses:
 *         200:
 *           description: Login successful
 *         400:
 *           description: Invalid login credentials
 * 
 *   /user/update-profile:
 *     post:
 *       summary: Update user profile
 *       tags:
 *         - User
 *       security:
 *         - bearerAuth: []
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   description: Updated user name.
 *                   example: John Doe
 *                 email:
 *                   type: string
 *                   description: Updated email address.
 *                   example: newuser@example.com
 *       responses:
 *         200:
 *           description: Profile update successful
 *         400:
 *           description: Update failed
 * 
 *   /user/registration:
 *     post:
 *       summary: User registration
 *       tags:
 *         - User
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   description: User's name.
 *                   example: John Doe
 *                 email:
 *                   type: string
 *                   description: User's email address.
 *                   example: user@example.com
 *                 password:
 *                   type: string
 *                   description: User's password.
 *                   example: examplePassword
 *       responses:
 *         200:
 *           description: Registration successful
 *         400:
 *           description: Registration failed
 */


router
  .route("/refresh-Token")
  .get([verifyToken], UserController.generateTokenPairs);
router.route("/login").post([loginUser], UserController.login);
router.route("/update-profile").post([verifyToken, updateProfile], UserController.update);
router
  .route("/registration")
  .post([registrationValid], UserController.registration);

module.exports = router;
