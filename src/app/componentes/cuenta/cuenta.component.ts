import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/modelos/usuario.model';
import { GLOBAL } from 'src/app/servicios/global.service';
import { ImagenService } from 'src/app/servicios/imagen.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import Swal from "sweetalert2"

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.scss'],
  providers: [UsuarioService, ImagenService]
})
export class CuentaComponent implements OnInit {
  public token: any;
  public url: any;
  public usuarios: any;
  public idUsuarioModel: Usuario;
  public identidad;
  public id = "";
  public preguntas: any;
  constructor(
    public _usuarioService: UsuarioService, public _imagenService: ImagenService,
    private _router: Router) {
    this.identidad = this._usuarioService.getIdentidad();
    this.idUsuarioModel = new Usuario("","","","","");
    this.token = _usuarioService.getToken();
    this.url = GLOBAL.url;
   }


  ngOnInit(): void {
    this.listarPreguntasUsuario();
    this.obtenerCuenta();
  }

  subirImagen(){
    this._imagenService.subirImagen(this.url + 'subirImagen', [], this.imagenASubir, this.token,
    'imagen').then((resultado: any) => {
      console.log(resultado);
      this.identidad.imagen = resultado.usuarioEncontrado.imagen;
      localStorage.setItem('identidad', JSON.stringify(this.identidad))
  })

  }
  public imagenASubir: Array<File> = [];
  inputEvento(fileInput: any){
    this.imagenASubir = <Array<File>>fileInput.target.files;
  }

  obtenerCuenta(){
    this._usuarioService.verCuenta().subscribe(
      response => {
        this.usuarios = response.usuarioEncontrado;
        console.log(response.usuarioEncontrado)
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  obtenerUsuarioId(idUsuario: any){
    this._usuarioService.obtenerUsuario(idUsuario).subscribe(
      response=>{

        this.idUsuarioModel = response.usuarioEncontrado;
        console.log(response);

      }
    )
  }

  editarUsuario(){
    this._usuarioService.editarUsuario(this.idUsuarioModel).subscribe(
      response=>{
        console.log(response);
        this.obtenerCuenta();
      },error=>{
        console.log(<any>error)
      }
    )
  }

  eliminarUsuario(idUsuario: any){
    this._usuarioService.eliminarUsuario(idUsuario).subscribe(
      response=>{
        console.log(response);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Haz eliminado tu cuenta correctamente',
          showConfirmButton: false,
          timer: 1500
        })
        this._router.navigate[('/registro')];
       localStorage.clear();
      },error=>{
        console.log(<any>error)
      }
    )

  }

  listarPreguntasUsuario(){
    this._usuarioService.listarPreguntasUsuario().subscribe(
      response=>{
        this.preguntas = response.preguntasEncontradas;
        console.log(response.preguntasEncontradas);
    },error=>{
      console.log(<any>error)
    }
    )
  }


}
