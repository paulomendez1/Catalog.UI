import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
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

  constructor(private genreService: GenreService) { }

  displayedColumns: string[] = ['genreDescription'];
  public dataSource: any;

  ngOnInit() {
    this.populateGenres();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public populateGenres() {
    this.genreService.getAll()
      .pipe(takeUntil(this.destroy$))
      .subscribe(response => {
        this.dataSource = new MatTableDataSource(response.body);
        this.pagination = JSON.parse(response.headers?.get("x-pagination") || '{}');
        this.totalAmountOfRecords = this.pagination.totalCount
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
