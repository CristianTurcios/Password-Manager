import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faPenToSquare, faTrash, faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { ISite } from 'src/app/interfaces/Site';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  faTrash = faTrash;
  faPenToSquare = faPenToSquare;
  faUpRightFromSquare = faUpRightFromSquare;
  defaultLogo: string = '/assets/images/hero-placeholder.png';

  @Input() site!: ISite;
  @Output() edit = new EventEmitter<ISite>();
  @Output() delete = new EventEmitter<ISite>();
  @Output() navigate = new EventEmitter<ISite>();

  constructor() { }

  ngOnInit(): void {
  }
  
  /**
   * Description: emit value to parent component after user clicks on icon edit
   * 
   */
  onClickEdit(): void {
    this.edit.emit(this.site);
  }

  /**
   * Description: emit value to parent component after user clicks on icon delete
   * 
   */
  onClickDelete(): void {
    this.delete.emit(this.site);
  }

  /**
   * Description: emit value to parent component after user clicks on icon navigate
   * 
   */
  onClickNavigate(): void {
    this.navigate.emit(this.site);
  }
}
