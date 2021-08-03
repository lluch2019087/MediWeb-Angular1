import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Medicamentos } from '../modelos/medicamentos.model';
import { Usuario } from '../modelos/usuario.model';
import { GLOBAL } from './global.service';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {
  public url: String;
  public headersVariable = new HttpHeaders().set('Content-Type', 'application/json');
  public token: any;
  public enfermedad: any;
  public identidad: any;
  constructor(public _http: HttpClient) {
  this.url = GLOBAL.url
  }


registro(usuario: Usuario): Observable<any>{
  let params = JSON.stringify(usuario);
  return this._http.post(this.url + "registrarUsuario", params, {headers: this.headersVariable})
}

ObtenerUsuarios(): Observable<any>{
  //let headersToken = this.headersVariable.set("Authorization", this.getToken());
  return this._http.get(this.url + "obtenerUsuarios", {headers: this.headersVariable})
}

login(usuario: any, getToken:any ): Observable<any>{
  if(getToken != null){
    usuario.getToken = getToken;
  }
  let params = JSON.stringify(usuario);
  return this._http.post(this.url + "login", params , {headers: this.headersVariable});
}

editarUsuario(usuario: Usuario): Observable<any>{
  let params = JSON.stringify(usuario);
  let headersToken = this.headersVariable.set('Authorization', this.getToken())
  return this._http.put(this.url + "editarUsuario/" + usuario._id, params , {headers: headersToken})
}
eliminarUsuario(id: String): Observable<any>{
  return this._http.delete(this.url +"eliminarUsuario/" + id, {headers: this.headersVariable})
}

obtenerUsuario(id: String): Observable<any>{
  return this._http.get(this.url +"obtenerUsuarioID/" + id, {headers: this.headersVariable})
}
verCuenta() : Observable<any>{
  let headersToken = this.headersVariable.set('Authorization', this.getToken());
  return this._http.get(this.url + 'verCuenta', {headers: headersToken});
 }
 //************************************************************************************************* */
 registrarDoctor(usuario: Usuario, token: any): Observable<any>{
  let params = JSON.stringify(usuario);
  let headersToken = this.headersVariable.set("Authorization", token);
  return this._http.post(this.url + "registrarDoctor", params, {headers: headersToken})
}
ObtenerDoctores(): Observable<any>{
  return this._http.get(this.url + "obtenerDoctores", {headers:  this.headersVariable})
}
editarDoctor(usuario: Usuario): Observable<any>{
  let params = JSON.stringify(usuario);
  let headersToken = this.headersVariable.set("Authorization", this.getToken());
  return this._http.put(this.url + "editarDoctor/" + usuario._id, params , {headers: headersToken})
}
eliminarDoctor(id: String): Observable<any>{
  let headersToken = this.headersVariable.set("Authorization", this.getToken());
  return this._http.delete(this.url +"eliminarDoctor/" + id, {headers: headersToken})
}

obtenerDoctor(id: String): Observable<any>{
  return this._http.get(this.url +"obtenerDoctor/" + id, {headers: this.headersVariable})
}

getIdentidad(){
  var identidad2 = JSON.parse(localStorage.getItem("identidad") ||"{}");
  if(identidad2 != "undefined"){
    this.identidad = identidad2;
  }else {
    this.identidad = null;
  }
  return this.identidad;
}
getToken(){
  var token2 = localStorage.getItem("token");
  if(token2 != "undefined"){
    this.token = token2;
  }else{
    this.token = null;
  }
  return this.token;
}

//************************************************************************************************* */

registrarEnfermedad(enfermedad: any): Observable<any>{
  let params = JSON.stringify(enfermedad);
  let headersToken = this.headersVariable.set("Authorization", this.getToken());

  return this._http.post(this.url+"registrarEnfermedad",params, {headers: headersToken});

}

obtenerEnfermedades(): Observable<any>{
  let headersToken = this.headersVariable.set("Authorization", this.getToken());
  return this._http.get(this.url+"obtenerEnfermedades", {headers: headersToken});

}

eliminarEnfermedad(id: String): Observable<any>{
  let headersToken = this.headersVariable.set("Authorization", this.getToken());

  return this._http.delete(this.url+"eliminarEnfermedad/"+id,{headers: headersToken});
}

editarEnfermedad(enfermedad: any): Observable<any>{
  let params = JSON.stringify(enfermedad);
  let headersToken = this.headersVariable.set("Authorization", this.getToken());

  return this._http.put(this.url+"editarEnfermedad/"+ enfermedad._id, params, {headers: headersToken});
}

obtenerEnfermedad(nombre: any): Observable<any>{

  let params = JSON.stringify(nombre);

  return this._http.post(this.url+'obtenerEnfermedad', params, {headers: this.headersVariable});
}

obtenerEnfermedadID(id: String): Observable<any>{
  let headersToken = this.headersVariable.set("Authorization", this.getToken());
  return this._http.get(this.url+"obtenerEnfermedadID/"+id, {headers: headersToken});
}





//************************************************************************************************* */

crearPregunta(pregunta: any):Observable<any>{
  let params = JSON.stringify(pregunta);
  let headersToken = this.headersVariable.set("Authorization", this.getToken());

  return this._http.post(this.url+'crearPregunta', params, {headers: headersToken});

}

listarPreguntas():Observable<any>{

  return this._http.get(this.url+'listarPreguntas',{headers: this.headersVariable});
}

listarPreguntasUsuario():Observable<any>{
  let headersToken = this.headersVariable.set("Authorization", this.getToken());
  return this._http.get(this.url+'listarPreguntasUsuario',{headers: headersToken});
}

eliminarPregunta(id: String):Observable<any>{
  let headersToken = this.headersVariable.set("Authorization", this.getToken());
  return this._http.delete(this.url+'eliminarPregunta/'+id,{headers: headersToken});
}



//************************************************************************************************************** */

registrarMedicamento(medicamentos: Medicamentos, token: any): Observable<any>{
  let params = JSON.stringify(medicamentos);
  let headersToken = this.headersVariable.set("Authorization", token);
  return this._http.post(this.url + "registrarMedicamento", params , {headers: headersToken})
}
agregarComentarioDoc(comentarioModel: any):Observable<any>{
  let params = JSON.stringify(comentarioModel);
  let headersToken = this.headersVariable.set("Authorization", this.getToken());

  return this._http.post(this.url+'agregarComentarioDoc', params, {headers: headersToken});

}

editarPregunta(pregunta: any, id: String): Observable<any>{
  let params = JSON.stringify(pregunta);
  let headersToken = this.headersVariable.set("Authorization", this.getToken());

  return this._http.put(this.url+'editarPregunta/'+id,params, {headers: headersToken});
}

listarComentarios(id: String): Observable<any>{

  return this._http.get(this.url+'listarComentarios/'+id, {headers: this.headersVariable});
}


obtenerMedicamentos(medicamento: any): Observable<any>{
  let params = JSON.stringify(medicamento);

  return this._http.post(this.url + "obtenerMedicamentos", params, {headers: this.headersVariable});

}
buscarEnfermedad(nombre: any):Observable<any>{
let params = JSON.stringify(nombre);

  return this._http.post(this.url+'buscarEnfermedad/', params, {headers: this.headersVariable});

}
obtenerMedi(id: String, token: any): Observable<any>{
  let headersToken = this.headersVariable.set("Authorization", token);
  return this._http.get(this.url +"obtenerMedi/" + id, {headers: headersToken})
}
getEnfermedad(){
  var enfermedad2 = JSON.parse(localStorage.getItem("nombreSeleccionado"));
  if(enfermedad2 != "undefined"){
    this.enfermedad = enfermedad2;
  }else {
    this.enfermedad = null;
  }
  return this.enfermedad;
}


//************************************************************************* */

editarCovid(covid: any): Observable<any>{
  let params = JSON.stringify(covid);

  return this._http.put(this.url+"editarCovid", params, {headers: this.headersVariable});
}

listarCovid(): Observable<any>{

  return this._http.get(this.url+"listarCovid", {headers: this.headersVariable});

}
}
