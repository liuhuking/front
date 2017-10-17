import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Task } from '../common/task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  taskList = [];
  title = "Tasks";

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.readList();
  }

  readList() {
    this.http.get('http://localhost:3000/tasks/gettasks',
      { headers: new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(sessionStorage['currentUser'])['token'])}).subscribe(data => {
        let counter = 0;
        this.taskList = [];
        while (data[counter] != null) {
          this.taskList.push(new Task(
            data[counter]['_id'],
            data[counter]['name'],
            data[counter]['date'],
            data[counter]['goal'],
            data[counter]['deliverable'],
            data[counter]['startTime'],
            data[counter]['endTime'],
            data[counter]['process'],
            data[counter]['userId']
          ));
          counter++;
        }
      });
  }

  deleteTask(task: Task) {
    this.http.delete('http://localhost:3000/tasks/remove/' + task._id,
    { headers: new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(sessionStorage['currentUser'])['token'])})
      .subscribe(
      success => {
        this.readList();
      }
      );
  }
}
