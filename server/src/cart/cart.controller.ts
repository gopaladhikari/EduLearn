import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { JwtGuard } from 'src/modules/auth/guards/jwt-auth.guard';

@Controller('cart')
@UseGuards(JwtGuard)
export class CartController {
  constructor(private readonly cartService: CartService) {}
}
