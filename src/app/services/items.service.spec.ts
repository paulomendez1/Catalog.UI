import { TestBed, async } from '@angular/core/testing';

import { ItemsService } from './items.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Item, Price } from '../models/item';

describe('ItemsService', () => {
  let service: ItemsService;
  let httpMock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ],
      providers: [
        ItemsService
      ]
    }).compileComponents();
  }))

  beforeEach(() => {
    service = TestBed.inject(ItemsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve data from the API with correct parameters', () => {
    const pageSize = 10;
    const pageNumber = 1;
    const artists: Item[] = [];

    service.getAll('', pageNumber, pageSize).subscribe((response) => {
      // You can add your assertions here to check the response or other conditions.
    });

    const request = httpMock.expectOne(`${service.apiURL}?PageNumber=${pageNumber}&PageSize=${pageSize}`);
    expect(request.request.method).toBe('GET');

    // Simulate a successful response (adjust as needed for your use case).
    request.flush({ body: { artists: artists } });

    httpMock.verify();
  });

  it('should create an item and return a boolean', () => {
    const item: Item = {
      name: 'some-name',
      description: 'some_desc',
      artistId: '',
      genreId: '',
      labelName: '',
      format: '',
      releaseDate: new Date(),
      availableStock: 1,
      id: '',
      price: {
        amount: 1,
        currency: ''
      } as Price,
      pictureUri: ''
    }

    service.createItem(item).subscribe((response) => {
      // You can add your assertions here to check the response or other conditions.
    });

    const request = httpMock.expectOne(service.apiURL);
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual(item);

    // Simulate a successful response (adjust as needed for your use case).
    request.flush({ body: true });

    httpMock.verify();
  });
});
