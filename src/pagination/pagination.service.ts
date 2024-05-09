import { Injectable } from '@nestjs/common';
import { Pagination } from './entities/pagination.entity';

@Injectable()
export class PaginationService {
  getPagination(pagination: Pagination) {
    const defaultTake = 10;
    const defaultCurrentPage = 1;
    const currentPage = pagination.currentPage ?? defaultCurrentPage;
    const take = pagination.take ?? defaultTake;
    const skip = (currentPage - 1) * take;

    return { currentPage, skip };
  }
}
