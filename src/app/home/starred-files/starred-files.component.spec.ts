import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarredFilesComponent } from './starred-files.component';

describe('StarredFilesComponent', () => {
  let component: StarredFilesComponent;
  let fixture: ComponentFixture<StarredFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StarredFilesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StarredFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
