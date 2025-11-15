import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataAccessNotifications } from './data-access-notifications';

describe('DataAccessNotifications', () => {
  let component: DataAccessNotifications;
  let fixture: ComponentFixture<DataAccessNotifications>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataAccessNotifications],
    }).compileComponents();

    fixture = TestBed.createComponent(DataAccessNotifications);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
