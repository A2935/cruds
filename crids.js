let title =document.getElementById('title');
let price= document.getElementById('price');
let taxes=document.getElementById('taxes');
let ads=document.getElementById('ads');
let discount=document.getElementById('discount');
let total=document.getElementById('total');
let count=document.getElementById('count');
let category=document.getElementById('category');
let  submit=document.getElementById('submit');
let moon ='create';
let tam;

// get total
function getTotal(){
   if(price.value !=''){
      let result=(+price.value + +taxes.value + +ads.value )- +discount.value;
      total.innerHTML=result;
      total.style.background='#0fdd50';
   }else{
      total.innerHTML ='';
      total.style.background=''
   };
};
 
//creat broduct
let datapro;
if(localStorage.product !=null){
datapro=JSON.parse(localStorage.product)
}else{
   datapro=[];
}
submit.onclick=function(){
   let newPro ={
      title:title.value.toLowerCase(),
      price:price.value,
      taxes:taxes.value,
      ads:ads.value,
      discount:discount.value,
      title:title.value,
      total:total.innerHTML,
      count:count.value,  
      category:category.value.toLowerCase(),
   }  

   //count
   if(title.value !='' &&price.value!=''&&category.value!=''&&count.value<101){
if( moon === 'create'){

   if( newPro.count > 1){
      for(let x=0 ; x<newPro.count ;x++){
      datapro.push(newPro);
      }
   }else{
      datapro.push(newPro);
      }
}else{
   datapro[tam]=newPro;
   moon ='create';
   submit.innerHTML='create';
   count.style.display='block';
}
   clearData();
}
   //save localstorage
   localStorage.setItem('product' , JSON.stringify(datapro))
   readData();
}
 

//clear inputs
function clearData(){
   title.value='';
   price.value='';
   taxes.value='';
   ads.value='';
   discount.value='';
   total.innerHTML='';
   count.value='';
   category.value='';
 }

 //read
  function readData(){
   getTotal()
   let table='';
   for( let x=0; x<datapro.length; x++ ){
   table +=`<tr>
   <td>${x+1}</td>
  <td>${datapro[x].title}</td>
   <td>${datapro[x].price}</td>
   <td>${datapro[x].taxes}</td>
   <td>${datapro[x].ads}</td>
   <td>${datapro[x].discount}</td>
   <td>${datapro[x].total}</td>
   <td>${datapro[x].category}</td>
   <td> <button onclick="ubdateData(${x})" >ubdate</button></td>
   <td> <button onclick="deletData( ${x} )" >delate</button></td>
   </tr>`;
   }
   document.getElementById('tbody').innerHTML=table;
   let btnDelete=document.getElementById('deletALL');
   if(datapro.length>0){
   btnDelete.innerHTML=
 ` <button  onclick='deletALL()'>delete ALL(${datapro.length}) </button>`;
   }
   else{
   btnDelete.innerHTML='';
   }
}
readData();

//delet
function deletData(x){
   datapro.splice(x ,1);
   localStorage.product=JSON.stringify(datapro);
readData()
}

//delet all
function deletALL(){
localStorage.clear()
datapro.splice(0)
 readData();
}
//updete

function ubdateData(x){
title.value=datapro[x].title;
price.value=datapro[x].price;
taxes.value=datapro[x].taxes;
ads.value=datapro[x].ads;
discount.value=datapro[x].discount;
getTotal()
count.style.display='none';
category.value=datapro[x].category;
submit.innerHTML='update';
moon='update';
tam = x;
scroll({
   top:0,
   behavior:"smooth"
}) 
}


//search
let searchMOde='title';
 function getsearchmood(id)
 {
let search = document.getElementById('search');
if(id == 'searchTitle'){
searchMOde='title';
}else{
searchMOde='category';
}
   search.placeholder='search By ' + searchMOde;
   search.focus;
   search.value='';
   readData();
   }

function searchDta(value){
let table= '';
for(let x=0 ;x<datapro.length;x++){ 
if(searchMOde='titale'){

//قاعدة كدا اي اري فيها عنصر وانا  عايز ادور علي العنصر دا داخلها بعمل لوب علي طول 
{
   if(datapro[x].title.includes(value.toLowerCase())){
      table +=`<tr>
    <td>${x}</td>
    <td>${datapro[x].title}</td>
    <td>${datapro[x].price}</td>
    <td>${datapro[x].ads}</td>
    <td>${datapro[x].discount}</td>
    <td>${datapro[x].total}</td>
    <td>${datapro[x].category}</td>
    <td> <button onclick="ubdateData(${x})" >ubdate</button></td>
    <td> <button onclick="deletData( ${x} )" >delate</button></td>
    <td>${datapro[x].taxes}</td>
    </tr>`; 
   }
}
}
else{
   if(datapro[x].category.includes(value.toLowerCase())){
      table +=`<tr>
                <td>${x}</td>
  <td>${datapro[x].title}</td>
    <td>${datapro[x].price}</td>
    <td>${datapro[x].taxes}</td>
    <td>${datapro[x].ads}</td>
    <td>${datapro[x].total}</td>
    <td>${datapro[x].category}</td>
    <td> <button onclick="ubdateData(${x})" >ubdate</button></td>
    <td> <button onclick="deletData( ${x} )" >delate</button></td>
    <td>${datapro[x].discount}</td>
                 </tr>`; 
   }
}
}
 document.getElementById('tbody').innerHTML=table;
  }