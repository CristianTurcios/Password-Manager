import { Component, OnDestroy, OnInit } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalFormComponent } from './components/modal-form/modal-form.component';
import { SitesService } from './services/sites.service';
import { finalize } from 'rxjs/operators';
import { ISite } from './interfaces/Site';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  faPlus = faPlus
  sites: ISite[] = [];
  originalData: ISite[] = [];
  title = 'Password Manager';
  isLoading: boolean = false;
  subscription$!: Subscription;

  constructor(
    private modalService: NgbModal,
    private sitesService: SitesService
  ) { }

  ngOnInit(): void {
    this.sitesService.onSiteCreatedOrEdited.subscribe(() => this.getSites());
    this.getSites();
  }

  /**
   * Description get all sites list
   * 
   */
  getSites(): void {
    this.isLoading = true;
    this.subscription$ = this.sitesService.get().pipe(finalize(() => this.isLoading = false),)
      .subscribe((res: ISite[]) => {
        this.originalData = res;
        this.sites = this.originalData
      }, () => this.sites = []);
  }

  
  /**
   * Description: filter sites based on user search criteria
   *
   * @param {string} search - filter criteria
   */
  onSearch(search: string): void {    
    if (search) {
      this.sites = this.originalData.filter((element: ISite) =>
        element.name.toLocaleLowerCase().includes(search)
      );
      return;
    }
    this.sites = this.originalData;
  }

  
  /**
   * Description: open modal to edit existing site
   *
   * @param {ISite} site - existing site
   */
  onClickEdit(site: ISite): void {
    const modalRef = this.modalService.open(ModalFormComponent, { size: 'lg', centered: true });
    modalRef.componentInstance.site = site;
  }

  /**
   * Description: delete existing site
   *
   * @param {ISite} site - existing site
   */
  onClickDelete(site: ISite): void {
    this.isLoading = true;
    this.sitesService.delete(site.id || '').subscribe(() => {
      this.getSites();
    }, () => console.error('something went wrong'))
  }

  /**
   * Description: Open url site in a new tab
   *
   * @param {ISite} site
   */
  onClickNavigate(site: ISite): void {
    window.open(site.url, '_blank');
  }

  /**
   * Description: Open modal to create a new site from scratch
   *
   */
  openModal() {
    this.modalService.open(ModalFormComponent, { size: 'lg', centered: true });
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }
}
