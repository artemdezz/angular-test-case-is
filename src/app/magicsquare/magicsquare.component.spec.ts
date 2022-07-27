import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MagicsquareComponent } from './magicsquare.component';

describe('MagicsquareComponent', () => {
  let component: MagicsquareComponent;
  let fixture: ComponentFixture<MagicsquareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MagicsquareComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MagicsquareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
