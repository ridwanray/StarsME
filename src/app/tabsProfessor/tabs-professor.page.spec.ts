import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsProfessorPage } from './tabs-professor.page';

describe('TabsPage', () => {
  let component: TabsProfessorPage;
  let fixture: ComponentFixture<TabsProfessorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TabsProfessorPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsProfessorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
