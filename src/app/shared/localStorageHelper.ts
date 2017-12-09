import { Injectable } from "@angular/core";

@Injectable()
export class LocalStorageHelper {
 
    constructor (){
       
    }
     saveObject(key : string, object: any) {
         
            object = JSON.stringify(object);
            
                   this.saveItem(key, object);
       
        
    }
    saveItem(key : string, value: any) {
        localStorage.setItem(key, value);
    }
    getObject(key : string){
        try{

            let object = this.getItem(key);
            if (object) {
                object = JSON.parse(object);
            }
            return object;
        }catch(e){
            localStorage.removeItem(key);
        }
        
    }
    getObject2(key : string){
        try{

            let object = this.getItem(key);
            if (object) {
                object = JSON.parse(object);
            }
            return object;
        }catch(e){
            localStorage.removeItem(key);
        }
        
    }
    getItem(key : string) {
        return localStorage.getItem(key);
    }
    removeItem(key : string) {
        localStorage.removeItem(key);
    }
}