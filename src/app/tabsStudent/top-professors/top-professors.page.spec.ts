import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TopProfessorsPage } from './top-professors.page';

describe('TopProfessorsPage', () => {
  let component: TopProfessorsPage;
  let fixture: ComponentFixture<TopProfessorsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopProfessorsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TopProfessorsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
