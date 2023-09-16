import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { ArtistComponent } from './artist.component';
import { ArtistService } from 'src/app/services/artist.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';

describe('ArtistComponent', () => {
  let component: ArtistComponent;
  let fixture: ComponentFixture<ArtistComponent>;
  let artistServiceSpy: jasmine.SpyObj<ArtistService>;


  const artistMock: any =
  {
    body: [{
      artistId: 'some id',
      artistName: 'some name',
    }]
  }

  beforeEach(async(() => {
    const ArtistServiceSpy = jasmine.createSpyObj('ArtistService', ['getAll', 'deleteItem']);
    TestBed.configureTestingModule({
      declarations: [ArtistComponent],
      imports: [
        SharedModule,
        BrowserAnimationsModule,
        RouterTestingModule,
        HttpClientModule
      ],
      providers: [
        { provide: ArtistService, useValue: ArtistServiceSpy }
      ]
    }).compileComponents();
  }))

  beforeEach(() => {
    artistServiceSpy = TestBed.get(ArtistService);
    artistServiceSpy.getAll.and.returnValue(of(artistMock));
    fixture = TestBed.createComponent(ArtistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should populate artists when component inits', async () => {
    component.ngOnInit();
    await fixture.whenStable();

    expect(component.dataSource?.filteredData?.length).toBeGreaterThan(0);
  });
});

