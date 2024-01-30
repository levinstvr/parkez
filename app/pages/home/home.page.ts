import { Component, OnInit } from '@angular/core';
import { ApiCrudService } from 'src/app/servicios/api-crud.service';
import { LoadingController } from '@ionic/angular';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { IAnimalitos } from '../interfaces/interfaces';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-Home',
  templateUrl: './Home.page.html',
  styleUrls: ['./Home.page.scss'],
})
export class HomePage {

  animalitos:IAnimalitos[]=[];

  numero : any;

  constructor(private animalitoService: ApiCrudService,
              private loadingCtrl : LoadingController, 
              private alertcontroller: AlertController,
              private router: Router) { }

  
  ionViewWillEnter(){
    this.loadAnimalitos();
    this.numero = sessionStorage.getItem('id');
  }

  async loadAnimalitos(event?: InfiniteScrollCustomEvent){
    
    const loading = await this.loadingCtrl.create({
      message: "Cargando..",
      spinner: "bubbles"
    });
    await loading.present();


    this.animalitoService.listarAnimalitos().subscribe(
      {
        next: resp=>{
          console.log(resp);
         loading.dismiss();
          let listString = JSON.stringify(resp)
          this.animalitos=JSON.parse(listString)
          event?.target.complete();
          console.log(this.animalitos);
          
        },
        error: err =>{
          console.log(err.error.message);
         loading.dismiss();
        }
      }
    ) 
  }

  cerrarSesion(){
    sessionStorage.clear();
    this.mensajeCerrar();
    this.router.navigateByUrl('/login');
    
  }

  async mensajeCerrar(){
    const alerta = await this.alertcontroller.create({ 
      header : 'Graciaas!',
      message : 'Hasta la próxima! :D',
      buttons : ['OK']
    })
    alerta.present();
  }
 
}

