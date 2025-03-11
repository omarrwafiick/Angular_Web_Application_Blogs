import {AfterViewInit, Component, inject, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { TitleService } from '../../../_services/titles.service';
import { MatDialog } from '@angular/material/dialog';
import { User } from '../../../_models/User';
import { AuthenticationService } from '../../../_services/Authentication.service';
import { NgStyle } from '@angular/common';
import { ConfirmationService } from '../../../_services/confirm.service';

@Component({
  selector: 'app-manage-users',
  standalone: true,
  imports: [MatPaginator,MatSort,MatTableModule,MatFormFieldModule,MatInputModule], 
  templateUrl: './manage-users.component.html'
})
export class ManageUsersComponent implements AfterViewInit,OnInit{
  titleService= inject(TitleService);
  confirmationService = inject(ConfirmationService);
  dialog= inject(MatDialog);
  pageTitle:string="Manage Users - Blurb";
  pageDescriptipn:string="";
  displayedColumns: string[] = ['UserId', 'Email', 'Username' , 'Full_Name','Action'];
  dataSource: MatTableDataSource<User>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  Users:User[]=[];
  service = inject(AuthenticationService);
  constructor() { 
    this.dataSource = new MatTableDataSource(this.Users);
  }
  ngOnInit(): void {
    this.titleService.TitleAndDesc(this.pageTitle,this.pageDescriptipn);
    this.IntialRequests();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  IntialRequests(){
    this.service.GetAllUsers().subscribe(d=>this.Users=d);
    this.dataSource.data = this.Users;
  }

  FilterTbl(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  async Delete(row:User){
    const result = await this.confirmationService.confirm(
    'Are you Sure you want To Delete This Record?'
  );
  if(result){
    this.service.DeleteUserById(row.userid).subscribe({next:()=>{
      this.dataSource.data = this.Users.filter(b=>b.userid!==row.userid);
    }});
  }
}
}

