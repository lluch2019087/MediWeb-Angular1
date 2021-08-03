import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Router } from '@angular/router';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-enfermedades',
  templateUrl: './enfermedades.component.html',
  styleUrls: ['./enfermedades.component.scss'],
  providers: [UsuarioService]
})
export class EnfermedadesComponent implements OnInit {
  public enfermedades: any;
  public nombreBuscar: any = {nombre: ''};
  public ligaSeleccionado: any;


  constructor(
    private _usuarioService: UsuarioService, private _router: Router
  ){
    this.downloadPDF();}
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
        const bufferX = 15;
        const bufferY = 15;
        const imgProps = (doc as any).getImageProperties(img);
        const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
        return doc;
      }).then((docResult) => {
        docResult.save(`${new Date().toISOString()}_tutorial.pdf`);
      });
    }

  ngOnInit(): void {
    this.obtenerEnfermedades();
  }

  obtenerEnfermedades(){

    this._usuarioService.obtenerEnfermedades().subscribe(
      response=>{
        this.enfermedades=response.enfermedadEncontrada;
        console.log(response.enfermedadEncontrada)
      },error=>{
        console.log(<any>error)
      }
    )}

    buscarEnfermedad(nombre: any){
      this.nombreBuscar.nombre=nombre;
      this._usuarioService.buscarEnfermedad(this.nombreBuscar).subscribe(
        response=>{
          console.log(response);
          this.ligaSeleccionado=response.enfermedadEncontrada;
          localStorage.setItem("nombreSeleccionado",JSON.stringify(this.ligaSeleccionado));
          this._router.navigate(['/listamedicamentos']);
        },
        error=>{
          console.log(<any>error);


        }
      )
    }

  }


