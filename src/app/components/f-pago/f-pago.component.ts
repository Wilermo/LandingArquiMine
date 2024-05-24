import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/model/auth/user';
import { CreateUserService } from 'src/app/shared/model/service/create-user.service';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

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
    this.userService.createUser(this.nuevoUsuario).subscribe(
      (data: any) => {
        console.log("Respuesta del servidor:", data);
        const usuario = data;
        this.nuevoUsuario.username = data
        this.nuevoUsuario.email = data

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
        console.log('ajaaaaaaaaaaaa',this.planId);
        localStorage.setItem("email",this.nuevoUsuario.email)
        this.router.navigate(['/empresa'], { queryParams: { planId: this.planId } });

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
