import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { OrdersService } from 'src/app/services/orders.service';
import { DeleteDialogComponent } from './dialogs/delete-dialog/delete-dialog.component';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  socket: any;
  orders: any = [];

  constructor(
    private ordersService: OrdersService,
    private toastr: ToastrService,
    public dialog: MatDialog
  ) {
    this.socket = io(environment.urlBase); // Substitua pela URL do seu servidor Node.js
  }

  ngOnInit(): void {
    this.socket.on('order-change', (change: any) => {
      console.log('Escutou no angular');

      this.getAllOrders();
    });
    this.getAllOrders();
  }

  getAllOrders() {
    this.ordersService.getAllOrders().subscribe({
      next: (res: any) => {
        this.orders = res.data;
      },
      error: () => {
        this.toastr.error('Não foi possível carregar todos os pedidos', 'Erro');
      },
    });
  }

  openDeleteDialog(order: any) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: order,
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.getAllOrders();
    });
  }

  updateOrder(order: any) {
    let data = {
      finalizado: !order.finalizado,
    };

    this.ordersService.updateOrder(order._id, data).subscribe({
      next: () => {
        this.toastr.success(
          `Pedido ${order.finalizado ? 'retomado' : 'finalizado'} com sucesso.`
        );
      },
      error: () => {
        this.toastr.error(
          `Não foi possível ${
            order.finalizado ? 'retomar' : 'finalizar'
          } o pedido.`,
          'Erro'
        );
      },
    });
  }
}
