import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { InputArrays } from "./models/Input-arrays";
import { InputSquare } from "./models/input-square";
// import { InputSquare } from "./models/account";

@Injectable({
    providedIn:'root'
})
export class SubstringService{

    // urlServer:string = "http://localhost:8080/"
    urlServer:string = "https://test-case-is.herokuapp.com/";

    constructor(private http: HttpClient){
    }

    public postCalculateSubstring(values: string[]): Observable<any>{
        return this.http.post<any>(this.urlServer+'substring/calculate', values, {observe: 'response' as 'body'});
    }

    public postSaveInputArrays(values: string[]) {
        return this.http.post(this.urlServer+'substring/save', values, {observe: 'response' as 'body'});
    }

    public getInputArrays(): Observable<InputArrays[]>{
        return this.http.get<InputArrays[]>(this.urlServer+'substring/load');
    }
}