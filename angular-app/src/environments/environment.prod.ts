import {HttpHeaders} from "@angular/common/http";

export const environment = {
  httpOptions: {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  },
  baseURL: 'http://hugofpaiva.pythonanywhere.com/ws/',
  production: true
};
