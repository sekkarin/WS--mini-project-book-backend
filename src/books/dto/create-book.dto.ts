import { IsString, IsNumber, IsOptional, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
  @IsString()
  @ApiProperty({
    description: 'The name of the book',
    example: 'Example Book Name',
  })
  readonly name: string;

  @IsString()
  @ApiProperty({
    description: 'The author of the book',
    example: 'Example Author Name',
  })
  readonly author: string;

  @IsString()
  @ApiProperty({
    description: 'The ISBN of the book',
    example: '978-1234567890',
  })
  readonly ISBN: string;

  @IsOptional() // This field is optional
  @IsUrl()
  @ApiProperty({
    description: 'The URL to the book profile image',
    example: 'https://example.com/book.jpg',
    required: false,
  })
  readonly profileUrl: string;

  @IsString()
  @ApiProperty({
    description: 'The title of the book',
    example: 'Example Book Title',
  })
  readonly title: string;

  @IsString()
  @ApiProperty({
    description: 'The description of the book',
    example: 'This is an example book description.',
  })
  readonly description: string;

  @IsNumber()
  @ApiProperty({
    description: 'The price of the book',
    example: 19.99,
  })
  readonly price: number;
}
