import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.scss'],
})
export class NewOrderComponent implements OnInit {
  newOrderForm: FormGroup;

  tiposPao = ['Francês ( Madero )', 'Brioche', 'Australiano'];
  tiposQueijo = ['Cheddar', 'Muçarela'];
  complementos = [
    'Alface',
    'Tomate',
    'Cebola crua',
    'Cebola caremelizada',
    'Picles',
    'Bacon',
    'Geleia de bacon',
    'Cheddar cremoso',
  ];

  bossBurguer: boolean = false;

  orders: any = [];

  constructor(
    private ordersService: OrdersService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.newOrderForm = new FormGroup({
      cliente: new FormControl('', Validators.required),
      tipoPao: new FormControl(''),
      tipoQueijo: new FormControl(''),
      complementos: new FormControl([]),
    });
  }

  ngOnInit(): void {}

  checkBossBurguer() {
    if (this.bossBurguer) {
      this.newOrderForm.controls['tipoPao'].setValue('Hambúrguer do Chefe');
      this.newOrderForm.controls['tipoQueijo'].setValue('-');
      this.newOrderForm.controls['complementos'].setValue([]);

      this.newOrderForm.controls['tipoPao'].disable();
      this.newOrderForm.controls['tipoQueijo'].disable();
      this.newOrderForm.controls['complementos'].disable();
    } else {
      this.newOrderForm.controls['tipoPao'].enable();
      this.newOrderForm.controls['tipoQueijo'].enable();
      this.newOrderForm.controls['complementos'].enable();
    }
  }

  submitOrder() {
    let order = this.newOrderForm.getRawValue();

    if (this.bossBurguer) {
      order['bossBurguer'] = true;
    }

    if (this.newOrderForm.controls['cliente'].valid) {
      this.ordersService.createOrder(order).subscribe({
        next: () => {
          this.toastr.success('Pedido criado com sucesso');
          this.router.navigate(['/']);
        },
        error: () => {
          this.toastr.error('Não foi possível criar o pedido', 'Erro');
        },
      });
    } else {
      this.toastr.warning('Informe o nome do cliente', 'Atenção');
    }
  }
}
