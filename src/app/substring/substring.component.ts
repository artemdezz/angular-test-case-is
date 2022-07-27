import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as saveAs from 'file-saver';
import { InputArrays } from 'src/services/models/Input-arrays';
import { SubstringService } from 'src/services/substring.service';

@Component({
  selector: 'app-substring',
  templateUrl: './substring.component.html',
  styleUrls: ['./substring.component.css']
})
export class SubstringComponent implements OnInit {

  constructor(private http: HttpClient, private substringSerivce: SubstringService) { }
  ngOnInit(): void {}

  stringArrays: string[] = ["",""];
  showResponse = false;
  serverResponse:string;
  inputArrays:InputArrays[];

  calculate(){
    this.substringSerivce.postCalculateSubstring(this.stringArrays)
    .subscribe((body: any) => {
      this.serverResponse = body.body;
      this.showResponse = true;
    },
    errors => {
      this.serverResponse = errors.error.errors;
      this.showResponse = true;
    });
  }

  saveInputArrays(){
    this.substringSerivce.postSaveInputArrays(this.stringArrays)
    .subscribe((body: any) => {
    },
    errors => {
      if(errors.status == 200){
        this.serverResponse = errors.error.text;
      } else {
        this.serverResponse = errors.error.errors;
      }
      this.showResponse = true;
    });
  }

  loadInputArrays(){
    this.substringSerivce.getInputArrays()
    .subscribe((body: any) => {
      this.inputArrays = body;
    },
    errors => {
    });
  }

  selectInputArrays(inputArrays:InputArrays){
    this.stringArrays[0] = inputArrays.a1;
    this.stringArrays[1] = inputArrays.a2;
  }

  saveInputArraysToFile(){
    var blob = new Blob(["Input Arrays for calculation substring.\n"
                          +"a1: "+this.stringArrays[0]+"\n"
                          +"a2: "+this.stringArrays[1]],
    { type: "text/plain;charset=utf-8" });
    saveAs(blob, "input_arrays.txt");
  }

  file:any;
  uploadFileWithInputArrays(e: any){
    this.file = e.target.files[0];
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      let txt: string = fileReader.result as string;
      let lines = txt.split("\n")
      for(let i = 0; i < lines.length; i++){
        if(lines[i].includes("a1: ")){
          this.stringArrays[0] = lines[i].slice(4)
        }
        if(lines[i].includes("a2: ")){
          this.stringArrays[1] = lines[i].slice(4)
        }
      }
    }
    fileReader.readAsText(this.file);
  }
}
