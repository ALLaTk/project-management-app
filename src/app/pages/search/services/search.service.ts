import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin, mergeMap, of, ReplaySubject, switchMap, tap } from 'rxjs';
import { TaskModel } from '../../details/models/details.model';
import { ApiSearchService } from './api-search.service';

@Injectable({
  providedIn: 'any',
})
export class SearchService {
  tasks: TaskModel[] = [];

  tasksSubj$ = new ReplaySubject<TaskModel[] | null>();

  constructor(private router: Router, private apiSearch: ApiSearchService) {}

  searchByWord(value: string) {
    this.router.navigate(['/search']);
  }

  getTasks() {
    this.apiSearch.getAllBoards().subscribe((boards) =>
      boards.forEach((board) => {
        this.apiSearch.getAllColumns(board.id).subscribe((columns) =>
          columns.forEach((column) => {
            this.apiSearch.getAllTasks(board.id, column.id).subscribe((tasks) =>
              tasks.forEach((task) => {
                this.apiSearch.getAllUsers().subscribe((users) => {
                  users.forEach((user) => {
                    if (task.userId === user.id) {
                      const newTask = { ...task, userId: user.name };
                      this.tasks.push(newTask);
                      this.tasksSubj$.next(this.tasks);
                    }
                  });
                });
              }),
            );
          }),
        );
      }),
    );
  }
}
// console.log()
