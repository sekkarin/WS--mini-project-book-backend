import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Book } from './interfaces/book.interface';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@ApiTags('Books')
@ApiBearerAuth()
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @Roles(Role.Admin, Role.User)
  @ApiTags("AdminRoles")
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Create a new book' })
  @ApiResponse({ status: 201, description: 'The newly created book' })
  async create(@Body() createBookDto: CreateBookDto): Promise<Book> {
    // Call the create method in the BookService to create the book
    const newBook = await this.booksService.create(createBookDto);

    return newBook;
  }

  @Get()
  @Roles(Role.Admin, Role.User)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiTags("AdminRoles","UserRoles")
  @ApiOperation({ summary: 'Get all books' })
  @ApiResponse({ status: 200, description: 'The list of books' })
  async findAll(): Promise<Book[]> {
    // Call the findAll method in the BookService to retrieve all books
    const books = await this.booksService.findAll();

    return books;
  }

  @Get(':id')
  @Roles(Role.Admin, Role.User)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiTags("AdminRoles","UserRoles")
  @ApiOperation({ summary: 'Get a book by ID' })
  @ApiParam({ name: 'id', description: 'Book ID' })
  @ApiResponse({ status: 200, description: 'The requested book' })
  @ApiResponse({ status: 404, description: 'Book not found' })
  async findOne(@Param('id') id: string): Promise<Book> {
    // Call the findOne method in the BookService to retrieve a specific book by ID
    const book = await this.booksService.findOne(id);

    return book;
  }

  @Patch(':id')
  @Roles(Role.Admin, Role.User)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiTags("AdminRoles")
  @ApiOperation({ summary: 'Update a book by ID' })
  @ApiParam({ name: 'id', description: 'Book ID' })
  @ApiResponse({ status: 200, description: 'The updated book' })
  @ApiResponse({ status: 404, description: 'Book not found' })
  async update(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
  ): Promise<Book> {
    try {
      // Call the update method in the BookService to update the book by ID
      const updatedBook = await this.booksService.update(id, updateBookDto);

      if (!updatedBook) {
        throw new NotFoundException(`Book with ID #${id} not found`);
      }

      return updatedBook;
    } catch (error) {
      // Handle the error, e.g., log or throw a custom exception
      throw new Error(`Could not update the book with ID #${id}`);
    }
  }

  @Delete(':id')
  @Roles(Role.Admin, Role.User)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiTags("AdminRoles")
  @ApiOperation({ summary: 'Remove a book by ID' })
  @ApiParam({ name: 'id', description: 'Book ID' })
  @ApiResponse({ status: 200, description: 'The removed book' })
  @ApiResponse({ status: 404, description: 'Book not found' })
  async remove(@Param('id') id: string): Promise<Book> {
    try {
      // Call the remove method in the BookService to delete the book by ID
      const removedBook = await this.booksService.remove(id);

      if (!removedBook) {
        throw new NotFoundException(`Book with ID #${id} not found`);
      }

      return removedBook;
    } catch (error) {
      // Handle the error, e.g., log or throw a custom exception
      throw new Error(`Could not remove the book with ID #${id}`);
    }
  }
}
