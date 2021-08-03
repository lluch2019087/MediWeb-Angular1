import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Usuario } from 'src/app/modelos/usuario.model';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';
import html2canvas from 'html2canvas';


@Component({
  selector: 'app-listausuarios',
  templateUrl: './listausuarios.component.html',
  styleUrls: ['./listausuarios.component.scss'],
  providers: [UsuarioService]

})
export class ListausuariosComponent implements OnInit {
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
    this.downloadPDF();
  }
  public downloadPDF() {
    const DATA = document.getElementById('htmlData');
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3
    };
    html2canvas(DATA, options).then((canvas) => {
      const img = canvas.toDataURL('image/PNG');

      // Add image Canvas to PDF
      const bufferX = 0;
      const bufferY = 2;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      docResult.save(`${new Date().toISOString()}_usuarios.pdf`);
    });
  }

  ngOnInit(): void {
    this.ObtenerUsuarios();
  }
  registrarUsuario(){
    this._usuarioService.registro(this.modeloUsuario).subscribe(
      response=> {
        console.log(response)
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Usuario registrado correctamente',
          showConfirmButton: false,
          timer: 1500
        })
        this.ObtenerUsuarios();
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
  ObtenerUsuarios(){
    this._usuarioService.ObtenerUsuarios().subscribe(
      response => {

         this.usuariosLista = response.usuarioEncontrado
         console.log(response.usuarioEncontrado);
      },
      error => {
        console.log(<any>error);
      })
  }

  obtenerUsuario(idUSuario: any){
    this._usuarioService.obtenerUsuario(idUSuario).subscribe(
      response => {
        this.modeloUsuario = response.usuarioEncontrado
        console.log(response.usuarioEncontrado);
    })

  }
   editarUsuario(){
     this._usuarioService.editarUsuario(this.modeloUsuario  ).subscribe(
      response => {
      console.log(response);
      this.ObtenerUsuarios();

     })
   }
   eliminarUsuario(id: any){
    this._usuarioService.eliminarUsuario(id).subscribe(
      response => {
        console.log(response)
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Haz eliminado al Usuario correctamente',
          showConfirmButton: false,
          timer: 1500
        })
        this.ObtenerUsuarios();
      }
    )

   }

  }



