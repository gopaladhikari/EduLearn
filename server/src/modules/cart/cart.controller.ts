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
import { CartSwagger } from 'src/config/constants/cart.swagger';

@ApiTags('Cart')
@ApiBearerAuth()
@ApiSecurity('x-api-key')
@Controller('cart')
@UseGuards(JwtGuard)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  @ApiOperation(CartSwagger.getCart.operation)
  @ApiResponse(CartSwagger.getCart.okResponse)
  getCart(@CurrentUser() user: UserDocument) {
    return this.cartService.getCart(user);
  }

  @Post(':id')
  @ApiOperation(CartSwagger.addToCart.operation)
  @ApiParam(CartSwagger.addToCart.paramId)
  @ApiBody(CartSwagger.addToCart.body)
  @ApiResponse(CartSwagger.addToCart.okResponse)
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
  @ApiOperation(CartSwagger.deleteItem.operation)
  @ApiParam(CartSwagger.deleteItem.paramCourseId)
  @ApiResponse(CartSwagger.deleteItem.okResponse)
  deleteItem(
    @Param('courseId') courseId: string,
    @CurrentUser() user: UserDocument,
  ) {
    if (!isValidObjectId(courseId))
      throw new BadRequestException('Invalid Object Id');

    return this.cartService.deleteItem(courseId, user._id);
  }

  @Delete('empty')
  @ApiOperation(CartSwagger.emptyCart.operation)
  @ApiResponse(CartSwagger.emptyCart.okResponse)
  emptyCart(@CurrentUser() user: UserDocument) {
    return this.cartService.emptyCart(user._id);
  }
}
