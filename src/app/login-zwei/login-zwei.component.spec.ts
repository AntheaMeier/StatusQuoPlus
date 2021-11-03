import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginZweiComponent } from './login-zwei.component';

describe('LoginZweiComponent', () => {
  let component: LoginZweiComponent;
  let fixture: ComponentFixture<LoginZweiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginZweiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginZweiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
