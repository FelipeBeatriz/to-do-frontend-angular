import { Component, signal } from '@angular/core';
import { Cabecalho } from "./components/cabecalho/cabecalho";
import { Rodape } from "./components/rodape/rodape";

@Component({
  selector: 'app-root',
  imports: [Cabecalho, Rodape],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('todo_frontend');
}
