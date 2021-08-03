import { UsuarioService } from './../../servicios/usuario.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-enfermedad-encontrada',
  templateUrl: './enfermedad-encontrada.component.html',
  styleUrls: ['./enfermedad-encontrada.component.scss'],
  providers: [UsuarioService]
})
export class EnfermedadEncontradaComponent implements OnInit {
  public enfermedad: any;

  constructor(_usuarioService: UsuarioService) {
    this.enfermedad=_usuarioService.getEnfermedad();
   }

  ngOnInit(): void {
  }



}
