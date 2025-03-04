import {
  ApiOperationOptions,
  ApiResponseOptions,
  ApiParamOptions,
  ApiBodyOptions,
} from '@nestjs/swagger';
import { AddToCartDto } from 'src/modules/cart/dto/add-to-cart.dto';

export const CartSwagger = {
  getCart: {
    operation: {
      summary: 'Get Cart',
      description:
        "Retrieves the current user's cart, including items, total price, and item count.",
    } as ApiOperationOptions,
    okResponse: {
      status: 200,
      description: 'Cart retrieved successfully.',
      schema: {
        example: {
          status: true,
          path: '/cart',
          statusCode: 200,
          message: 'Cart retrieved successfully',
          data: {
            user: '60d0fe4f5311236168a109ca',
            items: [
              {
                course: '60d21b4667d0d8992e610c85',
                priceAtAddition: 99.99,
                addedAt: '2021-07-01T00:00:00.000Z',
              },
            ],
            totalPrice: 99.99,
            itemCount: 1,
          },
        },
      },
    } as ApiResponseOptions,
  },
  addToCart: {
    operation: {
      summary: 'Add to Cart',
      description:
        "Adds a course to the current user's cart along with the price at the time of addition.",
    } as ApiOperationOptions,
    paramId: {
      name: 'id',
      description: 'Course ID to add to the cart',
      example: '60d21b4667d0d8992e610c85',
    } as ApiParamOptions,
    body: {
      description: 'Price of the course at time of addition',
      type: AddToCartDto,
    } as ApiBodyOptions,
    okResponse: {
      status: 200,
      description: 'Course added to cart successfully.',
      schema: {
        example: {
          status: true,
          path: '/cart/60d21b4667d0d8992e610c85',
          statusCode: 200,
          message: 'Course added to cart successfully',
          data: {
            course: '60d21b4667d0d8992e610c85',
            priceAtAddition: 99.99,
            addedAt: '2021-07-01T00:00:00.000Z',
          },
        },
      },
    } as ApiResponseOptions,
  },
  deleteItem: {
    operation: {
      summary: 'Delete Cart Item',
      description: "Removes a specific course from the user's cart.",
    } as ApiOperationOptions,
    paramCourseId: {
      name: 'courseId',
      description: 'ID of the course to remove from the cart',
      example: '60d21b4667d0d8992e610c85',
    } as ApiParamOptions,
    okResponse: {
      status: 200,
      description: 'Item removed from cart successfully.',
      schema: {
        example: {
          status: true,
          path: '/cart/60d21b4667d0d8992e610c85',
          statusCode: 200,
          message: 'Item removed from cart successfully',
          data: null,
        },
      },
    } as ApiResponseOptions,
  },
  emptyCart: {
    operation: {
      summary: 'Empty Cart',
      description: "Removes all items from the current user's cart.",
    } as ApiOperationOptions,
    okResponse: {
      status: 200,
      description: 'Cart emptied successfully.',
      schema: {
        example: {
          status: true,
          path: '/cart/empty',
          statusCode: 200,
          message: 'Cart emptied successfully',
          data: null,
        },
      },
    } as ApiResponseOptions,
  },
} as const;
