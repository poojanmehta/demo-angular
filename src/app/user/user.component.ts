import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, Form } from '@angular/forms';
import { UserdataService } from '../userdata.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private userData: UserdataService, private route:Router) { }

  userForm: FormGroup;

  ngOnInit(): void {
    this.userForm = new FormGroup({
      first_name: new FormControl(null, [Validators.required]),
      last_name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      dob: new FormControl(null, [Validators.required]),
      user_bio: new FormControl(null, [Validators.required])
    });
  }

  onAdd() {
    this.userData.addUser(this.userForm.value).subscribe(
      (data:any) => {
        console.log(data);
        alert('Record is added');
        this.route.navigate(['/']);
      }
  );
  }
}
