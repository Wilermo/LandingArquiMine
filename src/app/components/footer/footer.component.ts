import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  redirigirAOtroProyecto() {
    window.location.href = "https://canelaplatformfront-qa.up.railway.app";
  }
}
