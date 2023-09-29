import { Component, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { GenreService } from 'src/app/services/genre.service';
import { Pagination } from 'src/app/shared/Pagination.model';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.scss']
})
export class GenreComponent {

  public totalAmountOfRecords!: number;
  public currentPage = 1;
  public pagination!: Pagination;
  public pageSize = 5;
  destroy$ = new Subject<void>();
  public isLoading = true;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  displayedColumns: string[] = ['genreDescription'];
  public dataSource: any;

  constructor(private genreService: GenreService) { }

  ngOnInit() {
    this.populateGenres();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public populateGenres() {
    var sortColumn = (this.sort) ? this.sort.active : 'genreDescription';
    var sortOrder = (this.sort) ? this.sort.direction : 'desc';
    this.genreService.getAll('', this.currentPage, this.pageSize, sortColumn, sortOrder)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.isLoading = false;
          this.dataSource = new MatTableDataSource(response.body);
          this.pagination = JSON.parse(response.headers?.get("x-pagination") || '{}');
          this.totalAmountOfRecords = this.pagination.totalCount
        },
        error: () => [
          this.isLoading = false
        ]
      })
  }

  updatePagination(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.populateGenres();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


}
