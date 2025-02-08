import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import type { UserDocument } from '../users/entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Cart } from './entities/cart.entity';
import type { Model, Types } from 'mongoose';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name) private readonly Cart: Model<Cart>,
  ) {}

  async getCart(user: UserDocument) {
    try {
      const cart = await this.Cart.findOne({
        userId: user._id,
      })
        .populate({
          path: 'items.courseId',
          select: 'title instructor price thumbnail',
          populate: {
            path: 'instructor',
            select: 'fullName email',
          },
        })
        .lean();

      if (!cart) throw new NotFoundException('Cart not found');

      let totalPrice = 0;
      let totalItems = 0;

      cart.items?.forEach((item) => {
        totalPrice += item.priceAtAddition;
        totalItems += 1;
      });

      return {
        message: 'Cart fetched successfully',
        data: {
          ...cart,
          totalPrice,
          totalItems,
        },
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async addToCart(
    id: string,
    user: UserDocument,
    priceAtAddition: number,
  ) {
    try {
      const existingCart = await this.Cart.findOne({
        userId: user._id,
      });

      if (existingCart) {
        const existingItem = existingCart.items.find(
          (item) => item.course.toString() === id,
        );

        if (existingItem)
          throw new BadRequestException('Item already added');

        existingCart.items.push({
          course: id,
          addedAt: new Date(),
          priceAtAddition,
        });
        await existingCart.save();

        return {
          message: 'Item added successfully',
          data: existingCart,
        };
      }

      const createdCart = await this.Cart.create(
        {
          userId: user._id,
          items: [
            {
              course: id,
              addedAt: new Date(),
              priceAtAddition,
            },
          ],
        },
        { new: true },
      );

      return {
        message: 'Item added successfully',
        data: createdCart,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async deleteItem(courseId: string, userId: Types.ObjectId) {
    try {
      const deletedItem = await this.Cart.findOneAndUpdate(
        { userId },
        {
          $pull: {
            items: {
              courseId,
            },
          },
        },
        { new: true },
      );

      return {
        message: 'Item deleted successfully',
        data: deletedItem,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async emptyCart(userId: Types.ObjectId) {
    try {
      const deletedCart = await this.Cart.findOneAndDelete({
        userId,
      });
      return {
        message: 'Cart deleted successfully',
        data: deletedCart,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
