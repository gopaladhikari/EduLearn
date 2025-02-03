import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Cart, CartSchema } from './entities/cart.entity';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Cart.name,
        useFactory: () => {
          const schema = CartSchema;

          schema.virtual('total').get(function () {
            return this.items.reduce(
              (sum, item) => sum + item.priceAtAddition,
              0,
            );
          });

          schema.virtual('itemCount').get(function () {
            return this.items.length;
          });

          schema.index({ user: 1 }, { unique: true });
          return schema;
        },
      },
    ]),
  ],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
