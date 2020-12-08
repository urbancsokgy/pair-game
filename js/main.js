const arrIndex=[0,1, 2, 3, 4, 5, 6, 7, 8, 9];
const cards1=['cat','puppy','frog','bird','monkey','cat','puppy','frog','bird','monkey'];
const cards={
'cat': './img/cat.png' ,
'puppy': './img/puppy.png' ,
'frog': './img/frog.jpg' ,
'bird': './img/bird.png' ,
'monkey': './img/monkey.jpg' ,
'cat': './img/cat.png' ,
'puppy': './img/puppy.png' ,
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
const cardsOnPage=document.querySelectorAll('.card img');
cardsOnPage.forEach(element => {    
        element.addEventListener('click', eventHandler,true )
});
//#endregion 

//#region 
function eventHandler(){
    console.log(this);
    //this.removeEventListener('click', eventHandler,true )
    if(clockStart==0){ clock(0); clockStart++;}
    if (counter==0){
        firstClick=this;
        name1=this.dataset.name;
        this.src=`${cards[name1]}`;
       counter++;
    }else if(firstClick!=this){    
        secondClick=this;    
        name2=this.dataset.name;
        this.src=`${cards[name2]}`;
    counter=0;
    evaluation(name1,name2,firstClick,secondClick,this);
  
    } 
}
//#endregion 
//#region értékelés az 1. és 2. kattintás elementjéval és a kártyák nevével
let blockClikcs=false;
function evaluation(name1,name2,firstClick,secondClick,event){
    if(blockClikcs){return}
    console.log('értékelés',name1,name2,firstClick,secondClick);
if(name1!=name2 ){
    let blockClikcs=false;
    const to=setTimeout(()=>{
        clearTimeout(to);
        blockClikcs=false;
        firstClick.src="./img/back.png";
        secondClick.src="./img/back.png";},1000)
}
    // ha 
    if(name1==name2&& !(firstClick===secondClick)){
        pairs++;
        firstClick.removeEventListener('click', eventHandler,true );
        secondClick.removeEventListener('click', eventHandler,true );
    }
    (firstClick===secondClick)?console.log('true'):console.log('false');
  
    (pairs==cards1.length/2)?cardArea.innerHTML+=' <div class="won"><h1>you won</h1></div> ':'';
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
