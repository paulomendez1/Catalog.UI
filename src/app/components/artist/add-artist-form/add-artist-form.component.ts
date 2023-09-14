import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Artist } from 'src/app/models/artist';
import { ArtistService } from 'src/app/services/artist.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-artist-form',
  templateUrl: './add-artist-form.component.html',
  styleUrls: ['./add-artist-form.component.scss']
})
export class AddArtistFormComponent {

  public artistForm!: FormGroup;
  public artist!: Artist;

  constructor(private formBuilder: FormBuilder, private artistService: ArtistService) { }

  ngOnInit() {
    this.initializeForms();
  }

  private initializeForms() {
    this.artistForm = this.formBuilder.group({
      artistName: ['', {
        validators: [Validators.required]
      }]
    });
  }

  public saveArtist() {
    Swal.fire({
      title: 'Do you want to save this artist?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, save it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.artist = { ...this.artist, ...this.artistForm.value };
        this.artistService.createItem(this.artist).subscribe(() => {
          Swal.fire('Artist Created!', '', 'success')
        });
      }
    })
  }
}
