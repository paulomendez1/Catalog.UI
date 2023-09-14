import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ArtistService } from 'src/app/services/artist.service';
import { Pagination } from 'src/app/shared/Pagination.model';

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

  constructor(private artistService: ArtistService) { }

  displayedColumns: string[] = ['artistName'];
  public dataSource: any;

  ngOnInit() {
    this.populateArtists();
  }

  public populateArtists() {
    this.artistService.getAll().subscribe(response => {
      this.dataSource = new MatTableDataSource(response.body);
      this.pagination = JSON.parse(response.headers.get("x-pagination") || '{}');
      this.totalAmountOfRecords = this.pagination.totalCount
    })
  }

  updatePagination(event: PageEvent) {
    console.log(event);
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.populateArtists();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


}