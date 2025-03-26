import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NinjaCatComponent } from './ninja-cat.component';

describe('NinjaCatComponent', () => {
  let component: NinjaCatComponent;
  let fixture: ComponentFixture<NinjaCatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NinjaCatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NinjaCatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
