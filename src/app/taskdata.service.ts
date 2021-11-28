import { Injectable } from '@angular/core';
import {Tasks} from "./shared/tasks";

@Injectable({
  providedIn: 'root'
})
export class TaskdataService {

  data: Tasks[] = [];
  showData = false;

  setData(data: Tasks[]){
    this.data = data;
  }

  setShowData(showData:boolean){
    this.showData= showData;
  }

  getData() : Tasks[]{
    return this.data;
  }

  getShowData():boolean{
    return this.showData;
  }


}
