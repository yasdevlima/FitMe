import { Component } from '@angular/core';
import { ProdutosService } from '../services/produtos.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  jsonData: any = { data: [] };
  searchResults: any[] = [];
  parametros: string = ''; // Variável para armazenar o parâmetro

  constructor(private produtos: ProdutosService) {}

  ngOnInit() {

    this.produtos.getAllData().subscribe((data) => {
      this.jsonData = data;
    });
  }

  search(event: any) {
    const query = event.target.value;
    console.log(query)
    if (query.length >= 2) {
      this.searchResults = this.jsonData.filter((item: any) =>
        item.title.toLowerCase().includes(query.toLowerCase())
      );
      console.log(this.searchResults)
    } else {
      this.searchResults = [];
    }
  }


}
