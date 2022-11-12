import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetUserModel } from 'src/app/auth/models/auth.model';
import {
  BoardResModel,
  ColumnModel,
  UpdateColumnPayload,
  CreateTaskPayload,
  TaskModel,
} from '../models/details.model';

@Injectable()
export class DetailsService {
  constructor(private http: HttpClient) {}

  getBoardById(id: string): Observable<BoardResModel> {
    return this.http.get<BoardResModel>(`/boards/${id}`);
  }

  createColumn(boardId: string, title: string): Observable<ColumnModel> {
    return this.http.post<ColumnModel>(`/boards/${boardId}/columns`, { title });
  }

  deleteColumn(boardId: string, columnId: string) {
    return this.http.delete(`/boards/${boardId}/columns/${columnId}`);
  }

  updateColumn(boardId: string, columnId: string, body: UpdateColumnPayload) {
    return this.http.put<ColumnModel>(
      `/boards/${boardId}/columns/${columnId}`,
      body,
    );
  }

  createTask(boardId: string, columnId: string, body: CreateTaskPayload) {
    const { id } = JSON.parse(
      `${localStorage.getItem('PlanUserInfo')}`,
    ) as GetUserModel;

    return this.http.post<TaskModel>(
      `/boards/${boardId}/columns/${columnId}/tasks`,
      {
        ...body,
        userId: id,
      },
    );
  }

  deleteTask(boardId: string, columnId: string, taskId: string) {
    return this.http.delete(
      `/boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
    );
  }
}
