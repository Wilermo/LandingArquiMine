import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PosibleUsuario } from 'src/app/model/Entities/posibleUsuario';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/model/auth/user';
import { CreateUserService } from 'src/app/shared/model/service/create-user.service';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    400: 'Credenciales incorrectas',
    500: 'Error del servidor',
  };
  constructor(private userService: CreateUserService, private router: Router,private snackBar: MatSnackBar) { }
  ngOnInit(): void {
  }
  enviarDatos(): void {
    this.userService.createUser(this.nuevoUsuario).subscribe(
      (data: any) => {
        console.log("Respuesta del servidor:", data);
        const usuario = data; 

        this.userService.agregarUsuario(this.nuevoUsuario).subscribe(
          response => {
            console.log('Usuario agregado correctamente:', response);
          },
          error => {
            console.error('Error al agregar Usuario:', error);
          }
        );
        Swal.fire({
          icon: 'success',
          title: 'Usuario creado exitosamente',
          text: `El usuario es: ${usuario}`,
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#28a745',
        });

        this.router.navigate(['/metodo'], { queryParams: { userN:this.nuevoUsuario} });

      },
      (error: any) => {
        console.error("Error en la suscripción:", error);
        let code: number | undefined = error.status
          ? Math.round(error.status / 100) * 100
          : undefined;
        if (code && code in this.error_dict) {
          this.error_message = this.error_dict[code];
        }
        this.error = true;
        Swal.fire({
          icon: 'error',
          title: 'Error al crear cuenta',
          text: this.error_message,
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#AA2535',
        });
      });
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
