import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  userdata:any;

  usuario={
    id:0,
    username:"",
    password:"",
    role:"",
    isactive: true
  }

  loginForm :FormGroup;

  constructor(private authservice: AuthService,
              private router: Router,
              private alertController: AlertController, 
              private toastController: ToastController, 
              private builder: FormBuilder){
                this.loginForm = this.builder.group({
                  'username': new FormControl("", [Validators.required, Validators.minLength(4)]),
                  'password': new FormControl("", [Validators.required, Validators.minLength(4)])
                })
              }

  ngOnInit() {
  }

   


  login(){
    if (this.loginForm.valid){
      this.authservice.GetUserById(this.loginForm.value.username).subscribe(resp=>{ 
        this.userdata=resp;
        console.log(this.userdata);
        if (this.userdata.length>0){    //si cumple la condición el objeto trae datos
          this.usuario={                //userdata llega en formato de arreglo
            id : this.userdata[0].id,
            username: this.userdata[0].username,
            password: this.userdata[0].password,
            role: this.userdata[0].role,
            isactive: this.userdata[0].isactive
          }
          if (this.usuario.password===this.loginForm.value.password)
          {
            if (this.usuario.isactive){
              //iniciamos sesión del usuario 
              sessionStorage.setItem('id', this.usuario.id.toString());
              sessionStorage.setItem('username', this.usuario.username);
              sessionStorage.setItem('userrole', this.usuario.role);
              sessionStorage.setItem('password', this.usuario.password);
              sessionStorage.setItem('activo',this.usuario.isactive.toString());
              sessionStorage.setItem('ingresado', 'true');
              

              //invocamos una alerta utilizando Toast
              this.showToast('Sesión Iniciada');
              this.loginForm.reset();
              this.router.navigateByUrl("/home");

            }
            else{     //en caso que el usuario no este activo
              this.UserInactivo();

            }
          }
          else{
            this.Error();
          }
        }
        else{     //en caso que el usuario no exista
          this.loginForm.reset();
          this.NoExiste();
        }


      })

    }

  }//login
  
async showToast(msg: any){
    const toast= await this.toastController.create({
      message:msg,
      duration: 3000
    })
    toast.present();
  }

  //usuario Inactivo
  async UserInactivo(){
    const alerta = await this.alertController.create({ 
      header : 'Usuario inactivo',
      message : 'Contactar a admin@admin.cl',
      buttons : ['OK']
    })
    alerta.present();
  }


 //Error en credenciales
async Error(){
  const alerta = await this.alertController.create({ 
    header : 'Error..',
    message : 'Revise sus credenciales',
    buttons : ['OK']
  })
  alerta.present();
}

//alerta que indica cuando el usuario no existe

async NoExiste(){
  const alerta = await this.alertController.create({ 
    header : 'No existe...',
    message : 'Debe registrarse..',
    buttons : ['OK']
  })
  alerta.present();
}





}
