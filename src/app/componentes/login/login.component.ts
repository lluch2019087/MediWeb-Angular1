import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/modelos/usuario.model';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import Swal from "sweetalert2"
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [UsuarioService]
})
export class LoginComponent implements OnInit {
  public usuarioModel: Usuario;
  public token: any;
  public identidad: any;
  constructor(
    private _usuarioService: UsuarioService,
    private _router: Router
  ) {
    this.usuarioModel = new Usuario("","","","","");
  }

  ngOnInit(): void {
  }

  obtenerToken(){
    this._usuarioService.login(this.usuarioModel, "true").subscribe(
      response => {
        this.token = response.token;
        localStorage.setItem('token', this.token);

      },error => {
        console.log(<any>error)
      }
    )
  }
  login() {
    this._usuarioService.login(this.usuarioModel, "").subscribe(
      response =>{
        this.identidad = response.usuarioEncontrado;
        localStorage.setItem("identidad", JSON.stringify(this.identidad))
        this.obtenerToken();
        console.log(this.identidad.rol);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Haz ingresado correctamente',
          showConfirmButton: false,
          timer: 1500
        })

        if(this.identidad.rol==="ROL_USUARIO"){

          this._router.navigate(["/inicio"]);

          console.log(this.identidad.rol)

        }else if(this.identidad.rol==="ROL_ADMIN"){

          this._router.navigate(["/adminprincipal"]);

          console.log(this.identidad.rol)

        }else if(this.identidad.rol==="ROL_DOCTOR"){

          this._router.navigate(["/doctorprincipal"]);

          console.log(this.identidad.rol)
        }

 },error => {
  Swal.fire({
    icon: 'error',
    title: 'Error...',
    text: 'Ups, no haz popido acceder',

  })
        console.log(<any>error)
      }
    )
  }


      }

