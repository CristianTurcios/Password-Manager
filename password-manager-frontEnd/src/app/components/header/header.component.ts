import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  data: string = '';
  @Input() title: string = '';
  @Output() onSearch = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * 
   * @param value: string - User filter value
   */
  onUserType(value: string): void {
    this.onSearch.emit(value);
  }
}
