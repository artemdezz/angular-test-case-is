import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { InputSquare } from "./models/input-square";

@Injectable({
    providedIn:'root'
})
export class MagicsquareService{

    // urlServer:string = "http://localhost:8080/"
    urlServer:string = "https://test-case-is.herokuapp.com/";
    

    constructor(private http: HttpClient){
    }

    public postCalculateSquare(values: number[]): Observable<any>{
        return this.http.post<any>(this.urlServer+'magicsquare/calculate', values, {observe: 'response' as 'body'});
    }

    public postSaveInputSquare(values: number[]) {
        return this.http.post(this.urlServer+'magicsquare/save', values, {observe: 'response' as 'body'});
    }

    public getInputSquares(): Observable<InputSquare[]>{
    return this.http.get<InputSquare[]>(this.urlServer+'magicsquare/load');
    }
}