import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Item, Price } from 'src/app/models/item';
import { Artist } from 'src/app/models/artist';
import { Genre } from 'src/app/models/genre';
import { ArtistService } from 'src/app/services/artist.service';
import { GenreService } from 'src/app/services/genre.service';
import Swal from 'sweetalert2';
import { ItemsService } from 'src/app/services/items.service';

@Component({
  selector: 'app-add-item-form',
  templateUrl: './add-item-form.component.html',
  styleUrls: ['./add-item-form.component.scss']
})

export class AddItemFormComponent {

  public itemForm!: FormGroup;
  public priceForm!: FormGroup;
  public selectedValue!: string;
  public selectedCar!: string;
  public artists: Artist[] = [];
  public genres: Genre[] = [];
  public item!: Item;
  public price!: Price;

  constructor(private formBuilder: FormBuilder, public dialog: MatDialog,
    private artistService: ArtistService, private genreService: GenreService,
    private itemService: ItemsService) { }

  ngOnInit() {
    this.initializeForms();
    this.populateArtists();
    this.populateGenres();
  }

  private initializeForms() {
    var dateTime = new Date()
    this.itemForm = this.formBuilder.group({
      name: ['', {
        validators: [Validators.required]
      }],
      description: ['', {
        validators: [Validators.required]
      }],
      labelName: ['', {
        validators: [Validators.required]
      }],
      releaseDate: [dateTime, {
        validators: [Validators.required]
      }],
      format: ['', {
        validators: [Validators.required]
      }],
      availableStock: ['', {
        validators: [Validators.required, Validators.pattern("^[0-9]*$")]
      }],
      pictureUri: ['', {
        validators: [Validators.required]
      }],
      genreId: [''],
      artistId: [''],
    });

    this.priceForm = this.formBuilder.group({
      amount: ['', {
        validators: [Validators.required, Validators.pattern("^[0-9]*$")]
      }],
      currency: ['', {
        validators: [Validators.required]
      }],
    });
  }

  public populateArtists() {
    this.artistService.getAll().subscribe(response => {
      this.artists = response.body;
    })
  }

  public populateGenres() {
    this.genreService.getAll().subscribe(response => {
      this.genres = response.body;
    })
  }

  public saveItem() {
    Swal.fire({
      title: 'Do you want to save this item?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, save it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.item = { ...this.item, ...this.itemForm.value };
        this.price = { ...this.price, ...this.priceForm.value };
        this.item.price = this.price;
        this.itemService.createItem(this.item).subscribe(() => {
          Swal.fire('Item Created!', '', 'success')
        });
      }
    })
  }
}
