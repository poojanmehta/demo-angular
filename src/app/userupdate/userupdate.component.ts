import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserdataService } from '../userdata.service';
import { ActivatedRoute, Router } from '@angular/router';
import { user } from '../user';

@Component({
  selector: 'app-userupdate',
  templateUrl: './userupdate.component.html',
  styleUrls: ['./userupdate.component.css']
})
export class UserupdateComponent implements OnInit {

  constructor(private userData: UserdataService, private actRoute: ActivatedRoute, private route: Router) { }

  userForm: FormGroup;
  user_id: number;
  userinfo: any;


  ngOnInit(): void {
    this.user_id = this.actRoute.snapshot.params['user_id'];
    this.userForm = new FormGroup({
      first_name: new FormControl(null, [Validators.required]),
      last_name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      dob: new FormControl(null, [Validators.required]),
      user_bio: new FormControl(null, [Validators.required])
    });
    // fetching data for user
    this.userData.getUserById(this.user_id).subscribe(
      (data: user[]) => {
        this.userinfo = data[0];
        console.log(this.userinfo);
        this.formDataBind();
      }
    );
  }

  formDataBind() {
    this.userForm.patchValue({
      first_name: this.userinfo.first_name,
      last_name: this.userinfo.last_name,
      email: this.userinfo.email,
      dob: this.userinfo.dob,
      user_bio: this.userinfo.user_bio
    });
  }

  onUpdate() {
    if (confirm('Do you want to update this record?')) {
      this.userData.updateUser(this.userForm.value, this.user_id).subscribe(
        (data: any) => {
          this.route.navigate(['/']);
        }
      );
    }
  }
}

