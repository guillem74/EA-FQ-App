import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';


import { Api } from '../api/api';

@Injectable()
export class User {
  _user: any;

  constructor(public api: Api) { }

  /**
   * Send a POST request to our login endpoint with the data
   * the user entered on the form.
   */
  addto(idsub:any, idstu:any) {
    let body={"students": idstu};
    let seq = this.api.post(`subject/student/${idsub}`, body).share();
  console.log(seq);
    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.status == 'success') {
        console.log("ok");
      }
    }, err => {
      console.error('ERROR', err);
    });
    return seq;

  }

  delto(idsub:any, idstu:any) {
    let seq = this.api.delete(`subject/student/${idsub}/${idstu}`).share();
    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.status == 'success') {
        console.log("ok");
      }
    }, err => {
      console.error('ERROR', err);
    });
    return seq;

  }

  login(accountInfo: any) {
    let seq = this.api.post('users/login', accountInfo).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.status == 'success') {
        this._loggedIn(res);
      } else {
      }
    }, err => {
      console.error('ERROR', err);
    });
    return seq;
  }

  /**
   * Send a POST request to our signup endpoint with the data
   * the user entered on the form.
   */
  signup(accountInfo: any) {
    let seq = this.api.post('users/register', accountInfo).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.code == 'success') {
        this._loggedIn(res);
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }

  update(accountInfo:any, user:any){
    let userId=user._id;
    let seq = this.api.post(`users/update/`+userId, accountInfo).share();

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

  deleteuser(user:any){
    let userId=user._id;
    let seq = this.api.delete(`users/delete/`+userId).share();

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
  /**
   * Log the user out, which forgets the session
   */
  logout() {
    this._user = null;
  }

  /**
   * Process a login/signup response to store user data
   */
  _loggedIn(resp) {
    this._user = resp.user;
  }
}
