import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-is-loading',
  templateUrl: './is-loading.component.html',
  styleUrls: ['./is-loading.component.scss']
})
export class IsLoadingComponent implements OnInit {
  @Input()  isLoading  = false
  constructor() { }

  ngOnInit(): void {
  }

}
