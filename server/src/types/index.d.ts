import type { Admin } from "../models/admin/admin.model";
import type { Customer } from "../models/customer/customer.model";

declare global {
  namespace Express {
    interface Request {
      admin?: Admin;
      customer?: Customer;
    }
  }
}
