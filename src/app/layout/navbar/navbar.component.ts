import { Component, OnInit } from '@angular/core';
import { SmartContractService } from 'src/app/_core/services/backend/smart-contract.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private smart: SmartContractService) { }

  ngOnInit(): void {
  }

  connect(){
    const res = this.smart.connectToMetamask();
    res.subscribe((res)=>{
      console.log(res);
      
    },err=>{
      console.log(err);
      
    })
    
  }

  add(){
    const res = this.smart.addFile("44","ok eissa besafe it is");
    res.subscribe((res)=>{
      console.log(res);
      
    },err=>{
      console.log(err);
      
    })
  }
  
  get(){
    const res = this.smart.getFile("56");
    res.subscribe((res)=>{
      console.log(res);
      
    },err=>{
      console.log(err);
      
    })
  }
}
