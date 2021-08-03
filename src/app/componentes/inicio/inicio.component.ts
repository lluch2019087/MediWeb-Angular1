import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
  providers: [UsuarioService]
})
export class InicioComponent implements OnInit {
  public nombreBuscar: any = {nombre: ''};
  public nombreSeleccionado: any;

  constructor(public _usuarioService: UsuarioService, private _router: Router) { }

  ngOnInit(): void {

  }
  buscarEnfermedadNombre(){

    this._usuarioService.obtenerEnfermedad(this.nombreBuscar).subscribe(
      response=>{
        console.log(response);
        this.nombreSeleccionado=response.enfermedadEncontrada;
        localStorage.setItem("nombreSeleccionado",JSON.stringify(this.nombreSeleccionado));
        this._router.navigate(['/enfermedadEncontrada']);
      },
      error=>{
        console.log(<any>error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No se ha encontrado la enfermedad'
        })

      }
    )
  }


}
