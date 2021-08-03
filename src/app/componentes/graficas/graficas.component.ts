import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-graficas',
  templateUrl: './graficas.component.html',
  styleUrls: ['./graficas.component.scss'],
  providers: [UsuarioService]
})
export class GraficasComponent implements OnInit {

  private graficas: any;

  chartInicial = 'pie';
charTypes =[
  { nombreTipo: 'pie', texto: 'Circular'},
  { nombreTipo: 'line', texto: 'Lineas'},
  { nombreTipo: 'bar', texto: 'Barras'},
]
  chartOptions = {
    responsive: true,
  };
  chartLabels = [];
  chartData = [];
  chartColors = [{
    backgroundColor: [],

  }];
  chartLegend = true;
  chartPlugins = [];
  constructor(private _enfermedadService: UsuarioService) { }

  ngOnInit(): void {
    this.ObtenerEnfermedades();
  }

  ObtenerEnfermedades(){
    this._enfermedadService.obtenerEnfermedades().subscribe(
      response => {
        console.log(response)
        this.graficas = response.enfermedadEncontrada;
        this.graficas.forEach(datos =>{
          this.chartLabels.push(datos.nombre);
          this.chartData.push(datos._id);
          this.chartColors[0].backgroundColor.push(`#${Math.floor(Math.random()*16777215).toString(16)}`);
        })
      }
    )
  }
}
