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
 *           description: Login was successful
 *           content:
 *             application/json:
 *               example: 
 *                 accessToken: "eyExampleToken"
 *                 refreshToken: "eyExampleToken"
 *         400:
 *           description: Something went wrong
 *           content:
 *             application/json:
 *               example: 
 *                 message: "Invalid credentials"
 *         401:
 *           description: Invalid credentials
 *           content:
 *             application/json:
 *               example: 
 *                 message: "Invalid credentials"
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
 *           description: The user profile was successfully updated
 *           content:
 *             application/json:
 *               example: 
 *                 message: "User was successfully updated"
 *         400:
 *           description: Something went wrong
 *           content:
 *             application/json:
 *               example: 
 *                 message: "Something went wrong"
 *         404:
 *           description: User not found
 *           content:
 *             application/json:
 *               example: 
 *                 message: "User not found"
 *         422:
 *           description: Invalid name or password
 *           content:
 *             application/json:
 *               example: 
 *                 message: "Invalid name or password"
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
 *           description: Registration was successful
 *           content:
 *             application/json:
 *               example: 
 *                 accessToken: "eyExampleToken"
 *         400:
 *           description: Something went wrong
 *           content:
 *             application/json:
 *               example: 
 *                 message: "Something went wrong"
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
