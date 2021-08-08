import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordRenderComponent } from './record-render.component';

describe('RecordRenderComponent', () => {
  let component: RecordRenderComponent;
  let fixture: ComponentFixture<RecordRenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecordRenderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordRenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
