import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperAdminPortalComponent } from './super-admin-portal.component';

describe('SuperAdminPortalComponent', () => {
  let component: SuperAdminPortalComponent;
  let fixture: ComponentFixture<SuperAdminPortalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuperAdminPortalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperAdminPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
