import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { UserinfoComponent } from './userinfo/userinfo.component';
import { UserupdateComponent } from './userupdate/userupdate.component';

const arr: Routes = [
  { path: '', component: UserinfoComponent },
  { path: 'users', component: UserinfoComponent },
  { path: 'adduser', component: UserComponent },
  { path: 'updateuser/:user_id', component: UserupdateComponent }
];

export const routingArr = RouterModule.forRoot(arr);
