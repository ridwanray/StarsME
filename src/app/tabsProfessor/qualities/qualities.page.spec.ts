import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QualitiesPage } from './qualities.page';

describe('QualitiesPage', () => {
  let component: QualitiesPage;
  let fixture: ComponentFixture<QualitiesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QualitiesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QualitiesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
