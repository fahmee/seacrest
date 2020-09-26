import { Component, OnInit,ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatDialogConfig } from '@angular/material';
import { NotificationService } from 'src/app/services/notification.service';
import { AddSubjectComponent } from '../add-subject/add-subject.component';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {

  constructor(public userService:UserService,
    private notificationService:NotificationService,
    private authService:AuthService,
    private dialog: MatDialog) { 
      this.userService.findSubjectWithStream();
    }

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['subjectId', 'subjectName','streamName','actions'];
  @ViewChild(MatSort,{static: false}) sort: MatSort;
  @ViewChild(MatPaginator,{static: false}) paginator: MatPaginator;
  searchKey: string;
  streamData:any;
  subjects:any;
  SubjectData:any;
  ngOnInit() {
    
   
   setTimeout(()=>
     {
      
   this.SubjectData=this.userService.SubjectWithStream;
   
    
   
        this.listData = new MatTableDataSource(this.SubjectData);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
    },4000);

    
      
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  

  onCreate() {
   // this.authService.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    //  dialogConfig.height="40%";
    this.dialog.open(AddSubjectComponent,dialogConfig);
  }
 
  onEdit(somevalue)
  {}
 


}
