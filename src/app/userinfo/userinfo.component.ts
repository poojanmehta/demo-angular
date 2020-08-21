import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { user } from '../user';
import { UserdataService } from '../userdata.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.css']
})
export class UserinfoComponent implements OnInit {

  displayedColumns: string[] = ['id', 'fname', 'last_name', 'email', 'dob', 'bio', 'action'];
  dataSource = new MatTableDataSource<user>();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private userData: UserdataService, private route: Router) { }

  userArr: user[];

  ngOnInit(): void {
    this.fetchData();
  }

  // fetching all data from database
  fetchData() {
    this.userData.getAllUsers().subscribe(
      (data: user[]) => {
        this.userArr = data;
        // assigning records to datasource
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );
  }

  // navigating to add user page
  goToCreate() {
    this.route.navigate(['/adduser']);
  }

  // filtering and pagination
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // delete record with user id
  onDelete(row: any) {
    if (confirm('Do you want to delete this record?')) {
      this.userData.deleteUser(row.user_id).subscribe(
        (data: any) => {
          this.userArr.splice(this.userArr.indexOf(row), 1);
          this.dataSource.data = this.userArr;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      );
    }
  }

  // navigating to update record page
  onUpdate(user_id: number) {
    this.route.navigate(['/updateuser', user_id]);
  }
}
