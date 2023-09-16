import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { AddItemFormComponent } from './add-item-form.component';
import { ItemsService } from 'src/app/services/items.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { By } from '@angular/platform-browser';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { HttpClientModule } from '@angular/common/http';
import { ArtistService } from 'src/app/services/artist.service';
import { GenreService } from 'src/app/services/genre.service';

describe('AddItemFormComponent', () => {
  let component: AddItemFormComponent;
  let fixture: ComponentFixture<AddItemFormComponent>;
  let itemServiceSpy: jasmine.SpyObj<ItemsService>;
  let artistServiceSpy: jasmine.SpyObj<ArtistService>;
  let genreServiceSpy: jasmine.SpyObj<GenreService>;

  const artistMock: any =
  {
    body: [{
      artistId: 'some id',
      artistName: 'some name'
    }]
  }

  const genreMock: any =
  {
    body: [{
      genreId: 'some id',
      genreDescription: 'some description'
    }]
  }


  beforeEach(async(() => {
    const ItemServiceSpy = jasmine.createSpyObj('ItemService', ['createItem']);
    const ArtistServiceSpy = jasmine.createSpyObj('ArtistService', ['getAll']);
    const GenreServiceSpy = jasmine.createSpyObj('GenreService', ['getAll']);
    TestBed.configureTestingModule({
      declarations: [AddItemFormComponent],
      imports: [
        SharedModule,
        BrowserAnimationsModule,
        RouterTestingModule,
        HttpClientModule
      ],
      providers: [
        { provide: ItemsService, useValue: ItemServiceSpy },
        { provide: ArtistService, useValue: ArtistServiceSpy },
        { provide: GenreService, useValue: GenreServiceSpy }
      ]
    }).compileComponents();
  }))

  beforeEach(() => {
    itemServiceSpy = TestBed.get(ItemsService);
    artistServiceSpy = TestBed.get(ArtistService);
    genreServiceSpy = TestBed.get(GenreService);
    itemServiceSpy.createItem.and.returnValue(of(true));
    artistServiceSpy.getAll.and.returnValue(of(artistMock));
    genreServiceSpy.getAll.and.returnValue(of(genreMock));
    fixture = TestBed.createComponent(AddItemFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should enable save button when form is valid', () => {
    const formGroup: FormGroup = fixture.componentInstance.itemForm;
    formGroup.get('name')?.setValue('some value');
    formGroup.get('description')?.setValue('some value');
    formGroup.get('labelName')?.setValue('some value');
    formGroup.get('releaseDate')?.setValue(new Date());
    formGroup.get('format')?.setValue('some value');
    formGroup.get('availableStock')?.setValue(1);
    formGroup.get('pictureUri')?.setValue('some value');
    formGroup.get('genreDescription')?.setValue('some value');
    formGroup.get('genreId')?.setValue('some value');
    formGroup.get('artistId')?.setValue('some value');

    fixture.detectChanges();

    const saveBtn = fixture.debugElement.query(By.css('#save-btn'));
    const isDisabled = saveBtn.nativeElement.hasAttribute('disabled');

    expect(isDisabled).toBe(false);
  });

  it('should disable save button when form is valid', () => {
    const formGroup: FormGroup = fixture.componentInstance.itemForm;
    formGroup.setErrors({ invalid: true });

    fixture.detectChanges();

    const saveBtn = fixture.debugElement.query(By.css('#save-btn'));
    const isDisabled = saveBtn.nativeElement.hasAttribute('disabled');

    expect(isDisabled).toBe(true);
  });

  it('should populate artists when component inits', async () => {
    component.ngOnInit();
    await fixture.whenStable();

    expect(component.artists.length).toBeGreaterThan(0);
  });

  it('should populate genres when component inits', async () => {
    component.ngOnInit();
    await fixture.whenStable();

    expect(component.genres.length).toBeGreaterThan(0);
  });


  it('should call create from itemService when save method is called', async () => {

    spyOn(Swal, 'fire').and.returnValue(
      Promise.resolve({
        isConfirmed: true,
        isDenied: false,
        isDismissed: false,
      } as SweetAlertResult<any>)
    );

    component.saveItem();

    await fixture.whenStable();

    expect(itemServiceSpy.createItem).toHaveBeenCalled();
  });
});
