import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/modelos/usuario.model';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss'],
  providers: [UsuarioService]

})
export class DoctorComponent implements OnInit {
  public usuariosLista: any;
  public idUSuario =  ''
  public modeloUsuario: Usuario;
  public token: string;
  constructor(
    private _usuarioService: UsuarioService,
    //private _router: Router
    )
    {
    this.token = this._usuarioService.getToken();
    this.modeloUsuario = new Usuario("","","","","");
   }

  ngOnInit(): void {
    this.ObtenerDoctores();
  }
  registrarDoctor(){
    this._usuarioService.registrarDoctor(this.modeloUsuario, this.token).subscribe(
      response=> {
        console.log(response)
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Doctor registrado correctamente',
          showConfirmButton: false,
          timer: 1500
        })
        this.ObtenerDoctores();

        //this._router.navigate(["/login"]);
      },
      error=>{
        console.log(<any>error);

        Swal.fire({
          icon: 'error',
          title: 'Error...',
          text: 'Ups, Error al registrar',
        })
      }
    )
  }
  ObtenerDoctores(){
    this._usuarioService.ObtenerDoctores().subscribe(
      response => {

         this.usuariosLista = response.usuarios_registrados
         console.log(response.usuarios_registrados);
      },
      error => {
        console.log(<any>error);
      })
  }

  obtenerDoctor(idUSuario: any){
    this._usuarioService.obtenerDoctor(idUSuario).subscribe(
      response => {
        this.modeloUsuario = response.usuario_registrado
        console.log(response.usuario_registrado);
    })

  }
   editarDoctor(){
     this._usuarioService.editarDoctor(this.modeloUsuario  ).subscribe(
      response => {
      console.log(response);
      this.ObtenerDoctores();

     })
   }
   eliminarDoctor(id: any){
    this._usuarioService.eliminarDoctor(id).subscribe(
      response => {
        console.log(response)
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Haz eliminado al Doctor correctamente',
          showConfirmButton: false,
          timer: 1500
        })
        this.ObtenerDoctores();
      }
    )

   }

}
