import { Component, OnInit } from '@angular/core';
import { Medicamentos } from 'src/app/modelos/medicamentos.model';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-medicamentos',
  templateUrl: './medicamentos.component.html',
  styleUrls: ['./medicamentos.component.scss'],
  providers: [UsuarioService]
})
export class MedicamentosComponent implements OnInit {
  public modeloMedicamentos: Medicamentos;
  public token: String;
  public medicamento: any;
  constructor(
    private _usuarioService: UsuarioService
  ) {this.token = this._usuarioService.getToken();
    this.modeloMedicamentos = new Medicamentos("","","",""); }

  ngOnInit(): void {
    this.obtenerEnfermedades()
  }


  obtenerEnfermedades(){
    this._usuarioService.obtenerEnfermedades().subscribe(
      response => {
        this.medicamento = response.enfermedadEncontrada;
        console.log(response)

      }, error => {
        console.log(<any>error)
      }
    )
  }


  registrarMedicamento(){
    this._usuarioService.registrarMedicamento(this.modeloMedicamentos, this.token).subscribe(
      response=> {
        console.log(response)
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Medicamento agregado correctamente',
          showConfirmButton: false,
          timer: 1500
        })
        //this._router.navigate(["/login"]);
      },
      error=>{
        console.log(<any>error);
        Swal.fire({
          title: 'Esta habitacion ya existe',
          width: 600,
          padding: '3em',
          background: '#fff url(/images/trees.png)',
          backdrop: `
            rgba(0,0,123,0.4)
            url("/images/nyan-cat.gif")
            left top
            no-repeat
          `
        })
      }
    )
  }


}
