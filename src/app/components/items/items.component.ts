import { Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { userCredentials } from 'src/app/models/auth/user-credentials';
import { Item } from 'src/app/models/item';
import { ItemsService } from 'src/app/services/items.service';
import { Pagination } from 'src/app/shared/Pagination.model';
import { AuthService } from 'src/app/shared/auth.service';
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


  ngOnInit() {
    this.populateItems();
  }

  public populateItems() {
    console.log(this.pageSize);
    this.itemsService.getAll('', this.currentPage, this.pageSize).subscribe(response => {
      this.dataSource = new MatTableDataSource(response.body);
      this.pagination = JSON.parse(response.headers.get("x-pagination") || '{}');
      this.totalAmountOfRecords = this.pagination.totalCount
    });
  }

  updatePagination(event: PageEvent) {
    console.log(event);
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