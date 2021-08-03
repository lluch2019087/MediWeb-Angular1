import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GLOBAL } from './global.service';

@Injectable()

export class ImagenService {
  public url: any;

  constructor(){
    this.url =  GLOBAL.url
  }

  subirImagen(url: string, params: Array<string>, files: Array<File>, token: string, nombre: any){
    return new Promise(function(resolve, reject){
      var formData = new FormData();
      var XMLHttp = new XMLHttpRequest();

      for (let i = 0; i < files.length; i++){
        formData.append(nombre, files[i], files[i].name);
      }
      XMLHttp.onreadystatechange= function(){
        if(XMLHttp.readyState ==  4){
          if(XMLHttp.status == 200){
            resolve(JSON.parse(XMLHttp.response));
          }else{
            reject(XMLHttp.response);
          }
        }
      }
      XMLHttp.open('POST', url, true);
      XMLHttp.setRequestHeader('Authorization', token);
      XMLHttp.send(formData);
    })
  }
}
