import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { GenreComponent } from './genre.component';
import { GenreService } from 'src/app/services/genre.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';

describe('GenreComponent', () => {
  let component: GenreComponent;
  let fixture: ComponentFixture<GenreComponent>;
  let genreServiceSpy: jasmine.SpyObj<GenreService>;


  const genreMock: any =
  {
    body: [{
      genreId: '1',
      genreRescription: 'some description',
    }]
  }

  beforeEach(async(() => {
    const GenreServiceSpy = jasmine.createSpyObj('GenreService', ['getAll', 'deleteItem']);
    TestBed.configureTestingModule({
      declarations: [GenreComponent],
      imports: [
        SharedModule,
        BrowserAnimationsModule,
        RouterTestingModule,
        HttpClientModule
      ],
      providers: [
        { provide: GenreService, useValue: GenreServiceSpy }
      ]
    }).compileComponents();
  }))

  beforeEach(() => {
    genreServiceSpy = TestBed.get(GenreService);
    genreServiceSpy.getAll.and.returnValue(of(genreMock));
    fixture = TestBed.createComponent(GenreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should populate genres when component inits', async () => {
    component.ngOnInit();
    await fixture.whenStable();

    expect(component.dataSource?.filteredData?.length).toBeGreaterThan(0);
  });
});
