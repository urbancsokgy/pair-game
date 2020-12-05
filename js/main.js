const arrIndex=[0,1, 2, 3, 4, 5, 6, 7, 8, 9];
const cards1=['cat','puppy','frog','bird','monkey','cat','puppy','frog','bird','monkey'];
const cards={
'cat': './img/cat.png' ,
'puppy': '../img/puppy.png' ,
'frog': './img/frog.jpg' ,
'bird': './img/bird.png' ,
'monkey': './img/monkey.jpg' ,
'cat': './img/cat.png' ,
'puppy': '../img/puppy.png' ,
'frog': './img/frog.jpg' ,
'bird': './img/bird.png' ,
'monkey': './img/monkey.jpg' ,
};
let name1, name2;
let counter=0;
let pairs=0;
let clockStart=0;
const myClock=document.querySelector('.clock');
const cardArea=document.querySelector('.cards__wrap');
//#region betöltéskor meghívott függvény
function onload(arr){
        cardArea.innerHTML='';
         let shuffled = arr.sort(() => Math.random() - 0.5);
         for (let i = 0; i < shuffled.length; i++) {
            let name=cards1[shuffled[i]];
            template(name);
        }
        pairs=0;
    }
   //#region A kártyák feltöltése
    function template(name){
   templateString= `<div class="card" ><img src="./img/back.png" data-name='${name}' alt="${name}"></div>`
   cardArea.innerHTML+=templateString;
}
    //#endregion
//#region betöltéskor....
document.body.onload=onload(arrIndex);
//#endregion 
//#region Eseményfigyelők hozzáadása
const cardsOnPage=document.querySelectorAll('.card');
cardsOnPage.forEach(element => {    
        element.addEventListener('click', event=>{
         e=event.target;  eventHandler(e);  })
});
//#endregion 

//#region 
function eventHandler(event){
    console.log(event);
    if(clockStart==0){ clock(0); clockStart++;}
    if (counter==0){
        firstClick=event;
        name1=event.dataset.name;
        event.src=`${cards[name1]}`;
       counter++;
    }else{    
        secondClick=event;    
        name2=event.dataset.name;
        event.src=`${cards[name2]}`;
    counter=0;
    evaluation(name1,name2,firstClick,secondClick);
}    
}
//#endregion 
//#region értékelés az 1. és 2. kattintás elementjéval és a kártyák nevével
function evaluation(name1,name2,firstClick,secondClick){
    console.log('értékelés',name1,name2,firstClick,secondClick);
if(name1!=name2){
    setTimeout(()=>{
        firstClick.src="./img/back.png";
        secondClick.src="./img/back.png";},1000)
}
    (name1==name2)?pairs++:'';
    (pairs==cards1.length/2)?setTimeout(()=>{location.reload(); },5000):'';
}
//#endregion
//#region Stopper
let clock=(counter)=>{
    counter+=1;   
    if(pairs==cards1.length/2){
        clockStart=0;
        return  counter=0};

    let seconds=counter% 60;
    let minutes=Math.floor(counter/60);
    (minutes<10)? minutes='0'+minutes:'';
    (seconds<10)? seconds='0'+seconds:'';
    myClock.textContent=` ${minutes} : ${seconds}`;
    setTimeout(()=>{clock(counter)},1000);
    }
    

    
//#endregion
//#region 
//#region 
//#endregion
//#endregion
