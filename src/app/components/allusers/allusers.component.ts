import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { RegistrationService } from 'src/app/services/registration.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EditrecordsComponent } from '../editrecords/editrecords.component';
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: 'app-allusers',
  templateUrl: './allusers.component.html',
  styleUrls: ['./allusers.component.css']
})
export class AllusersComponent implements OnInit {

  allUsers: any;
  displayedColumns: string[] = ['id', 'name', 'email', 'pan', 'phone', 'zipcode', 'username', 'action'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  constructor(private service: RegistrationService, public dialog: MatDialog, private cookie: CookieService) { }

  ngOnInit() {
    this.service.getAll().then((res: any) => {
      this.allUsers = res;
      this.dataSource = new MatTableDataSource(this.allUsers);
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  edit(id) {
    this.dialog.open(EditrecordsComponent, {
      data: {
        id: id
      }
    });
  }

  delete(id) {
    this.service.openDialog('Are sure want to delete this data.!')
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          const loggedInUser = this.cookie.get('user');
          if (id === loggedInUser) {
            this.service.showMessage("You have logged with this account, can't delete this.!");
          } else {
            this.service.delete(id);
            this.service.showMessage('Data deleted successfully !');
            this.service.getAll().then(res => {
              this.allUsers = res;
              this.dataSource = new MatTableDataSource(this.allUsers);
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
            });
          
          }
        }
      });
  }
}
