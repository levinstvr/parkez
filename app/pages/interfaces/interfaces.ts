
export interface IAnimalitos{
    id:Number;
    nombre:String;
    tipoMascota: String;
    raza: String;

}


export interface IAnimalito{
    nombre:String;
    tipoMascota: String;
    raza: String;
}

//get, put, delete
export interface Users{
    id:number;
    username: string;
    password: string;
    role: string;
    isactive: boolean;
    email:string;
    profesorData?: profesorData;
    alumnoData?: alumnoData;
}
//post
export interface User{
    username: string;
    password: string;
    role: string;
    isactive: boolean;
    email:string;
    profesorData?: profesorData;
    alumnoData?: alumnoData;
    
}
export interface profesorData {
    seccion: string;
    sede:string;
    rut:string;
  }
  export interface alumnoData{
    rut: string;
  }



//get, put, delete
export interface IPalabras{
    id:number;
    username: string;
    palabra: string;
}

//post
export interface IPalabra{
    username: string;
    palabra: string;
}