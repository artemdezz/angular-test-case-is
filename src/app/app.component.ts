import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  title = 'test-case';

  selectedTask: string;
  task = [
    { name: "magicsquare", value: 1 },
    { name: "substring", value: 2 }
  ]

  constructor(private router: Router) { }
  ngOnInit(): void {}

  public selectTask(){
    this.router.navigate(['/'+this.selectedTask]);
  }

}
