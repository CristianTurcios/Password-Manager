import { CardComponent } from './card.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;
  const site = {
    'id': '1',
    'name': 'Spotify',
    'username': 'johndoe@gmail.com',
    'logo': 'https://logodownload.org/wp-content/uploads/2016/09/Spotify-logo.png',
    'hasImage': true,
    'password': 'password',
    'url': 'https://www.spotify.com'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(CardComponent);
      component = fixture.componentInstance;
      component.site = site;
      fixture.detectChanges();
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit select site when user clicks on navigate icon', () => {
    spyOn(component.navigate, 'emit');
    const nativeElement = fixture.nativeElement;
    const button = nativeElement.querySelectorAll('fa-icon')[0];
    button.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(component.navigate.emit).toHaveBeenCalledWith(site);
  });

  it('should emit select site when user clicks on edit icon', () => {
    spyOn(component.edit, 'emit');
    const nativeElement = fixture.nativeElement;
    const button = nativeElement.querySelectorAll('fa-icon')[1];
    button.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(component.edit.emit).toHaveBeenCalledWith(site);
  });

  it('should emit select site when user clicks on delete icon', () => {
    spyOn(component.delete, 'emit');
    const nativeElement = fixture.nativeElement;
    const button = nativeElement.querySelectorAll('fa-icon')[2];
    button.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(component.delete.emit).toHaveBeenCalledWith(site);
  });
});
