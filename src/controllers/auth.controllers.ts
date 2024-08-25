import { dbHandler } from "../utils/dbHandler";
import { User } from "../models/user.model";
import { ApiError, ApiSuccess } from "../utils/apiResponse";
import admin from "firebase-admin";
import { firebaseCreds } from "../config/firebase";
import { userSchema } from "../schemas/userSchema";

admin.initializeApp({
  credential: admin.credential.cert(JSON.stringify(firebaseCreds)),
});

// const users = {
//   "6576t6t67fhghdgd": {
//     name: "Tasmin",
//     email: "tasmin@gmail.com",
//     mobileno: 1234567890,
//   },
// };

// const getUser = dbHandler(async () => {
//   const { authToken } = req.headers;

//   if (!authToken) throw new ApiError("authToken is required");

//   const { userId } = req.params;

//   const user = users[userId];

//   const user = await admin.auth().verifyIdToken(authToken);

//   if (user.uid !== userId) throw new ApiError("Invalid authToken");
// });

export const signUpWithPhoneNumber = dbHandler(async (req, res) => {
  const { success, data, error } = userSchema.safeParse(req.body);

  if (!success) throw new ApiError(error.message);

  const user = await User.create({
    name: data.name,
    email: data.email,
    mobileno: data.mobileno,
  });

  if (!user) throw new ApiError("User not created");

  res
    .status(201)
    .json(new ApiSuccess("User created successfully", user));
});

export const loginWithPhoneNumber = dbHandler(async (req, res) => {
  const { mobileno } = req.body;

  if (!mobileno) throw new ApiError("Mobileno is required");

  const user = await User.findOne({ mobileno });

  if (!user) throw new ApiError("User not found");

  res
    .status(200)
    .json(new ApiSuccess("User found successfully", user));
});
