import { Component,OnInit } from '@angular/core';
import { from,fromEvent, interval ,Subscription, timer} from 'rxjs';
import {map, take, takeLast, takeUntil} from 'rxjs/operators'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  sub:Subscription;
  arr=[
    {name:"Nitesh",age:33},
    {name:"Sane",age:34},
    {name:"Mark",age:23},
    {name:"Andrew",age:43},
    {name:"Samana",age:23},
    {name:"Paul",age:34},
    {name:"Henry",age:45}
  ]
  ngOnInit() {
    const intervalNumber = interval(1000);
    const clicks = fromEvent(document, 'click');

   this.sub =  intervalNumber.pipe(
    map(a => a*2),
   take(6)
   ).subscribe(x =>{
     
     this.addStream(x,'container1');
   }
     );
     this.sub =  intervalNumber.pipe(
      map(a => a*2),
     takeUntil(clicks)
     ).subscribe(x =>{
       
       this.addStream(x,'container3');
     }
       );
       
 from(this.arr).pipe(
   map(a=>a.name),
   takeLast(2)
 ).subscribe(result=>  this.addStream(result,'container2'))
  }
  addStream(value,id){
    let el = document.createElement("li");
    el.classList.add("list-group-item");
    el.innerText = value;
    document.getElementById(id).appendChild(el)
}
}
