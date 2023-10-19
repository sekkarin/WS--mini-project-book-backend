import { Connection } from 'mongoose';
import { bookSchema } from './schemas/book.schema';

export const bookProviders = [
  {
    provide: 'BOOK_MODEL',
    useFactory: (connection: Connection) => connection.model('Book', bookSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];