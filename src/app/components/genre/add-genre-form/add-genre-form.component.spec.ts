import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGenreFormComponent } from './add-genre-form.component';

describe('AddGenreFormComponent', () => {
  let component: AddGenreFormComponent;
  let fixture: ComponentFixture<AddGenreFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddGenreFormComponent]
    });
    fixture = TestBed.createComponent(AddGenreFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
