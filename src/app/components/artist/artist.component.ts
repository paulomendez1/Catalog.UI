import { Component, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { ArtistService } from 'src/app/services/artist.service';
import { Pagination } from 'src/app/shared/Pagination.model';
import { parseWebAPIErrors } from 'src/app/shared/utilities';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss']
})
export class ArtistComponent {

  public totalAmountOfRecords!: number;
  public currentPage = 1;
  public pagination!: Pagination;
  public pageSize = 5;
  destroy$ = new Subject<void>();
  public errors: string[] = [];
  public isLoading = true;
  displayedColumns: string[] = ['artistName'];
  public dataSource: any;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  constructor(private artistService: ArtistService) { }

  ngOnInit() {
    this.populateArtists();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public populateArtists() {
    var sortColumn = (this.sort) ? this.sort.active : 'artistName';
    var sortOrder = (this.sort) ? this.sort.direction : 'asc';
    this.artistService.getAll('', this.currentPage, this.pageSize, sortColumn, sortOrder)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.isLoading = false;
          this.dataSource = new MatTableDataSource(response.body);
          this.pagination = JSON.parse(response.headers?.get("x-pagination") || '{}');
          this.totalAmountOfRecords = this.pagination.totalCount
        },
        error: () => {
          this.isLoading = false;
        }
      })
  }

  updatePagination(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.populateArtists();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


}
