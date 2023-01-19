import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mood',
  templateUrl: './mood.component.html',
  styleUrls: ['./mood.component.css']
})
export class MoodComponent implements OnInit {
  addPost: any;
  loadNewMood: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  addPostForm() {
    this.addPost = !this.addPost;
  }

  load($event: boolean) {
    if($event) {
      this.loadNewMood = $event;
    }
  }
}
