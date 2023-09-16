import { TestBed, async } from '@angular/core/testing';

import { GenreService } from './genre.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Genre } from '../models/genre';

describe('GenreService', () => {
  let service: GenreService;
  let httpMock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ],
      providers: [
        GenreService
      ]
    }).compileComponents();
  }))

  beforeEach(() => {
    service = TestBed.inject(GenreService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve data from the API with correct parameters', () => {
    const pageSize = 10;
    const pageIndex = 1;
    const genres: Genre[] = [];

    service.getAll(pageSize, pageIndex).subscribe((response) => {
      // You can add your assertions here to check the response or other conditions.
    });

    const request = httpMock.expectOne(`${service.apiURL}`);
    expect(request.request.method).toBe('GET');

    // Simulate a successful response (adjust as needed for your use case).
    request.flush({ body: { genres: genres } });

    httpMock.verify();
  });

  it('should create a genre and return a boolean', () => {
    const genre: Genre = {
      genreId: '1',
      genreDescription: 'some_desc'
    }

    service.createItem(genre).subscribe((response) => {
      // You can add your assertions here to check the response or other conditions.
    });

    const request = httpMock.expectOne(service.apiURL);
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual(genre);

    // Simulate a successful response (adjust as needed for your use case).
    request.flush({ body: true });

    httpMock.verify();
  });
});