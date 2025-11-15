import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IdentityDataAccess } from './identity-data-access';

describe('IdentityDataAccess', () => {
  let component: IdentityDataAccess;
  let fixture: ComponentFixture<IdentityDataAccess>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdentityDataAccess],
    }).compileComponents();

    fixture = TestBed.createComponent(IdentityDataAccess);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
