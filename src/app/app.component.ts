import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  loaded = false;

  ngOnInit() {
    setTimeout(() => {
      this.loaded = true;
    }, 3000);
  }
}
