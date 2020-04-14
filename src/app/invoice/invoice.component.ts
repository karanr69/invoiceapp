import { Component,ChangeDetectorRef, OnInit,Injector,Inject,PLATFORM_ID, ViewChild,ElementRef,AfterViewInit  } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Customer} from "../shared/model";
import {makeStateKey} from '@angular/platform-browser';
import { RestApiService } from "../shared/rest-api.service";

const configKey = makeStateKey("CONFIG");
declare var webkitSpeechRecognition:any;
//import {} from '@angular/core'

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit,AfterViewInit {
  currentDate = new Date();
  customers: any = [];
  products: any = [];
  itemArr:any=[];
  custDetail:Customer;
  public audioText:string;
  public activeClass:boolean=false;
  public show:boolean=false;
  public listItem:any;
  public subTotal:number;
  public totalTax:number;
  public totalFlag:boolean=false;
 
  @ViewChild('custname', {static: true}) custname: ElementRef;

  
  @ViewChild("custAddress", {static: true}) address: ElementRef;
  @ViewChild("searchbox", {static: true}) searchbox: ElementRef;


  constructor(private httpClient: HttpClient,private injector :Injector,
    @Inject(PLATFORM_ID) private plateformid:Object,private ref: ChangeDetectorRef,public restApi: RestApiService
   ,private eleref:ElementRef ) { 

   
  }

  ngOnInit() {
    this.httpClient.get("assets/data.json").subscribe(data =>{
      console.log(data);
      this.customers = data;
    });

    this.restApi.getAllprduct().subscribe((data: any) => {
     
      this.products=data;
     console.log(data);
    });
    //
  }

  fetchCustDetails(val){
    if(val.length==10){
    for(var pr in this.customers){
      if(this.customers[pr]["mobile"]==val){
        this.custDetail=this.customers[pr];
        this.custname.nativeElement.value=this.custDetail.name;
        this.address.nativeElement.value=this.custDetail.Address;

      }
    }
  }
  }

  voiceTOText(){
    this.searchbox.nativeElement.value='listining';
    this.activeClass=true;
    const refer=this;
    if("webkitSpeechRecognition" in window){

     const vSearch = new webkitSpeechRecognition();
      vSearch.continuous=false;
      vSearch.iterimresults=false;
      vSearch.lang="en-US";
      vSearch.start();
      const sercbox = this.searchbox.nativeElement;
      var ref=this.activeClass;
      vSearch.onresult = function(e){
      this.audioText = e.results[0][0].transcript;
      vSearch.stop();
      sercbox.value=this.audioText;
      //refer.activeClass=false;
      refer.voiceSearchProduct(sercbox.value);
      
       
       
      };
    }
   
  }

  voiceSearchProduct(val){
   this.activeClass=false;
   this.serachProduct(val);
   this.ref.detectChanges();
  
  }

  serachProduct(val){
  this.listItem=[];
  for(let pr in this.products){
    var str=this.products[pr].Desc.toLowerCase();
  var k=val.toLowerCase();
    if(str.indexOf(k)>-1){
      this.listItem.push(this.products[pr]);
    }

  }
  if(this.listItem.length>0)
  this.show=true;
 return this.listItem;
  }
private countInt:number=0;
  addRow(index,val){
    
    if(this.itemArr.length==0){
    for(let item in this.listItem){
      if(index==this.listItem[item].id){
        this.itemArr.push(this.listItem[item]);
        this.itemArr[this.countInt]["qty"]=this.eleref.nativeElement.querySelector(".qty-"+val).value;
        this.countInt++;
      }
    }
  }else{
    let flag:boolean=true;
    for(let pr in this.itemArr ){
      if(index==this.itemArr[pr].id){
        this.itemArr[pr]["qty"]=parseInt( this.eleref.nativeElement.querySelector(".qty-"+val).value)+ parseInt( this.itemArr[pr]["qty"]);
        flag=false;
        break;
      }
    }
    if(flag){
      
        for(let item in this.listItem){
          if(index==this.listItem[item].id){
            this.itemArr.push(this.listItem[item]);
            this.itemArr[this.countInt]["qty"]=this.eleref.nativeElement.querySelector(".qty-"+val).value;
            this.countInt++;
           break;
          }
       
        }
        
  
    }
  }
  this.totalAmount();  
  this.ref.detectChanges(); 
  }
 
  totalAmount(){
    
    this.subTotal=0;
    this.totalTax=0;
    for(let item in this.itemArr){
      this.subTotal= this.subTotal+ parseInt(this.itemArr[item].qty)*(parseInt(this.itemArr[item].Price));
      this.totalTax=this.totalTax+ this.itemArr[item].qty*(this.itemArr[item].CGST +this.itemArr[item].SGST);
    }
this.totalFlag=true
this.ref.detectChanges();
  }
  deleteRow(val){
    for(let item in this.itemArr){
      if(val==this.itemArr[item].id){
      this.itemArr.splice(item, 1);
        this.totalAmount();
        this.ref.detectChanges();
        console.log(this.itemArr);
      }
    }
    if(this.itemArr.length==0){
      this.totalFlag=false;
    }
    

  }
  hide(ev){
    console.log(ev);
    for(let pr in this.itemArr ){
      if(ev==this.itemArr[pr].id){
        this.itemArr[pr]["qty"]=parseInt( this.eleref.nativeElement.querySelector(".Qty-"+ev).innerHTML);
        this.totalAmount();
        break;
       
      }
    }

  }

  print(){
    window.print();
   /*let control_Print;

    control_Print = document.getElementById('__printingFrame');

    let doc = control_Print.contentWindow.document;
    doc.open();
    doc.write(`<div style='color:red;'>I WANT TO PRINT THIS, NOT THE CURRENT HTML{{1+2}}</div>`);
    doc.close();

    control_Print = control_Print.contentWindow;
    control_Print.focus();
    control_Print.print();*/
  }
  ngAfterViewInit(){
 
  }


}
