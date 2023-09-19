import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { ItemsService } from 'src/app/services/items.service';
import { Pagination } from 'src/app/shared/Pagination.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent {

  constructor(private itemsService: ItemsService) { }

  displayedColumns: string[] = ['name', 'description', 'labelName', 'price', 'releaseDate', 'format', 'availableStock', 'delete'];
  public dataSource!: any;
  public totalAmountOfRecords!: number;
  public currentPage = 1;
  public pagination!: Pagination;
  public pageSize = 5;
  destroy$ = new Subject<void>();


  ngOnInit() {
    this.populateItems();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public populateItems() {
    this.itemsService.getAll('', this.currentPage, this.pageSize)
      .pipe(takeUntil(this.destroy$))
      .subscribe(response => {
        this.dataSource = new MatTableDataSource(response.body);
        this.pagination = JSON.parse(response.headers?.get("x-pagination") || '{}');
        this.totalAmountOfRecords = this.pagination.totalCount
      });
  }

  updatePagination(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.populateItems();
  }

  public deleteItem(guid: string) {
    Swal.fire({
      title: 'Do you want to delete this item?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.itemsService.deleteItem(guid).subscribe(() => {
          Swal.fire('Item Eliminated!', '', 'success')
        });
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
