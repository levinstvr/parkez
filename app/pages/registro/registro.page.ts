import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { AuthService } from 'src/app/servicios/auth.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { User,profesorData,alumnoData } from '../interfaces/interfaces';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  registroForm: FormGroup;

  userdata: any;

  usuario : User={
    username:'',
    password:'',
    role:'',
    isactive:false,
    email:'',
    profesorData: {} as profesorData,
    alumnoData: {} as alumnoData

  }
  constructor(private authservice: AuthService, 
              private alertcontroller: AlertController,
              private router: Router,
              private fBuilder: FormBuilder) {
                this.registroForm = this.fBuilder.group({ 
                  'username' : new FormControl ("", [Validators.required, Validators.minLength(3)]),
                  'password': new FormControl("", [Validators.required, Validators.minLength(3)]),
                  'rol': new FormControl("", Validators.required),
                  'email': new FormControl(""),
                  'profesorData': this.fBuilder.group({
                    'seccion': [''],
                    'sede': [''],
                    'fecha': ['']
                  }),
                  'alumnoData': this.fBuilder.group({
                    'rut': ['']
                  })

                })
               }

  ngOnInit() {
  }

  registrarUsuario(){
    if (this.registroForm.valid){
      //implementar que el usuario no se repita, en caso que ya existe enviar un mensaje
      this.authservice.BuscarUsuarioId(this.registroForm.value.username).subscribe(resp=>{
        this.userdata = resp; 
        if(this.userdata.length>0){
           this.registroForm.reset();
          this.errorDuplicidad();
        }
        else{
          const profesorData = this.registroForm.value.profesorData;
          const alumnoData = this.registroForm.value.alumnoData;
          
          this.usuario.username = this.registroForm.value.username;
          this.usuario.password = this.registroForm.value.password;
          this.usuario.role = this.registroForm.value.rol;
          this.usuario.isactive=true;
          this.usuario.email = this.registroForm.value.email;
          this.usuario.profesorData = profesorData;
          this.usuario.alumnoData = alumnoData;


          this.authservice.CrearUsuario(this.usuario).subscribe();
          this.registroForm.reset();
          this.mostrarMensaje();
          this.router.navigateByUrl('/login');
        }
      })
    }
  }

  async mostrarMensaje(){
    const alerta = await this.alertcontroller.create({
      header: 'Usuario creado',
      message: 'Bienvenid@! ' + this.usuario.username,
      buttons: ['OK']
    });
    alerta.present();
  }

  async errorDuplicidad(){
    const alerta = await this.alertcontroller.create({
      header: 'Error..',
      message: 'Usted '+ this.usuario.username + ' ya esta registrado:D',
      buttons: ['OK']
    });
    alerta.present();
  }


}
