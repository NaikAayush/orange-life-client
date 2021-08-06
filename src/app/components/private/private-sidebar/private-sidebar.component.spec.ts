import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateSidebarComponent } from './private-sidebar.component';

describe('PrivateSidebarComponent', () => {
  let component: PrivateSidebarComponent;
  let fixture: ComponentFixture<PrivateSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateSidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
