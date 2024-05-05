import {Component} from '@angular/core';
import {FormInfo} from "../../shared/model/service/form-info";
import { LandingService } from 'src/app/shared/model/service/landing.service';

@Component({
  selector: 'app-landing1',
  templateUrl: './landing1.component.html',
  styleUrls: ['./landing1.component.css']
})
export class Landing1Component {
  constructor(
    private landingService: LandingService
  ) {
  }

  info: FormInfo | undefined
  form_email: string | undefined;
  form_cel: string | undefined;
  form_name: string | undefined;
  form_message: string | undefined;

  onSubmit() {
    if (this.form_message != undefined && this.form_message != "" && this.form_cel != undefined && this.form_cel != "" && this.form_message != undefined && this.form_message != "" && this.form_name != undefined && this.form_name != "") {

      let formInfo = new FormInfo(this.form_name, this.form_cel, this.form_email, this.form_message);
      console.log(formInfo)
      this.landingService.sendFormInfo(formInfo).subscribe(result => {
      })
    }
  }

}
