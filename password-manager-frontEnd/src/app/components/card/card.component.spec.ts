import { CardComponent } from './card.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(CardComponent);
      component = fixture.componentInstance;
      component.site = {
        'id': '1',
        'name': 'Spotify',
        'username': 'johndoe@gmail.com',
        'logo': 'https://logodownload.org/wp-content/uploads/2016/09/Spotify-logo.png',
        'hasImage': true,
        'password': 'password',
        'url': 'https://www.spotify.com'
      }
      fixture.detectChanges();
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
