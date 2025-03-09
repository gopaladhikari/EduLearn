export const invalidMongodbId = 'Invalid Mongodb ID';

export const AUTH_MESSAGES = {
  LOGIN_SUCCESS: 'User logged in successfully.',
  LOGOUT_SUCCESS: 'User logged out successfully.',
  INVALID_JWT_TOKEN: 'Invalid JWT token',
};

export const CART_MESSAGES = {
  GET: 'Get Cart',
  GET_DESC:
    "Retrieves the current user's cart, including items, total price, and item count.",
  GET_SUCCESS: 'Cart retrieved successfully.',
  ADD: 'Add to Cart',
  ADD_DESC:
    "Adds a course to the current user's cart along with the price at the time of addition.",
  ADD_SUCCESS: 'Course added to cart successfully.',
  DELETE: 'Delete Cart Item',
  DELETE_DESC: "Removes a specific course from the user's cart.",
};

export const MAIL_MESSAGES = {
  EMAIL_FAIL: 'Sending email failed',
  EMAIL_SUCCESS: 'Email sent successfully',
  FORGOT_PASSWORD: 'Request forgot password',
  VERIFY_EMAIL: 'Verify email',
};

export const USERS_MESSAGES = {
  CREATE_SUCCESS: 'User created successfully',
  DUPLICATE_FIELD: 'A user with this {duplicateField} already exists',
  INVALID_CREDENTIALS: 'Invalid email or password',
  UPDATE_SUCCESS: 'User updated successfully',
  NOT_FOUND: 'User not found',
  AVATAR_UPDATE_SUCCESS: 'Avatar updated successfully',
  AVATAR_NOT_FOUND: 'Avatar not found',
  FORBIDDEN: 'You are not authorized to access this resource',
  FETCH_SUCCESS: 'Users fetched successfully',
};

export const COURSES_MESSAGES = {
  FETCH_SUCCESS: 'Courses fetched successfully',
  FETCH_BY_SLUG_SUCCESS: 'Course fetched successfully',
  NOT_FOUND: 'Course not found',
  PUBLISH_SUCCESS: 'Course published successfully',
  DELETE_SUCCESS: 'Course deleted successfully',
  INVALID_IDS: 'Invalid Course IDs',
  COURSE_ID_NOT_FOUND: 'Course ID not found',
  CREATED_SUCCESS: 'Course created successfully',
};

export const ANALYTICS_MESSAGES = {
  UPDATE_SUCCESS: 'Analytics updated successfully',
  PLATFORM_FETCH_SUCCESS: 'Platform analytics fetched successfully',
  COURSE_FETCH_SUCCESS: 'Course analytics fetched successfully',
  NOT_FOUND: 'Course analytics not found',
};
