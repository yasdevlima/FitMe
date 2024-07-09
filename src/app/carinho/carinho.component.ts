
import { Component, OnInit } from '@angular/core';
import { ComprarService } from '../compra/comprar.service';
import { galeriaImages } from '../data-type';

@Component({
  selector: 'app-carinho',
  templateUrl: './carinho.component.html',
  styleUrls: ['./carinho.component.css'],
})
export class CarinhoComponent implements OnInit {
  showMesage: boolean = true;
  images!: galeriaImages[];
  count: number = 0;
  total: number | undefined;

  constructor(private compra: ComprarService) {}

  ngOnInit() {

    this.compra.GetAllCart().subscribe((resp) => {
      this.showMesage = false;
      this.count = resp.length;
      this.images = resp;
      this.calcularTotal();
    });
  }

  calcularTotal() {
    let total = 0;
    for (let item of this.images) {
      total += parseFloat(item.price);
    }

    this.total = total;
  }
  //não está com a função de adicionar ao carrinho, provavelmente esses items do carrinho estão estáticos

  removerDoCarrinho(produto: any) {

    // Remover o produto da lista de imagens
    this.images = this.images.filter(item => item.id !== produto.id);

    // Atualizar localStorage
    let dados = localStorage.getItem('cart');
    if (dados) {
      let carrinho = JSON.parse(dados);
      carrinho = carrinho.filter((item: any) => item.id !== produto.id);

      if (carrinho.length > 0) {
        localStorage.setItem('cart', JSON.stringify(carrinho));
      } else {
        localStorage.removeItem('cart');
      }
    } else {
      localStorage.removeItem('cart');
    }

    // Atualizar outras variáveis ou estados conforme necessário
    this.count = this.images.length;
    this.count = this.images.length;
    this.calcularTotal();

    // Delete item from API
    fetch(`http://localhost:3000/cart/${produto.id}`, {
      method: 'DELETE',
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
    this.calcularTotal();

  }
}
