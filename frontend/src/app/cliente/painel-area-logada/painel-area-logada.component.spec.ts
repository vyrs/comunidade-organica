import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PainelAreaLogadaComponent } from './painel-area-logada.component';

describe('PainelAreaLogadaComponent', () => {
  let component: PainelAreaLogadaComponent;
  let fixture: ComponentFixture<PainelAreaLogadaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PainelAreaLogadaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PainelAreaLogadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
