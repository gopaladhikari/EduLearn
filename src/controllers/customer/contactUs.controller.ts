import { ContactUs } from "../../models/customer/contactUs.model";
import { dbHandler } from "../../utils/dbHandler";
import { contactUsSchema } from "../../schemas/contactUs.schema";
import { ApiSuccess, ApiError } from "../../utils/apiResponse";

export const createContactUs = dbHandler(async (req, res) => {
  const { success, data, error } = contactUsSchema.safeParse(req.body);

  if (!success) throw new ApiError(error.message);

  const newContactRequest = await ContactUs.create({
    name: data.name,
    email: data.email,
    issue: data.issue,
  });

  return res
    .status(201)
    .json(
      new ApiSuccess(
        "Contact request created successfully!",
        newContactRequest
      )
    );
});
