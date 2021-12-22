import { Component, OnInit } from '@angular/core';
import {Tasks} from "../shared/tasks";
import {Team} from "../shared/login";
import {Goals} from "../shared/goals";
import {ApiService} from "../shared/api.service";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor( private api: ApiService) { }

  ngOnInit(): void {
  }
}
