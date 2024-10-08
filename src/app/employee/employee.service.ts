import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from './employee';
import { environment } from '../../environment/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private _httpClient:HttpClient) { }

  //개발
  // baseUrl: String="/api/v1/employees";
  //운영
  baseUrl: string = environment.apiUrl;

  fetchAllEmployees():Observable<Employee[]>{
    return this._httpClient.get<Employee[]>(`${this.baseUrl}`);
  }

  createEmployee(data:Employee){
    return this._httpClient.post<Employee>(`${this.baseUrl}`, data);
  }

  updateEmployee(data:Employee){
    return this._httpClient.put<Employee>(`${this.baseUrl}/${data.id}`, data);
  }

  deleteEmployee(id:Number){
    return this._httpClient.delete<Employee>(`${this.baseUrl}/${id}`);
  }
}
