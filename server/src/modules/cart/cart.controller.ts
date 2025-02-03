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

@Controller('cart')
@UseGuards(JwtGuard)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  getCart(@CurrentUser() user: UserDocument) {
    return this.cartService.getCart(user);
  }

  // course id
  @Post(':id')
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
  deleteItem(
    @Param('courseId') courseId: string,
    @CurrentUser() user: UserDocument,
  ) {
    if (!isValidObjectId(courseId))
      throw new BadRequestException('Invalid Object Id');

    return this.cartService.deleteItem(courseId, user._id);
  }

  @Delete('empty')
  emptyCart(@CurrentUser() user: UserDocument) {
    return this.cartService.emptyCart(user._id);
  }
}
