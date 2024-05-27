import {Component, OnInit} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { company } from 'src/app/shared/model/entities/company';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CompanyService } from 'src/app/shared/model/service/company.service';
import { ActivatedRoute } from '@angular/router';
import { PlanServiceService } from 'src/app/shared/model/service/plan-service.service';
import { plan } from 'src/app/shared/model/entities/plan';
import { Router } from '@angular/router';
import {Employee} from "../../shared/model/entities/employee";
import {CreateUserService} from "../../shared/model/service/create-user.service";
import Swal from "sweetalert2";
import {User} from "../../shared/model/auth/user";

@Component({
  selector: 'app-add-empresa',
  templateUrl: './add-empresa.component.html',
  styleUrls: ['./add-empresa.component.css']
})
export class AddEmpresaComponent implements OnInit{
  estados = ['Active', 'Inactive'];
  plan: plan | undefined;
  error: boolean = false;

  error_dict: { [key: number]: string } = {
    400: 'Correo ya existente en el sistema',
    500: 'Error del servidor',
  };
  error_message: string = '';


  planId : string | undefined;
  constructor(private builder: FormBuilder, private companyService: CompanyService,
    private snackBar: MatSnackBar, private route: ActivatedRoute, private router: Router,
    private planService: PlanServiceService,
              private userService :  CreateUserService) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      const planId = params['planId'];
      console.log('Plan ID:', planId);
      this.planId = planId;

      // Obtener el plan por ID
      if (planId) {
        this.planService.getPlan(+planId).subscribe(
          (plan: plan) => {
            console.log('Plan obtenido:', plan);
            this.plan = plan;


            if (this.plan && this.plan.duration) {
              const subscriptionStartDate = new Date();
              const subscriptionEndDate = new Date(subscriptionStartDate);
              subscriptionEndDate.setMonth(subscriptionEndDate.getMonth() + this.plan.duration);
              this.companyform.patchValue({ subscriptionEndDate });
            }
          },
          error => {
            console.error('Error al obtener el plan:', error);
          }
        );
      }
    });

    this.companyform.get('linkDate')?.disable();
    this.companyform.get('subscriptionEndDate')?.disable();
  }

  companyform = this.builder.group({
    nameCompany: this.builder.control('', Validators.required),
    nit: this.builder.control(0, Validators.required),
    nameLegalRepresentative: this.builder.control('', Validators.required),
    email: this.builder.control('', Validators.compose([Validators.required, Validators.email])),
    phoneCompany: this.builder.control(0),
    numWorkers: this.builder.control(0),
    status: this.builder.control('', Validators.required),
    address: this.builder.control('', Validators.required),
    linkDate: [new Date().toLocaleDateString('es-CO'), Validators.required],
    subscriptionEndDate: [new Date(), Validators.required],
  });



  SaveCompany() {
    if (this.companyform.valid) {

      const subscriptionEndDate: Date = this.companyform.value.subscriptionEndDate || new Date();
      const publishDateValue = this.companyform.value.linkDate;
      const currentDate = publishDateValue ? new Date(publishDateValue) : new Date();
      let planNumberId :number|undefined;
      if(this.planId != undefined){
        planNumberId = +this.planId
      }

      const companyData: company = {
        nameCompany: this.companyform.value.nameCompany || '',
        nit: this.companyform.value.nit || -1,
        nameLegalRepresentative: this.companyform.value.nameLegalRepresentative || '',
        idLegalRepresentative: -1,
        email: this.companyform.value.email || '',
        phoneCompany: this.companyform.value.phoneCompany || 0,
        numWorkers: this.companyform.value.numWorkers || 0,
        status: this.companyform.value.status || '',
        linkDate: currentDate.toJSON().slice(0, 10),
        subscriptionEndDate: subscriptionEndDate.toJSON().slice(0, 10),
        address: this.companyform.value.address || '',
        planId: planNumberId
      };

      this.companyService.agregarCompany(companyData).subscribe(
        response => {
          let compañiaCreada : company = response;
          console.log('Empresa agregado correctamente:', compañiaCreada);
          let companyId : number = 0;
          let companyIdStr = compañiaCreada.id;
          if(companyIdStr!=null){
            companyId = +companyIdStr;
          }
          let firstName : string | null = localStorage.getItem("firstName")
          let lastName : string | null = localStorage.getItem("lastName")
          let email = localStorage.getItem("email");

          let nuevoUsuario: User = new User();
          nuevoUsuario.firstName = firstName;
          nuevoUsuario.lastName = lastName;
          nuevoUsuario.email = email;
          nuevoUsuario.companyid = companyId;


          this.userService.createUser(nuevoUsuario).subscribe(
            (data: any) => {
              console.log("Respuesta del servidor:", data);
              const usuario = data;
              nuevoUsuario.username = data
              nuevoUsuario.email = data

              this.userService.agregarUsuario(nuevoUsuario).subscribe(
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
              //localStorage.setItem("email",nuevoUsuario.email)
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

          let empleado = new Employee(
            -1,
            firstName,
            lastName,
            "",
            -1,
            -1,
            -1,
            -1,
            companyId,
            "",
            nuevoUsuario.username,
            0,
            ""
          );
          console.log(empleado);
          this.userService.agregarEmpleado(empleado).subscribe(response => {
              console.log('Empleado agregado correctamente:', response);
            },
            error => {
              console.error('Error al agregar Empleado:', error);
            });
          this.router.navigate(['/metodo']);
        },
        error => {
          console.error('Error al agregar Empresa:', error);
        }
      );
    } else {
      console.log('Formulario inválido');
    }
  }


  clearform() {
    this.companyform.reset();
  }

  showSuccessMessage() {
    this.snackBar.open('La convocatoria se agregó con éxito', 'Cerrar', {
      duration: 3000,
      verticalPosition: 'top'
    });
  }
}
