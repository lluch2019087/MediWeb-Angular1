import { Component, OnInit } from '@angular/core';
import { Medicamentos } from 'src/app/modelos/medicamentos.model';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-listamedicamentos',
  templateUrl: './listamedicamentos.component.html',
  styleUrls: ['./listamedicamentos.component.scss'],
  providers: [UsuarioService]
})
export class ListamedicamentosComponent implements OnInit {
  public medicamentos: any = {enfermedad: ''};
  public medicamentosEncontrado:any;
  public token: String;
  public Medimodel: Medicamentos
  public idEquipos =  ''


  constructor(public _usuarioService: UsuarioService, ) { this.token = this._usuarioService.getToken();
    this.Medimodel = new Medicamentos("","","","");}

  ngOnInit(): void {
    this.obtenerMedicamentos()

  }

  obtenerMedicamentos(){
    this.medicamentos.enfermedad = this._usuarioService.getEnfermedad()._id;
    this._usuarioService.obtenerMedicamentos(this.medicamentos).subscribe(
      response => {
        this.medicamentosEncontrado = response.medicamentosEncontrado;
          console.log(response.medicamentosEncontrado);

    })


    }
    obtenerMedi(_id: any){
      this.idEquipos=_id;
      this._usuarioService.obtenerMedi(this.idEquipos, this.token).subscribe(
        response => {
          this.Medimodel = response.Equipo_registrado
          console.log(response.Equipo_registrado);
      })
  }}
