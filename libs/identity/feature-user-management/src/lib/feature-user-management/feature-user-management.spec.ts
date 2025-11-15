import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeatureUserManagement } from './feature-user-management';

describe('FeatureUserManagement', () => {
  let component: FeatureUserManagement;
  let fixture: ComponentFixture<FeatureUserManagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureUserManagement],
    }).compileComponents();

    fixture = TestBed.createComponent(FeatureUserManagement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
