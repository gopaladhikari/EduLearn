// import { cache } from "../../config/node-cache";
import { Customer } from "../../models/customer/customer.model";
import { userSchema } from "../../schemas/userSchema";
import { ApiError, ApiSuccess } from "../../utils/apiResponse";
import { dbHandler } from "../../utils/dbHandler";
import admin, { ServiceAccount } from "firebase-admin";
import serviceAccount from "../../config/firebase.json";
import { env } from "../../config/env";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as ServiceAccount),
  databaseURL: `${env.mongoUri}/${env.dbName}/customers`,
});

export const registerUser = dbHandler(async (req, res) => {
  const { success, data, error } = userSchema.safeParse(req.body);

  if (!success) throw new ApiError(400, "Invalid data", error.issues);

  // const result = await admin.auth().createCustomToken(data.phoneNumber);
  // console.log(result);

  // const user = await Customer.create({
  //   fullName: data.fullName,
  //   phoneNumber: data.phoneNumber,
  //   email: data.email,
  // });

  // if (!user) throw new ApiError(400,"User not created");

  res.status(201).json(new ApiSuccess("User created successfully", data));
});

export const loginUser = dbHandler(async (req, res) => {});
