import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss'],
})
export class DeleteDialogComponent implements OnInit {
  order: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DeleteDialogComponent>,
    private ordersService: OrdersService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.order = this.data;
  }

  deleteOrder() {
    this.ordersService.deleteOrder(this.order._id).subscribe({
      next: () => {
        this.dialogRef.close(true);
        this.toastr.success('Pedido excluído com sucesso.');
      
      },
      error: () => {
        this.toastr.error('Não foi possível excluir o pedido.', 'Erro');
        setTimeout(() => {
          this.dialogRef.close(true);
        }, 500);
      },
    });
  }
}
