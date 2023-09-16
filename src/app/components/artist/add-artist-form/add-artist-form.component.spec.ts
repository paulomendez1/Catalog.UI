import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { AddArtistFormComponent } from './add-artist-form.component';
import { ArtistService } from 'src/app/services/artist.service';
import { of } from 'rxjs';
import { SharedModule } from 'src/app/shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { By } from '@angular/platform-browser';
import { FormGroup } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

describe('AddArtistFormComponent', () => {
  let component: AddArtistFormComponent;
  let fixture: ComponentFixture<AddArtistFormComponent>;
  let artistServiceSpy: jasmine.SpyObj<ArtistService>;

  beforeEach(async(() => {
    const ArtistServiceSpy = jasmine.createSpyObj('ArtistService', ['createItem']);
    TestBed.configureTestingModule({
      declarations: [AddArtistFormComponent],
      imports: [
        SharedModule,
        BrowserAnimationsModule,
        RouterTestingModule
      ],
      providers: [
        { provide: ArtistService, useValue: ArtistServiceSpy }
      ]
    }).compileComponents();
  }))

  beforeEach(() => {
    artistServiceSpy = TestBed.get(ArtistService);
    artistServiceSpy.createItem.and.returnValue(of(true));
    fixture = TestBed.createComponent(AddArtistFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should enable save button when form is valid', () => {
    const formGroup: FormGroup = fixture.componentInstance.artistForm;
    formGroup.get('artistName')?.setValue('some value');

    fixture.detectChanges();

    const saveBtn = fixture.debugElement.query(By.css('#save-btn'));
    const isDisabled = saveBtn.nativeElement.hasAttribute('disabled');

    expect(isDisabled).toBe(false);
  });

  it('should disable save button when form is valid', () => {
    const formGroup: FormGroup = fixture.componentInstance.artistForm;
    formGroup.setErrors({ invalid: true });

    fixture.detectChanges();

    const saveBtn = fixture.debugElement.query(By.css('#save-btn'));
    const isDisabled = saveBtn.nativeElement.hasAttribute('disabled');

    expect(isDisabled).toBe(true);
  });


  it('should call create from artistService when save method is called', async () => {

    spyOn(Swal, 'fire').and.returnValue(
      Promise.resolve({
        isConfirmed: true,
        isDenied: false,
        isDismissed: false,
      } as SweetAlertResult<any>)
    );

    component.saveArtist();

    await fixture.whenStable();

    expect(artistServiceSpy.createItem).toHaveBeenCalled();
  });
});
