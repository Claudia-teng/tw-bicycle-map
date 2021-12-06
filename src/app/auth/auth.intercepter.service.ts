import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jsSHA from "jssha";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    var AppID = '418064bd570a448baebfc9fb3f21b036';
    var AppKey = '_v8KHxSLcMmxjQSjnOBbgrO1dx4';
    var date = new Date();
    var GMPString = date['toGMTString']();
    var ShaObj = new jsSHA('SHA-1', 'TEXT');
    ShaObj.setHMACKey(AppKey, 'TEXT');
    ShaObj.update('x-date: ' + GMPString);
    var HMAC = ShaObj.getHMAC('B64');
    var Authorization = 'hmac username=\"' + AppID + '\", algorithm=\"hmac-sha1\", headers=\"x-date\", signature=\"' + HMAC + '\"';

    const modifiedRequest = req.clone({
      headers: req.headers
        .set('Authorization', Authorization)
        .set('X-Date', GMPString)
    });

    return next.handle(modifiedRequest);
  }
}