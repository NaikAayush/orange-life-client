import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordRenderTimelineItemComponent } from './record-render-timeline-item.component';

describe('RecordRenderTimelineItemComponent', () => {
  let component: RecordRenderTimelineItemComponent;
  let fixture: ComponentFixture<RecordRenderTimelineItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecordRenderTimelineItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordRenderTimelineItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
