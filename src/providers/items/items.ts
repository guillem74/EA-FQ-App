import { Injectable } from '@angular/core';

import { Item } from '../../models/item';
import { Api } from '../api/api';

@Injectable()
export class Items {
  items: Item[] = [];

  constructor(public api: Api) { }

  query() {
    let seq =this.api.get('subject/all')
    return seq;

/*
    seq.subscribe((res: any) => {
      this.items=res;
      if (res.status == 'success') {

      } else {

      }
    }, err => {
      console.error('ERROR', err);
    });
  console.log("return")
    return this.items;*/
  }
  query2(){
    let seq2=this.api.get('student/all')
    return seq2;
  }
  deletesubject(subject:any){
    let subjectId=subject._id;
    let seq = this.api.delete(`subject/`+subjectId).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.code == 'success') {
        console.log("ok");
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }
  deletestudent(student:any){
    let studentId=student._id;
    let seq = this.api.delete(`student/`+studentId).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.code == 'success') {
        console.log("ok");
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }

  add(item: Item) {
  }

  delete(item: Item) {
  }

}
