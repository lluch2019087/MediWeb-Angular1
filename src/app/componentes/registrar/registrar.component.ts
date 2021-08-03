import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/modelos/usuario.model';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.scss'],
  providers: [UsuarioService]
})
export class RegistrarComponent implements OnInit {
  public modeloUsuario: Usuario;
  constructor(
    private _usuarioService: UsuarioService,
    private _router: Router) {

    this.modeloUsuario = new Usuario("","","","","");
   }

  ngOnInit(): void {
  }
  registrar(){
    this._usuarioService.registro(this.modeloUsuario).subscribe(
      response=> {
        console.log(response)
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Usuario creado correctamente',
          showConfirmButton: false,
          timer: 1500
        })
        this._router.navigate(["/login"]);
      },
      error=>{
        console.log(<any>error);
        Swal.fire({
          icon: 'error',
          title: 'Error...',
          text: 'Ups, no se ha podido registrar',

        })
      }
    )
  }


}
