import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/model/auth/user';
import { CreateUserService } from 'src/app/shared/model/service/create-user.service';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import {Employee} from "../../shared/model/entities/employee";

@Component({
  selector: 'app-f-pago',
  templateUrl: './f-pago.component.html',
  styleUrls: ['./f-pago.component.css']
})
export class FPagoComponent {
  nuevoUsuario: User = new User();
  error_message: string = '';
  error: boolean = false;
  error_dict: { [key: number]: string } = {
    400: 'Correo ya existente en el sistema',
    500: 'Error del servidor',
  };
  planId: string | null = null;
  constructor(private userService: CreateUserService, private router: Router,private snackBar: MatSnackBar,private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.planId = params['id'];
      console.log('Plansito ID:', this.planId);
  });
  }
  enviarDatos(): void {
    if(this.nuevoUsuario.firstName && this.nuevoUsuario.lastName && this.nuevoUsuario.email){
      localStorage.setItem("firstName",this.nuevoUsuario.firstName);
      localStorage.setItem("lastName",this.nuevoUsuario.lastName);
      localStorage.setItem("email",this.nuevoUsuario.email);
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Llene todos los datos e inténtelo nuevamente',
        text: this.error_message,
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#AA2535',
      });
    }

    //localStorage.setItem("username",this.nuevoUsuario.username);

  }

  confirmar() {
    console.log(this.nuevoUsuario);
  }
  showSuccessMessage() {
    this.snackBar.open('La convocatoria se agregó con éxito', 'Cerrar', {
      duration: 3000,
      verticalPosition: 'top'
    });
  }
}
