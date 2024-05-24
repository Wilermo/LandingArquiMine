import { Component, OnInit } from '@angular/core';
import { PlanServiceService } from 'src/app/shared/model/service/plan-service.service';
import { plan } from 'src/app/shared/model/entities/plan';
import Swal from "sweetalert2";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  planes: plan[] = [];

  constructor(private planService: PlanServiceService) { }

  ngOnInit(): void {
    let timerInterval: any;
    Swal.fire({
      title: "Cargando...",
      timer: 1000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading(null);
        let timer: any;
        timerInterval = setInterval(() => {
        }, 50);
      },
      willClose: () => {
        clearInterval(timerInterval);
      }
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log("I was closed by the timer");
      }
    });

    this.planService.getPlanes().subscribe(data => {
      this.planes = data;
      // Swal.fire({
      //   icon: 'success',
      //   title: 'Gestión de planes',
      //   text: "Listo!",
      //   confirmButtonText: 'Seleccionar un plan',
      //   confirmButtonColor: '#2E575A',
      // })
    });
  }
  chunkArray(arr: any[], chunkSize: number): any[] {
    const chunkedArray = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      chunkedArray.push(arr.slice(i, i + chunkSize));
    }
    return chunkedArray;
  }
}
