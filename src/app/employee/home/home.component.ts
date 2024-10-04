import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatTableModule, MatSortModule, MatPaginatorModule, MatDialogModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit {
  // displayedColumns = ['id', 'name', 'email', 'salary', 'edit', 'delete'];
  displayedColumns = ['seq', 'name', 'email', 'salary', 'regdate', 'edit', 'delete'];
  dataSource = new MatTableDataSource<Employee>();
  constructor(private employeeService: EmployeeService) {}

  name:String='';
  email:String='';
  salary:any=undefined;
  seq:any=undefined;
  regdate:any=undefined;

  employee:Employee={
    id:0,
    name:'',
    email:'',
    salary:this.salary,
    seq:this.seq,
    regdate:this.regdate
  }

  employees:Employee[]=[];
  filteredEmployees:Employee[]=[];
  @ViewChild(MatSort) sort: any;
  @ViewChild(MatPaginator) paginator: any;
  readonly dialog = inject(MatDialog);

  ngAfterViewInit(): void {
      this.employeeService.fetchAllEmployees().subscribe((data)=> {
        this.employees=data;
        this.dataSource = new MatTableDataSource<Employee>(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      })
  }

  deleteEmployee(id:Number) {
    const isConfirmed = window.confirm("정말 삭제하시겠습니까?");
    if (isConfirmed) {
      this.employeeService.deleteEmployee(id).subscribe((data)=> {
        this.employees = this.employees.filter(item=>item.id != id);
        this.dataSource.data = this.employees;
      })
      window.location.reload();
    }
  }

  searchEmployee(input:any) {
    this.filteredEmployees=this.employees.filter(item=>item.name.toLowerCase().includes(input.toLowerCase())
    || item.email.toLowerCase().includes(input.toLowerCase())
    || item.salary.toString().includes(input));
    this.dataSource = new MatTableDataSource<Employee>(this.filteredEmployees);
    this.dataSource.sort = this.sort;
  }

  openDialog(employee:Employee):void {
    const dialogRef = this.dialog.open(EmployeeFormComponent, {
      data:employee
    });

    dialogRef.afterClosed().subscribe(result=>{
      if (result!==undefined) {
        this.employee.id=result.id;
        this.employee.name=result.name;
        this.employee.email=result.email;
        this.employee.salary=result.salary;
      }
    })

  }

}
