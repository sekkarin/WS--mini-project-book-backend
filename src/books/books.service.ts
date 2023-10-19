import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Model } from 'mongoose';
import { Book } from './interfaces/book.interface';

@Injectable()
export class BooksService {
  constructor(
    @Inject('BOOK_MODEL')
    private bookModel: Model<Book>,
  ) {}

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const newBook = new this.bookModel(createBookDto);

    try {
      const savedBook = await newBook.save();
      return savedBook;
    } catch (error) {
      throw new Error('Could not create the book.');
    }
  }
  async findAll(): Promise<Book[]> {
    try {
      const books = await this.bookModel.find().exec();
      return books;
    } catch (error) {
      throw new Error('Could not fetch the books.');
    }
  }
  async findOne(id: string): Promise<Book> {
    try {
      const existingBook = await this.bookModel.findById(id).exec();

      if (!existingBook) {
        throw new NotFoundException(`Book with ID #${id} not found`);
      }

      return existingBook;
    } catch (error) {
      // Handle the error, e.g., log or throw a custom exception
      throw new Error(`Could not fetch the book with ID #${id}`);
    }
  }
  async update(id: string, updateBookDto: UpdateBookDto): Promise<Book> {
    try {
      const existingBook = await this.bookModel.findById(id).exec();

      if (!existingBook) {
        throw new NotFoundException(`Book with ID #${id} not found`);
      }

      existingBook.set(updateBookDto);

      const updatedBook = await existingBook.save();

      return updatedBook;
    } catch (error) {
      // Handle the error, e.g., log or throw a custom exception
      throw new Error(`Could not update the book with ID #${id}`);
    }
  }
  async remove(id: string): Promise<Book> {
    try {
      const removedBook = await this.bookModel.findByIdAndDelete(id).exec();

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
