import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { type HydratedDocument } from 'mongoose';

export type CourseAnalyticsDocument = HydratedDocument<Cart>;

@Schema({ timestamps: true })
export class Cart {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  user: string;

  @Prop({
    type: [
      {
        course: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Course',
          required: true,
        },
        priceAtAddition: {
          type: Number,
          required: true,
        },
        addedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    default: [],
    validate: {
      validator: (items: any[]) => items.length <= 50,
      message: 'Cart cannot contain more than 50 items',
    },
  })
  items: Array<{
    course: string;
    addedAt: Date;
    priceAtAddition: number;
  }>;

  getTotalPrice() {
    return this.items.reduce(
      (acc, item) => acc + item.priceAtAddition,
      0,
    );
  }
  get itemCount(): number {
    return this.items.length;
  }
}

export const CartSchema = SchemaFactory.createForClass(Cart);
