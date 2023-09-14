import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Genre } from 'src/app/models/genre';
import { GenreService } from 'src/app/services/genre.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-genre-form',
  templateUrl: './add-genre-form.component.html',
  styleUrls: ['./add-genre-form.component.scss']
})
export class AddGenreFormComponent {

  public genreForm!: FormGroup;
  public genre!: Genre;

  constructor(private formBuilder: FormBuilder, private genreService: GenreService) { }

  ngOnInit() {
    this.initializeForms();
  }

  private initializeForms() {
    this.genreForm = this.formBuilder.group({
      genreDescription: ['', {
        validators: [Validators.required]
      }]
    });
  }

  public saveGenre() {
    Swal.fire({
      title: 'Do you want to save this genre?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, save it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.genre = { ...this.genre, ...this.genreForm.value };
        this.genreService.createItem(this.genre).subscribe(() => {
          Swal.fire('Genre Created!', '', 'success')
        });
      }
    })
  }
}
