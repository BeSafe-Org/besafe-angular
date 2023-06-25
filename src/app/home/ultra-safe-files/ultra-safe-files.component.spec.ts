import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UltraSafeFilesComponent } from './ultra-safe-files.component';

describe('UltraSafeFilesComponent', () => {
  let component: UltraSafeFilesComponent;
  let fixture: ComponentFixture<UltraSafeFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UltraSafeFilesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UltraSafeFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
