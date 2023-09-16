import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { AddGenreFormComponent } from './add-genre-form.component';
import { GenreService } from 'src/app/services/genre.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { By } from '@angular/platform-browser';
import Swal, { SweetAlertResult } from 'sweetalert2';

describe('AddGenreFormComponent', () => {
  let component: AddGenreFormComponent;
  let fixture: ComponentFixture<AddGenreFormComponent>;
  let genreServiceSpy: jasmine.SpyObj<GenreService>;

  beforeEach(async(() => {
    const GenreServiceSpy = jasmine.createSpyObj('GenreService', ['createItem']);
    TestBed.configureTestingModule({
      declarations: [AddGenreFormComponent],
      imports: [
        SharedModule,
        BrowserAnimationsModule,
        RouterTestingModule
      ],
      providers: [
        { provide: GenreService, useValue: GenreServiceSpy }
      ]
    }).compileComponents();
  }))

  beforeEach(() => {
    genreServiceSpy = TestBed.get(GenreService);
    genreServiceSpy.createItem.and.returnValue(of(true));
    fixture = TestBed.createComponent(AddGenreFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should enable save button when form is valid', () => {
    const formGroup: FormGroup = fixture.componentInstance.genreForm;
    formGroup.get('genreDescription')?.setValue('some value');

    fixture.detectChanges();

    const saveBtn = fixture.debugElement.query(By.css('#save-btn'));
    const isDisabled = saveBtn.nativeElement.hasAttribute('disabled');

    expect(isDisabled).toBe(false);
  });

  it('should disable save button when form is valid', () => {
    const formGroup: FormGroup = fixture.componentInstance.genreForm;
    formGroup.setErrors({ invalid: true });

    fixture.detectChanges();

    const saveBtn = fixture.debugElement.query(By.css('#save-btn'));
    const isDisabled = saveBtn.nativeElement.hasAttribute('disabled');

    expect(isDisabled).toBe(true);
  });


  it('should call create from genreService when save method is called', async () => {

    spyOn(Swal, 'fire').and.returnValue(
      Promise.resolve({
        isConfirmed: true,
        isDenied: false,
        isDismissed: false,
      } as SweetAlertResult<any>)
    );

    component.saveGenre();

    await fixture.whenStable();

    expect(genreServiceSpy.createItem).toHaveBeenCalled();
  });
});
