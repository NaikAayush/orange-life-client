import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateSidebarItemComponent } from './private-sidebar-item.component';

describe('PrivateSidebarItemComponent', () => {
  let component: PrivateSidebarItemComponent;
  let fixture: ComponentFixture<PrivateSidebarItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateSidebarItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateSidebarItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
