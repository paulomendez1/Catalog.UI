import { TestBed, async } from '@angular/core/testing';

import { ArtistService } from './artist.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Artist } from '../models/artist';

describe('ArtistService', () => {
  let service: ArtistService;
  let httpMock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ],
      providers: [
        ArtistService
      ]
    }).compileComponents();
  }))

  beforeEach(() => {
    service = TestBed.inject(ArtistService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve data from the API with correct parameters', () => {
    const pageSize = 10;
    const pageIndex = 1;
    const artists: Artist[] = [];

    service.getAll(pageSize, pageIndex).subscribe((response) => {
      // You can add your assertions here to check the response or other conditions.
    });

    const request = httpMock.expectOne(`${service.apiURL}`);
    expect(request.request.method).toBe('GET');

    // Simulate a successful response (adjust as needed for your use case).
    request.flush({ body: { artists: artists } });

    httpMock.verify();
  });

  it('should create an artist and return a boolean', () => {
    const artist: Artist = {
      artistId: '1',
      artistName: 'some_name'
    }

    service.createItem(artist).subscribe((response) => {
      // You can add your assertions here to check the response or other conditions.
    });

    const request = httpMock.expectOne(service.apiURL);
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual(artist);

    // Simulate a successful response (adjust as needed for your use case).
    request.flush({ body: true });

    httpMock.verify();
  });
});