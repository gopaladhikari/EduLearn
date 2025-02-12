import {
  Body,
  Controller,
  Post,
  Param,
  Delete,
  UseGuards,
  BadRequestException,
  Get,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { JwtGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { isValidObjectId } from 'mongoose';
import { CurrentUser } from '../auth/current-user.decorator';
import type { UserDocument } from '../users/entities/user.entity';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiSecurity,
} from '@nestjs/swagger';
import { AddToCartDto } from './dto/add-to-cart.dto';

@ApiTags('Cart')
@ApiBearerAuth()
@ApiSecurity('x-api-key')
@Controller('cart')
@UseGuards(JwtGuard)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  @ApiOperation({
    summary: 'Get Cart',
    description:
      "Retrieves the current user's cart, including items, total price, and item count.",
  })
  @ApiResponse({
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
  })
  getCart(@CurrentUser() user: UserDocument) {
    return this.cartService.getCart(user);
  }

  // course id
  @Post(':id')
  @ApiOperation({
    summary: 'Add to Cart',
    description:
      "Adds a course to the current user's cart along with the price at the time of addition.",
  })
  @ApiParam({
    name: 'id',
    description: 'Course ID to add to the cart',
    example: '60d21b4667d0d8992e610c85',
  })
  @ApiBody({
    description: 'Price of the course at time of addition',
    type: AddToCartDto,
  })
  @ApiResponse({
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
  })
  addToCart(
    @Param('id') id: string,
    @CurrentUser() user: UserDocument,
    @Body('price') price: number,
  ) {
    if (!isValidObjectId(id))
      throw new BadRequestException('Invalid Object Id');

    return this.cartService.addToCart(id, user, price);
  }

  @Delete(':courseId')
  @ApiOperation({
    summary: 'Delete Cart Item',
    description: "Removes a specific course from the user's cart.",
  })
  @ApiParam({
    name: 'courseId',
    description: 'ID of the course to remove from the cart',
    example: '60d21b4667d0d8992e610c85',
  })
  @ApiResponse({
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
  })
  deleteItem(
    @Param('courseId') courseId: string,
    @CurrentUser() user: UserDocument,
  ) {
    if (!isValidObjectId(courseId))
      throw new BadRequestException('Invalid Object Id');

    return this.cartService.deleteItem(courseId, user._id);
  }

  @Delete('empty')
  @ApiOperation({
    summary: 'Empty Cart',
    description: "Removes all items from the current user's cart.",
  })
  @ApiResponse({
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
  })
  emptyCart(@CurrentUser() user: UserDocument) {
    return this.cartService.emptyCart(user._id);
  }
}
