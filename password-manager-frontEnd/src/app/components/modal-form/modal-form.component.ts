import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { faCopy, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ISite } from 'src/app/interfaces/Site';
import { SitesService } from 'src/app/services/sites.service';

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.scss']
})
export class ModalFormComponent implements OnInit {
  faEye = faEye;
  faCopy = faCopy;
  faEyeSlash = faEyeSlash;
  modalForm!: FormGroup;
  isLoading: boolean = false;
  @Input() site!: ISite;
  show: boolean = false;
  urlPattern = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;

  get form() {
    return this.modalForm.controls;
  }

  constructor(
    private formBuilder: FormBuilder,
    private sitesService: SitesService,
    public activeModal: NgbActiveModal,
  ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  /**
   * Description: initialize form, if user is in edit mode, 
   * then prefill fields, if not leave empty values
   * 
   */
  initializeForm(): void {
    this.modalForm = this.formBuilder.group({
      name: [this.site?.name || '', Validators.compose([
        Validators.required,
      ])],
      url: [this.site?.url || '', Validators.compose([
        Validators.required,
        Validators.pattern(this.urlPattern)
      ])],
      password: [this.site?.password || '', Validators.compose([
        Validators.required,
      ])],
      username: [this.site?.username || '', Validators.compose([
        Validators.required,
      ])],
    });
  }

  /**
   * Description: show/hide password visibility
   * 
   */
  togglePasswordVisibility(): void {
    this.show = !this.show;
  }

  /**
   * Description: submit form after all fields are valid and send to BE
   * depending if user is editing or posting
   * 
   */
  onSubmit() {
    if (this.modalForm.invalid) return;
    
    this.isLoading = true;
    const site: ISite = {
      id: this.site?.id,
      name: this.modalForm.value.name,
      username: this.modalForm.value.username,
      logo: this.site?.logo || '',
      hasImage: this.site?.hasImage || false,
      password: this.modalForm.value.password,
      url: this.modalForm.value.url,
    };

    if(!this.site?.id) {
      this.postSite(site);
      return;
    }
    this.putSite(this.site.id, site);
  }

  /**
   * Description: Post new Site
   *
   * @param {ISite} site
   */
  postSite(site: ISite): void {
    this.sitesService.post(site).subscribe(() => {
      this.activeModal.close();
      this.sitesService.onSiteCreatedOrEdited.next();
    }, () => console.error('something went wrong'))
  }

  /**
   * Description: Put existing site
   *
   * @param {string} id
   * @param {ISite} site
   */
  putSite(id: string, site: ISite): void {
    this.sitesService.put(id, site).subscribe(() => {
      this.activeModal.close();
      this.sitesService.onSiteCreatedOrEdited.next();
    }, () => console.error('something went wrong'))
  }
}