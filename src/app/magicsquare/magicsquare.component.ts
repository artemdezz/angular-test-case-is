import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MagicsquareService } from 'src/services/magicsquare.service';
import { InputSquare } from 'src/services/models/input-square';
import { saveAs } from 'file-saver';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-magicsquare',
  templateUrl: './magicsquare.component.html',
  styleUrls: ['./magicsquare.component.css']
})
export class MagicsquareComponent implements OnInit {

  constructor(private http: HttpClient, private magicsquareService: MagicsquareService) { }
  ngOnInit(): void {}

  title: number = 5;
  values: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  showResult = false;
  showError = false;
  magicSquareValues: number[] = []; 
  serverResponse:string;
  inputSquares:InputSquare[];
  inputArrays:number[][];

  calculate(){
    this.magicsquareService.postCalculateSquare(this.values)
      .subscribe((body: any) => {
        this.magicSquareValues = body.body;
        this.showResult = true;
        this.showError = false;
      },
      errors => {
        this.serverResponse = errors.error.errors;
        this.showResult = false;
        this.showError = true;
      });
  }

  saveInputSqaure(){
    this.magicsquareService.postSaveInputSquare(this.values)
      .subscribe((body: any) => {
        this.showResult = false;
        this.showError = false;
      },
      errors => {
        if(errors.status == 200){
          this.serverResponse = errors.error.text;
        } else {
          this.serverResponse = errors.error.errors;
        }
        this.showResult = false;
        this.showError = true;
      });
  }

  loadInputSqaure(){
    this.magicsquareService.getInputSquares()
      .subscribe((body: any) => {
        this.inputSquares = body;
        this.inputArrays = body
        .map((a: { inputArray: any; }) => a.inputArray)
        .map((b: string) => Array.from(b.split(","), Number));
      },
      errors => {
      });
  }

  selectInputSquare(sqaure:number[]){
    this.values = sqaure.slice();
  }

  saveInputSqaureToFile(){
    var blob = new Blob(["Input Square for calculation magic sqaure.\n"+"square: "+this.values],
    { type: "text/plain;charset=utf-8" });
    saveAs(blob, "input_sqaure.txt");
  }

  file:any;
  uploadFileWithInputSquare(e: any){
    this.file = e.target.files[0];
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      let txt: string = fileReader.result as string;
      let lines = txt.split("\n")
      for(let i = 0; i < lines.length; i++){
        if(lines[i].includes("square: ")){
          this.values = Array.from(lines[i].slice(8).split(","), Number)
          break;
        }
      }
    }
    fileReader.readAsText(this.file);
  }
}
