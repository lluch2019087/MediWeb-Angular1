import { Component, OnInit } from '@angular/core';
import { GLOBAL } from 'src/app/servicios/global.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [UsuarioService]
})
export class NavbarComponent implements OnInit {
  public identidad;
  public url: any;
  constructor(
    public _usuarioService: UsuarioService
  ) {
    this.identidad = this._usuarioService.getIdentidad();
    this.url = GLOBAL.url;
   }


  ngOnInit(): void {
    this.identidad = this._usuarioService.getIdentidad();
    console.log(this.identidad.username)

  }

  cerrarSesion(){
    localStorage.clear();
  }

}
