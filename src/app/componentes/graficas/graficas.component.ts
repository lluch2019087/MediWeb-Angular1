import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-graficas',
  templateUrl: './graficas.component.html',
  styleUrls: ['./graficas.component.scss'],
  providers: [UsuarioService]
})
export class GraficasComponent implements OnInit {
  public covid: any;
  public covidModel: any= {contagiados:'', muertos:'', casosDetectados:'', recuperados:''}
  public covid2: any;
public graficas2: any;
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
  constructor(public _enfermedadService: UsuarioService) { }

  ngOnInit(): void {
  this.listarCovid();
  }

  listarCovid(){
    this._enfermedadService.listarCovid().subscribe(
      response=>{
        console.log(response)
        this.graficas2 = response.covid;
        this.graficas2.forEach(datos=>{
          this.chartLabels.push(datos.nombre);
          this.chartData.push(datos.muertos, datos.recuperados, datos.contagiados, datos.casosDetectados);
          this.chartColors[0].backgroundColor.push(`#${Math.floor(Math.random()*16777215).toString(16)}`);
        })
      }

    )

  }





  editarCovid(){
    this._enfermedadService.editarCovid(this.covidModel).subscribe(
      response=>{
        this.covid2=response.covidActualizado;
        console.log(response.covidActualizado);
        this.listarCovid();
        Swal.fire(
          'Realizado!',
          'Datos sobre el covid-19 actualizados'
        )
      }, error=>{
        console.log(<any>error);
      }
    )
  }
}
