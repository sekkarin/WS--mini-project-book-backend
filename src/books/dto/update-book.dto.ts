import { IsString, IsNumber, IsOptional, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateBookDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'The author of the book',
    example: 'Updated Author Name',
    required: false,
  })
  readonly author?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'The ISBN of the book',
    example: '978-9876543210',
    required: false,
  })
  readonly ISBN?: string;

  @IsOptional()
  @IsUrl()
  @ApiProperty({
    description: 'The URL to the book profile image',
    example: 'https://updated-example.com/book.jpg',
    required: false,
  })
  readonly profileUrl?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'The title of the book',
    example: 'Updated Book Title',
    required: false,
  })
  readonly title?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'The description of the book',
    example: 'This is an updated book description.',
    required: false,
  })
  readonly description?: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    description: 'The price of the book',
    example: 24.99,
    required: false,
  })
  readonly price?: number;
}
