import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsMongoId } from 'class-validator';

export class DeleteCourseInBulkDto {
  @ApiProperty({
    example: ['65f8d7e4c4b5d12a5c3e4f5a'],
    description: 'MongoDB ObjectID of the course',
  })
  @IsMongoId({ each: true, message: 'Invalid coursed id' })
  @IsArray()
  ids: string[];
}
