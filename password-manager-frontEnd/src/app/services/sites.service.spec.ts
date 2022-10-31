import { TestBed } from '@angular/core/testing';
import { SitesService } from './sites.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';
import { ISite } from '../interfaces/Site';

describe('SitesService', () => {
  let service: SitesService;
  let httpTestingController: HttpTestingController;
  const site: ISite = {
    'id': '1',
    'name': 'Spotify',
    'username': 'johndoe@gmail.com',
    'logo': 'https://logodownload.org/wp-content/uploads/2016/09/Spotify-logo.png',
    'hasImage': true,
    'password': 'password',
    'url': 'https://www.spotify.com'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(SitesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return expected data', (done) => {
    const expectedData: ISite[] = [site];
    const url = `${environment.api}/sites`;

    service.get().subscribe((data: ISite[]) => {
      expect(data).toEqual(expectedData);
      done();
    });
    const testRequest = httpTestingController.expectOne(url);
    testRequest.flush(expectedData);
  });

  it('should POST and return data', (done) => {
    const url = `${environment.api}/sites`;
    service.post(site).subscribe((res) => {
      expect(res).toEqual({ msg: 'success' });
      done();
    });

    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toBe('POST');
    req.flush({ msg: 'success' });
  });

  it('should Delete and return data', (done) => {
    const url = `${environment.api}/sites/1`;
    service.delete('1').subscribe((res) => {
      expect(res).toEqual({ msg: 'success' });
      done();
    });

    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toBe('DELETE');
    req.flush({ msg: 'success' });
  });
});
