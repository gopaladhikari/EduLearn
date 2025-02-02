import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, {
  type HydratedDocument,
  type Types,
} from 'mongoose';

export type CourseAnalyticsDocument = HydratedDocument<Cart>;

@Schema({ timestamps: true })
export class Cart {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  })
  userId: Types.ObjectId;

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
    courseId: Types.ObjectId;
    priceAtAddition: number;
    addedAt: Date;
  }>;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
