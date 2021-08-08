import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordRenderUserComponent } from './record-render-user.component';

describe('RecordRenderUserComponent', () => {
  let component: RecordRenderUserComponent;
  let fixture: ComponentFixture<RecordRenderUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecordRenderUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordRenderUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
