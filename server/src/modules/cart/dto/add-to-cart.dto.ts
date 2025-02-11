import { ApiProperty } from '@nestjs/swagger';

export class AddToCartDto {
  @ApiProperty({
    example: 99.99,
    description:
      'Price of the course at the time of addition to the cart',
  })
  price: number;
}
