import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CategoryselectopopoverwidePage } from './categoryselectopopoverwide.page';

describe('CategoryselectopopoverwidePage', () => {
  let component: CategoryselectopopoverwidePage;
  let fixture: ComponentFixture<CategoryselectopopoverwidePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryselectopopoverwidePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryselectopopoverwidePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
