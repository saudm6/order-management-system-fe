import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from "@angular/core";
import { Observable, map } from 'rxjs';
import { UserData,UserPagedResult } from '../models/index';

@Injectable({
  providedIn: "root",
})
export class UserService {

  protected httpClient = inject(HttpClient);
  protected apiObpUrl = `http://localhost:5210/api/users`;

  getPagedUsers(pageNumber : number, pageSize : number) : Observable<UserPagedResult<any>> {

    return this.httpClient.get(`${this.apiObpUrl}?pageNumber=${pageNumber}&pageSize=${pageSize}`).pipe(map((response: any) => {
      const pagedResult: UserPagedResult<any> = {
        items: response.items,
        totalCount: response.totalCount,
        pageNumber: response.pageNumber,
        pageSize: response.pageSize,
        totalPages: response.totalPages
      };
      return pagedResult;
    }));
  }

  getUserById(userId: string) : Observable<UserData> {
    return this.httpClient.get<UserData>(`${this.apiObpUrl}/${userId}`).pipe(map((response: any) => {
      const userData: UserData = {
        id: response.id,
        first_name: response.first_name,
        middle_name: response.middle_name,
        last_name: response.last_name,
        gender: response.gender,
        dob: new Date(response.dob),
        email: response.email,
        password: response.password
      };
      return userData;
    }));
  }

  createUser(userData: any): Observable<UserData> {
    return this.httpClient.post<UserData>(`${this.apiObpUrl}`, userData).pipe(map((response: any) => {
      const userData: UserData = {
        id: response.id,
        first_name: response.first_name,
        middle_name: response.middle_name,
        last_name: response.last_name,
        gender: response.gender,
        dob: new Date(response.dob),
        email: response.email,
        password: response.password
      };
      return userData;
      
    }))
  }

  updateUser(userId: string, userData: any): Observable<UserData> {
    return this.httpClient.patch<UserData>(`${this.apiObpUrl}/${userId}`, userData).pipe(map((response: any) => {
      const updatedUserData: UserData = {
        id: response.id,
        first_name: response.first_name,
        middle_name: response.middle_name,
        last_name: response.last_name,
        gender: response.gender,
        dob: new Date(response.dob),
        email: response.email,
        password: response.password
      };
      return updatedUserData;
    }));
  }

  deleteUser(userId: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiObpUrl}/${userId}`);
  }
}
