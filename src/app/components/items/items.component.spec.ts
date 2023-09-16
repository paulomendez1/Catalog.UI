import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { ItemsComponent } from './items.component';
import { ItemsService } from 'src/app/services/items.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { By } from '@angular/platform-browser';


describe('ItemsComponent', () => {
  let component: ItemsComponent;
  let fixture: ComponentFixture<ItemsComponent>;
  let itemServiceSpy: jasmine.SpyObj<ItemsService>;


  const itemMock: any =
  {
    body: [{
      name: 'some name',
      description: 'some description',
      price: {
        amount: 1
      }
    }]
  }

  beforeEach(async(() => {
    const ItemServiceSpy = jasmine.createSpyObj('ItemService', ['getAll', 'deleteItem']);
    TestBed.configureTestingModule({
      declarations: [ItemsComponent],
      imports: [
        SharedModule,
        BrowserAnimationsModule,
        RouterTestingModule,
        HttpClientModule
      ],
      providers: [
        { provide: ItemsService, useValue: ItemServiceSpy }
      ]
    }).compileComponents();
  }))

  beforeEach(() => {
    itemServiceSpy = TestBed.get(ItemsService);
    itemServiceSpy.getAll.and.returnValue(of(itemMock));
    itemServiceSpy.deleteItem.and.returnValue(of(true));
    fixture = TestBed.createComponent(ItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call delete from itemService when delete method is called', async () => {

    spyOn(Swal, 'fire').and.returnValue(
      Promise.resolve({
        isConfirmed: true,
        isDenied: false,
        isDismissed: false,
      } as SweetAlertResult<any>)
    );

    component.deleteItem('1');

    await fixture.whenStable();

    expect(itemServiceSpy.deleteItem).toHaveBeenCalled();
  });

  it('should populate items when component inits', async () => {
    component.ngOnInit();
    await fixture.whenStable();

    expect(component.dataSource?.filteredData?.length).toBeGreaterThan(0);
  });

  it('should call delete method when the trash icon is clicked', () => {

    const deleteItemSpy = spyOn(component, 'deleteItem')
    const cancelBtn = fixture.debugElement.query(By.css('#delete-btn'));
    cancelBtn.triggerEventHandler('click', null);

    fixture.detectChanges();

    expect(deleteItemSpy).toHaveBeenCalled();
  });
});
