const next_bols=document.querySelector(".next_bols");
const high_score=document.querySelector("#high_score");
const your_scor=document.querySelector("#your_scor");
const game_bord=document.querySelector(".game_bord");
const cube_next=document.querySelectorAll(".cube_next")
let cube;
let boll;
let colors=["blue","green","red","ligth_blue","darck_orange","violet"];
let nexts=[];
let rands=[];
let gts=localStorage.getItem("score");
high_score.innerHTML=gts;
gameBord()
addNextBolsCube()
function addNextBolsCube(){
	 cube_next.forEach(function(item,index){
		 boll=document.createElement("div");
		 boll.className="boll";
			item.appendChild(boll)
		  let rand=(Math.floor(Math.random()*100));
			 if(rand<=15){
				boll.classList.add(colors[0])
				 nexts.push(boll)
			 }else if(rand>15 && rand<=30){
					  boll.classList.add(colors[1])
				          nexts.push(boll)
					  }else if(rand>30 && rand<=45){
						 boll.classList.add(colors[2])
						  nexts.push(boll)
					  }else if(rand>45 && rand<=60){
						 boll.classList.add(colors[3])
						  nexts.push(boll)
					  }else if(rand>60 && rand<=75){
						 boll.classList.add(colors[4])
						  nexts.push(boll)
					  }else{
						 boll.classList.add(colors[5])
						  nexts.push(boll)
					  }
		 checkInLines();
		 item.addEventListener("click",addBolsInBord);
	 })
}
function gameBord(){
	for(let i=1;i<=81;i++){
		cube=document.createElement('div')
		 cube.className=`cube ${i}`;
		 game_bord.appendChild(cube);
		rands.push(i);
	}
}
function addBolsInBord(){
	//let boll=document.querySelector('.boll')
	for(let i=0;i<nexts.length;i++){
		let rand=Math.ceil(Math.random()*81);
		let inc=rands.includes(rand);
		let iof=rands.indexOf(rand);
		if(!inc){
			rand=rands[0]
			inc=rands.includes(rand);
			iof=rands.indexOf(rand);
			rands.splice(iof, 1);
		}else{
			rands.splice(iof, 1);
		}	
		[...game_bord.children].forEach(function(item,index){
					if(inc && rand===index+1 && !item.contains(boll) && item.firstChild===null){	
				nexts[i].classList.add(`${rand}`);
				item.appendChild(nexts[i]);
						
						item.addEventListener("click",dragableBoll)
						 
				}
			})
	}
	checkInLines()
	//localStorage.setItem("score", 0);
   // high_score.innerHTML= localStorage.getItem("score");
	if(rands.length<=9){
		let canf=confirm("Game over Restart???")
		if(canf===true){
			[...game_bord.children].forEach(function(item){
				if(item.firstChild!=null){
					item.removeChild(item.firstChild)
				}
			})
			let getstor=parseInt(localStorage.getItem("score"));
				console.log(typeof getstor)
				let point=parseInt(your_scor.textContent)
				if(point>getstor){
					localStorage.removeItem("score")
					localStorage.setItem("score",point)
					high_score.innerHTML=point;
					point=0;
					your_scor.innerHTML=0;
				}
		}else{
			
		}
		
	}
		 	nexts.splice(0,3);
	        addNextBolsCube();   
}
let selected=false;
let s=[];
let dragBollPos;
function dragableBoll(){
	let dragBoll=null;
	if(selected===false && s.length===0){
	   this.firstChild.setAttribute("data","selected");
		 dragBollPos=parseInt(this.firstChild.classList[2])
		s.push(this)
		selected=true;
		 dragBoll=this.firstChild;
	   }else{
		   if(this===s[0] && selected===true && s.length==1){
			  this.firstChild.removeAttribute("data");
			   s.splice(0,1)
			   dragBoll=null;
			   selected=false;
			   dragBollPos=null;
		   }else{
		selected=true; 
		   }
	   }
	let fc;
	let dragCubePos;
	[...game_bord.children].forEach(function(item,index){
		item.addEventListener("click",function(){
			fc=item.firstChild;
			if(fc===null && selected===true && dragBoll!=null){
				dragCubePos=parseInt(item.classList[1])
				s[0].firstChild.classList.replace(dragBollPos,dragCubePos);
				selected=false;
				dragBoll=null;
					item.appendChild(s[0].firstChild)
					item.firstChild.removeAttribute("data");
				 s.splice(0,1)
				let inc=rands.includes(dragCubePos);
			     let iof=rands.indexOf(dragCubePos);
				  rands.push(dragBollPos)
			      rands.splice(iof, 1);
				  checkInLines()
				  addBolsInBord()	
			}else if(fc!=null && selected===false){
				        s.splice(0,1)
		               item.addEventListener("click",dragableBoll) 
					 }
		})
	})	   
}
function checkInLines(){
	        let left="";
			let rigth="";
			let top="";
			let botom="";
	        let poss; 
			let x1=[];let x2=[];let x3=[];let x4=[];let x5=[];let x6=[];let x7=[];let x8=[];let x9=[];
	        let y1=[];let y2=[];let y3=[];let y4=[];let y5=[];let y6=[];let y7=[];let y8=[];let y9=[];
	[...game_bord.children].forEach(function(item,index){
		if(item.firstChild!=null){
			let itemPos=index;
			poss=itemPos % 9;
			let colorBoll=item.firstChild.classList[1];
			left=itemPos-1;
			rigth=itemPos+1;
			top=itemPos-9;
			botom=itemPos+9;
			let pos=Math.floor((itemPos+1)/9);
			let bord=[...game_bord.children];
            if(left>=0 && bord[left].firstChild!=null && colorBoll===bord[left].firstChild.classList[1] ){
			    if(itemPos>=0 && itemPos<=8 && left>=0 && left<=8){
						x1.length=9;
					x1[poss]=item.firstChild;
					x1[poss-1]=bord[left].firstChild;
						if(rigth>=0 && rigth<=8 &&  bord[rigth].firstChild!=null){
							if(colorBoll===bord[rigth].firstChild.classList[1]){
						x1[poss+1]=bord[rigth].firstChild;	
						}
						}
					if(x1[0] && x1[2] && x1[4] && x1[0].classList[1]===x1[2].classList[1] && x1[2].classList[1]===x1[4].classList[1]){
						countElement(x1)
					}else if(x1[1] && x1[3] && x1[5] && x1[1].classList[1]===x1[3].classList[1] && x1[3].classList[1]===x1[5].classList[1]){
						countElement(x1)
					}else if(x1[2] && x1[4] && x1[6] && x1[2].classList[1]===x1[4].classList[1] && x1[4].classList[1]===x1[6].classList[1]){
						countElement(x1)
					}else if(x1[3] && x1[5] && x1[7] && x1[3].classList[1]===x1[5].classList[1] && x1[5].classList[1]===x1[7].classList[1]){
						countElement(x1)
					}else if(x1[4] && x1[6] && x1[8] && x1[4].classList[1]===x1[6].classList[1] && x1[6].classList[1]===x1[8].classList[1]){
						countElement(x1)
					}
				}else if(itemPos>8 && itemPos<=17 && left>8 && left<=17){
						x2.length=9
					x2[poss]=item.firstChild;
					x2[poss-1]=bord[left].firstChild;
						if(rigth>8 && rigth<=17 &&  bord[rigth].firstChild!=null){   
						   if(colorBoll===bord[rigth].firstChild.classList[1]){
						x2[poss+1]=bord[rigth].firstChild;	
						}
						}
						if(x2[0] && x2[2] && x2[4] && x2[0].classList[1]===x2[2].classList[1] && x2[2].classList[1]===x2[4].classList[1]){
						countElement(x2)
					}else if(x2[1] && x2[3] && x2[5] && x2[1].classList[1]===x2[3].classList[1] && x2[3].classList[1]===x2[5].classList[1]){
						countElement(x2)
					}else if(x2[2] && x2[4] && x2[6] && x2[2].classList[1]===x2[4].classList[1] && x2[4].classList[1]===x2[6].classList[1]){
						countElement(x2)
					}else if(x2[3] && x2[5] && x2[7] && x2[3].classList[1]===x2[5].classList[1] && x2[5].classList[1]===x2[7].classList[1]){
						countElement(x2)
					}else if(x2[4] && x2[6] && x2[8] && x2[4].classList[1]===x2[6].classList[1] && x2[6].classList[1]===x2[8].classList[1]){
						countElement(x2)
					}
					
				}else if(itemPos>17 && itemPos<=26 && left>17 && left<=26){
						x3.length=9
					x3[poss]=item.firstChild;
					x3[poss-1]=bord[left].firstChild;
						if(rigth>17 && rigth<=26 &&  bord[rigth].firstChild!=null){
							if(colorBoll===bord[rigth].firstChild.classList[1]){
						x3[poss+1]=bord[rigth].firstChild;
						}
						}
						if(x3[0] && x3[2] && x3[4] && x3[0].classList[1]===x3[2].classList[1] && x3[2].classList[1]===x3[4].classList[1]){
						countElement(x3)
					}else if(x3[1] && x3[3] && x3[5] && x3[1].classList[1]===x3[3].classList[1] && x3[3].classList[1]===x3[5].classList[1]){
						countElement(x3)
					}else if(x3[2] && x3[4] && x3[6] && x3[2].classList[1]===x3[4].classList[1] && x3[4].classList[1]===x3[6].classList[1]){
						countElement(x3)
					}else if(x3[3] && x3[5] && x3[7] && x3[3].classList[1]===x3[5].classList[1] && x3[5].classList[1]===x3[7].classList[1]){
						countElement(x3)
					}else if(x3[4] && x3[6] && x3[8] && x3[4].classList[1]===x3[6].classList[1] && x3[6].classList[1]===x3[8].classList[1]){
						countElement(x3)
					}
				}else if(itemPos>26 && itemPos<=35 && left>26 && left<=35){
						x4.length=9;
					x4[poss]=item.firstChild;
					x4[poss-1]=bord[left].firstChild;
						if(rigth>26 && rigth<=35 &&  bord[rigth].firstChild!=null){
							if(colorBoll===bord[rigth].firstChild.classList[1]){
						x4[poss+1]=bord[rigth].firstChild;
						}
						}
						if(x4[0] && x4[2] && x4[4] && x4[0].classList[1]===x4[2].classList[1] && x4[2].classList[1]===x4[4].classList[1]){
						countElement(x4)
					}else if(x4[1] && x4[3] && x4[5] && x4[1].classList[1]===x4[3].classList[1] && x4[3].classList[1]===x4[5].classList[1]){
						countElement(x4)
					}else if(x4[2] && x4[4] && x4[6] && x4[2].classList[1]===x4[4].classList[1] && x4[4].classList[1]===x4[6].classList[1]){
						countElement(x4)
					}else if(x4[3] && x4[5] && x4[7] && x4[3].classList[1]===x4[5].classList[1] && x4[5].classList[1]===x4[7].classList[1]){
						countElement(x4)
					}else if(x4[4] && x4[6] && x1[8] && x4[4].classList[1]===x4[6].classList[1] && x4[6].classList[1]===x4[8].classList[1]){
						countElement(x4)
					}
				}else if(itemPos>35 && itemPos<=44 && left>35 && left<=44){
						x5.length=9
					x5[poss]=item.firstChild;
					x5[poss-1]=bord[left].firstChild;
						if(rigth>35 && rigth<=44 &&  bord[rigth].firstChild!=null){
							if(colorBoll===bord[rigth].firstChild.classList[1]){
						x5[poss+1]=bord[rigth].firstChild;	
						}
						}
						if(x5[0] && x5[2] && x5[4] && x5[0].classList[1]===x5[2].classList[1] && x5[2].classList[1]===x5[4].classList[1]){
						countElement(x5)
					}else if(x5[1] && x5[3] && x5[5] && x5[1].classList[1]===x5[3].classList[1] && x5[3].classList[1]===x5[5].classList[1]){
						countElement(x5)
					}else if(x5[2] && x5[4] && x5[6] && x5[2].classList[1]===x5[4].classList[1] && x5[4].classList[1]===x5[6].classList[1]){
						countElement(x5)
					}else if(x5[3] && x5[5] && x5[7] && x5[3].classList[1]===x5[5].classList[1] && x5[5].classList[1]===x5[7].classList[1]){
						countElement(x5)
					}else if(x5[4] && x5[6] && x5[8] && x5[4].classList[1]===x5[6].classList[1] && x5[6].classList[1]===x5[8].classList[1]){
						countElement(x5)
					}
				}else if(itemPos>44 && itemPos<=53 && left>44 && left<=53){
						x6.length=9;
					x6[poss]=item.firstChild;
					x6[poss-1]=bord[left].firstChild;
						if(rigth>44 && rigth<=53 &&  bord[rigth].firstChild!=null){
							if(colorBoll===bord[rigth].firstChild.classList[1]){
						x6[poss+1]=bord[rigth].firstChild;
						}
						}
						if(x6[0] && x6[2] && x6[4] && x6[0].classList[1]===x6[2].classList[1] && x6[2].classList[1]===x6[4].classList[1]){
						countElement(x6)
					}else if(x6[1] && x6[3] && x6[5] && x6[1].classList[1]===x6[3].classList[1] && x6[3].classList[1]===x6[5].classList[1]){
						countElement(x6)
					}else if(x6[2] && x6[4] && x6[6] && x6[2].classList[1]===x6[4].classList[1] && x6[4].classList[1]===x6[6].classList[1]){
						countElement(x6)
					}else if(x6[3] && x6[5] && x6[7] && x6[3].classList[1]===x6[5].classList[1] && x6[5].classList[1]===x6[7].classList[1]){
						countElement(x6)
					}else if(x6[4] && x6[6] && x6[8] && x6[4].classList[1]===x6[6].classList[1] && x6[6].classList[1]===x6[8].classList[1]){
						countElement(x6)
					}
				}else if(itemPos>53 && itemPos<=62 && left>53 && left<=62){
						x7.length=9
					x7[poss]=item.firstChild;
					x7[poss-1]=bord[left].firstChild;
						if(rigth>53 && rigth<=62 &&  bord[rigth].firstChild!=null){
							if(colorBoll===bord[rigth].firstChild.classList[1]){
						x7[poss+1]=bord[rigth].firstChild;	
						}
						}
						if(x7[0] && x7[2] && x7[4] && x7[0].classList[1]===x7[2].classList[1] && x7[2].classList[1]===x7[4].classList[1]){
						countElement(x7)
					}else if(x7[1] && x7[3] && x7[5] && x7[1].classList[1]===x7[3].classList[1] && x7[3].classList[1]===x7[5].classList[1]){
						countElement(x7)
					}else if(x7[2] && x7[4] && x7[6] && x7[2].classList[1]===x7[4].classList[1] && x7[4].classList[1]===x7[6].classList[1]){
						countElement(x7)
					}else if(x7[3] && x7[5] && x7[7] && x7[3].classList[1]===x7[5].classList[1] && x7[5].classList[1]===x7[7].classList[1]){
						countElement(x7)
					}else if(x7[4] && x7[6] && x7[8] && x7[4].classList[1]===x7[6].classList[1] && x7[6].classList[1]===x7[8].classList[1]){
						countElement(x7)
					}
				}else if(itemPos>62 && itemPos<=71 && left>62 && left<=71){
						x8.length=9;
					x8[poss]=item.firstChild;
					x8[poss-1]=bord[left].firstChild;
						if(rigth>62 && rigth<=71 &&  bord[rigth].firstChild!=null){
							if(colorBoll===bord[rigth].firstChild.classList[1]){
						x8[poss+1]=bord[rigth].firstChild;
						}
						}
						if(x8[0] && x8[2] && x8[4] && x8[0].classList[1]===x8[2].classList[1] && x8[2].classList[1]===x8[4].classList[1]){
						countElement(x8)
					}else if(x8[1] && x8[3] && x8[5] && x8[1].classList[1]===x8[3].classList[1] && x8[3].classList[1]===x8[5].classList[1]){
						countElement(x8)
					}else if(x8[2] && x8[4] && x8[6] && x8[2].classList[1]===x8[4].classList[1] && x8[4].classList[1]===x8[6].classList[1]){
						countElement(x8)
					}else if(x8[3] && x8[5] && x8[7] && x8[3].classList[1]===x8[5].classList[1] && x8[5].classList[1]===x8[7].classList[1]){
						countElement(x8)
					}else if(x8[4] && x8[6] && x8[8] && x8[4].classList[1]===x8[6].classList[1] && x8[6].classList[1]===x8[8].classList[1]){
						countElement(x8)
					}
				}else if(itemPos>71 && itemPos<=80 && left>71 && left<=80){
						x9.length=9
					x9[poss]=item.firstChild;
					x9[poss-1]=bord[left].firstChild;
						if(rigth>71 && rigth<=80 &&  bord[rigth].firstChild!=null){
							if(colorBoll===bord[rigth].firstChild.classList[1]){
						x9[poss+1]=bord[rigth].firstChild;	
						}
						}
						if(x9[0] && x9[2] && x9[4] && x9[0].classList[1]===x9[2].classList[1] && x9[2].classList[1]===x9[4].classList[1]){
						countElement(x9)
					}else if(x9[1] && x9[3] && x9[5] && x9[1].classList[1]===x9[3].classList[1] && x9[3].classList[1]===x9[5].classList[1]){
						countElement(x9)
					}else if(x9[2] && x9[4] && x9[6] && x9[2].classList[1]===x9[4].classList[1] && x9[4].classList[1]===x9[6].classList[1]){
						countElement(x9)
					}else if(x9[3] && x9[5] && x9[7] && x9[3].classList[1]===x9[5].classList[1] && x9[5].classList[1]===x9[7].classList[1]){
						countElement(x9)
					}else if(x9[4] && x9[6] && x9[8] && x9[4].classList[1]===x9[6].classList[1] && x9[6].classList[1]===x9[8].classList[1]){
						countElement(x9)
					}
				}
				
			   }
			if(top>=0 && bord[top].firstChild!=null && colorBoll===bord[top].firstChild.classList[1]){
				if(top % 9==1){
					if(!y1.includes(item.firstChild) && !y1.includes(bord[top].firstChild)){
						y1.length=9;
						y1[pos]=item.firstChild;
						y1[pos-1]=bord[top].firstChild;
						if(botom % 9==1 && botom<=80 && bord[botom].firstChild!=null){
							if(colorBoll===bord[botom].firstChild.classList[1]){
						    y1[pos+1]=bord[botom].firstChild;	
						}
						}
						if(y1[0] && y1[2] && y1[4] && y1[0].classList[1]===y1[2].classList[1] && y1[2].classList[1]===y1[4].classList[1]){
						countElement(y1)
					}else if(y1[1] && y1[3] && y1[5] && y1[1].classList[1]===y1[3].classList[1] && y1[3].classList[1]===y1[5].classList[1]){
						countElement(y1)
					}else if(y1[2] && y1[4] && y1[6] && y1[2].classList[1]===y1[4].classList[1] && y1[4].classList[1]===y1[6].classList[1]){
						countElement(y1)
					}else if(y1[3] && y1[5] && y1[7] && y1[3].classList[1]===y1[5].classList[1] && y1[5].classList[1]===y1[7].classList[1]){
						countElement(y1)
					}else if(y1[4] && y1[6] && y1[8] && y1[4].classList[1]===y1[6].classList[1] && y1[6].classList[1]===y1[8].classList[1]){
						countElement(y1)
					}
				 }
				}else if(top % 9==2){
					if(!y2.includes(item.firstChild) && !y2.includes(bord[top].firstChild)){
						y2.length=9;
					    y2[pos]=item.firstChild;
						y2[pos-1]=bord[top].firstChild;
						if(botom % 9==2 && botom<=80 &&  bord[botom].firstChild!=null){
							 if(colorBoll===bord[botom].firstChild.classList[1]){
						y2[pos+1]=bord[botom].firstChild;		
						}
						}
						if(y2[0] && y2[2] && y2[4] && y2[0].classList[1]===y2[2].classList[1] && y2[2].classList[1]===y2[4].classList[1]){
						countElement(y2)
					}else if(y2[1] && y2[3] && y2[5] && y2[1].classList[1]===y2[3].classList[1] && y2[3].classList[1]===y2[5].classList[1]){
						countElement(y2)
					}else if(y2[2] && y2[4] && y2[6] && y2[2].classList[1]===y2[4].classList[1] && y2[4].classList[1]===y2[6].classList[1]){
						countElement(y2)
					}else if(y2[3] && y2[5] && y2[7] && y2[3].classList[1]===y2[5].classList[1] && y2[5].classList[1]===y2[7].classList[1]){
						countElement(y2)
					}else if(y2[4] && y2[6] && y2[8] && y2[4].classList[1]===y2[6].classList[1] && y2[6].classList[1]===y2[8].classList[1]){
						countElement(y2)
					}
					}
				}else if(top % 9==3){
					if(!y3.includes(item.firstChild) && !y3.includes(bord[top].firstChild)){
						y3.length=9
					    y3[pos]=item.firstChild;
						y3[pos-1]=bord[top].firstChild;
						if(botom % 9==3 && botom<=80 &&  bord[botom].firstChild!=null){
							if(colorBoll===bord[botom].firstChild.classList[1]){
						y3[pos+1]=bord[botom].firstChild;	
						}
						}
						if(y3[0] && y3[2] && y3[4] && y3[0].classList[1]===y3[2].classList[1] && y3[2].classList[1]===y3[4].classList[1]){
						countElement(y3)
					}else if(y3[1] && y3[3] && y3[5] && y3[1].classList[1]===y3[3].classList[1] && y3[3].classList[1]===y3[5].classList[1]){
						countElement(y3)
					}else if(y3[2] && y3[4] && y3[6] && y3[2].classList[1]===y3[4].classList[1] && y3[4].classList[1]===y3[6].classList[1]){
						countElement(y3)
					}else if(y3[3] && y3[5] && y3[7] && y3[3].classList[1]===y3[5].classList[1] && y3[5].classList[1]===y3[7].classList[1]){
						countElement(y3)
					}else if(y3[4] && y3[6] && y3[8] && y3[4].classList[1]===y3[6].classList[1] && y3[6].classList[1]===y3[8].classList[1]){
						countElement(y3)
					}
					}
				}else if(top % 9==4){
					if(!y4.includes(item.firstChild) && !y4.includes(bord[top].firstChild)){
						y4.length=9
					    y4[pos]=item.firstChild;
						y4[pos-1]=bord[top].firstChild;
						if(botom % 9==4 && botom<=80 &&  bord[botom].firstChild!=null){
							if(colorBoll===bord[botom].firstChild.classList[1]){
						y4[pos+1]=bord[botom].firstChild;	
						}
						}
						if(y4[0] && y4[2] && y4[4] && y4[0].classList[1]===y4[2].classList[1] && y4[2].classList[1]===y4[4].classList[1]){
						countElement(y4)
					}else if(y4[1] && y4[3] && y4[5] && y4[1].classList[1]===y4[3].classList[1] && y4[3].classList[1]===y4[5].classList[1]){
						countElement(y4)
					}else if(y4[2] && y4[4] && y4[6] && y4[2].classList[1]===y4[4].classList[1] && y4[4].classList[1]===y4[6].classList[1]){
						countElement(y4)
					}else if(y4[3] && y4[5] && y4[7] && y4[3].classList[1]===y4[5].classList[1] && y4[5].classList[1]===y4[7].classList[1]){
						countElement(y4)
					}else if(y4[4] && y4[6] && y4[8] && y4[4].classList[1]===y4[6].classList[1] && y4[6].classList[1]===y4[8].classList[1]){
						countElement(y4)
					}
					}
				}else if(top % 9==5){
					if(!y5.includes(item.firstChild) && !y5.includes(bord[top].firstChild)){
						y5.length=9
						y5[pos]=item.firstChild;
						y5[pos-1]=bord[top].firstChild;
						if(botom % 9==5 && botom<=80 &&  bord[botom].firstChild!=null){
							if(colorBoll===bord[botom].firstChild.classList[1]){
						y5[pos+1]=bord[botom].firstChild;	
						}
						}
						if(y5[0] && y5[2] && y5[4] && y5[0].classList[1]===y5[2].classList[1] && y5[2].classList[1]===y5[4].classList[1]){
						countElement(y5)
					}else if(y5[1] && y5[3] && y5[5] && y5[1].classList[1]===y5[3].classList[1] && y5[3].classList[1]===y5[5].classList[1]){
						countElement(y5)
					}else if(y5[2] && y5[4] && y5[6] && y5[2].classList[1]===y5[4].classList[1] && y5[4].classList[1]===y5[6].classList[1]){
						countElement(y5)
					}else if(y5[3] && y5[5] && y5[7] && y5[3].classList[1]===y5[5].classList[1] && y5[5].classList[1]===y5[7].classList[1]){
						countElement(y5)
					}else if(y5[4] && y5[6] && y5[8] && y5[4].classList[1]===y5[6].classList[1] && y5[6].classList[1]===y5[8].classList[1]){
						countElement(y5)
					}
					}
				}else if(top % 9==6){
					if(!y6.includes(item.firstChild) && !y6.includes(bord[top].firstChild)){
						y6.length=9
						y6[pos]=item.firstChild;
						y6[pos-1]=bord[top].firstChild;
						if(botom % 9==6 && botom<=80 &&  bord[botom].firstChild!=null){
							if(colorBoll===bord[botom].firstChild.classList[1]){
						y6[pos+1]=bord[botom].firstChild;	
						}
						}
						if(y6[0] && y6[2] && y6[4] && y6[0].classList[1]===y6[2].classList[1] && y6[2].classList[1]===y6[4].classList[1]){
						countElement(y6)
					}else if(y6[1] && y6[3] && y6[5] && y6[1].classList[1]===y6[3].classList[1] && y6[3].classList[1]===y6[5].classList[1]){
						countElement(y6)
					}else if(y6[2] && y6[4] && y6[6] && y6[2].classList[1]===y6[4].classList[1] && y6[4].classList[1]===y6[6].classList[1]){
						countElement(y6)
					}else if(y6[3] && y6[5] && y6[7] && y6[3].classList[1]===y6[5].classList[1] && y6[5].classList[1]===y6[7].classList[1]){
						countElement(y6)
					}else if(y6[4] && y6[6] && y6[8] && y6[4].classList[1]===y6[6].classList[1] && y6[6].classList[1]===y6[8].classList[1]){
						countElement(y6)
					}
					};
				}else if(top % 9==7){
					if(!y7.includes(item.firstChild) && !y7.includes(bord[top].firstChild)){
						y7.length=9
						y7[pos]=item.firstChild;
						y7[pos-1]=bord[top].firstChild;
						if(botom % 9==7 && botom<=80 &&  bord[botom].firstChild!=null){
							if(colorBoll===bord[botom].firstChild.classList[1]){
						y7[pos+1]=bord[botom].firstChild;	
						}
						}
						if(y7[0] && y7[2] && y7[4] && y7[0].classList[1]===y7[2].classList[1] && y7[2].classList[1]===y7[4].classList[1]){
						countElement(y7)
					}else if(y7[1] && y7[3] && y7[5] && y7[1].classList[1]===y7[3].classList[1] && y7[3].classList[1]===y7[5].classList[1]){
						countElement(y7)
					}else if(y7[2] && y7[4] && y7[6] && y7[2].classList[1]===y7[4].classList[1] && y7[4].classList[1]===y7[6].classList[1]){
						countElement(y7)
					}else if(y7[3] && y7[5] && y7[7] && y7[3].classList[1]===y7[5].classList[1] && y7[5].classList[1]===y7[7].classList[1]){
						countElement(y7)
					}else if(y7[4] && y7[6] && y7[8] && y7[4].classList[1]===y7[6].classList[1] && y7[6].classList[1]===y7[8].classList[1]){
						countElement(y7)
					}
					}
				}else if(top % 9==8){
					if(!y8.includes(item.firstChild) && !y8.includes(bord[top].firstChild)){
						y8.length=9
					    y8[pos]=item.firstChild;
						y8[pos-1]=bord[top].firstChild;
						if(botom % 9==8 && botom<=80 &&  bord[botom].firstChild!=null){
							if(colorBoll===bord[botom].firstChild.classList[1]){
						y8[pos+1]=bord[botom].firstChild;	
						}
						}
						if(y8[0] && y8[2] && y8[4] && y8[0].classList[1]===y8[2].classList[1] && y8[2].classList[1]===y8[4].classList[1]){
						countElement(y8)
					}else if(y8[1] && y8[3] && y8[5] && y8[1].classList[1]===y8[3].classList[1] && y8[3].classList[1]===y8[5].classList[1]){
						countElement(y8)
					}else if(y8[2] && y8[4] && y8[6] && y8[2].classList[1]===y8[4].classList[1] && y8[4].classList[1]===y8[6].classList[1]){
						countElement(y8)
					}else if(y8[3] && y8[5] && y8[7] && y8[3].classList[1]===y8[5].classList[1] && y8[5].classList[1]===y8[7].classList[1]){
						countElement(y8)
					}else if(y8[4] && y8[6] && y8[8] && y8[4].classList[1]===y8[6].classList[1] && y8[6].classList[1]===y8[8].classList[1]){
						countElement(y8)
					}
					}
				}else{
					if(!y9.includes(item.firstChild) && !y9.includes(bord[top].firstChild)){
						y9.length=9
						y9[pos]=item.firstChild;
						y9[pos-1]=bord[top].firstChild;
						if(botom % 9==0 && botom<=80 &&  bord[botom].firstChild!=null){
							if(colorBoll===bord[botom].firstChild.classList[1]){
						y9[pos+1]=bord[botom].firstChild;	
						}
						}
						if(y9[0] && y9[2] && y9[4] && y9[0].classList[1]===y9[2].classList[1] && y9[2].classList[1]===y9[4].classList[1]){
						countElement(y9)
					}else if(y9[1] && y9[3] && y9[5] && y9[1].classList[1]===y9[3].classList[1] && y9[3].classList[1]===y9[5].classList[1]){
						countElement(y9)
					}else if(y9[2] && y9[4] && y9[6] && y9[2].classList[1]===y9[4].classList[1] && y9[4].classList[1]===y9[6].classList[1]){
						countElement(y9)
					}else if(y9[3] && y9[5] && y9[7] && y9[3].classList[1]===y9[5].classList[1] && y9[5].classList[1]===y9[7].classList[1]){
						countElement(y9)
					}else if(y9[4] && y9[6] && y9[8] && y9[4].classList[1]===y9[6].classList[1] && y9[6].classList[1]===y9[8].classList[1]){
						countElement(y9)
					}
					}
				}
			}
		}
	})
}
function countElement(array) {
	setTimeout(function(){
	       let b=[];
	        let g=[];
	        let r=[];
			let lb=[];
			let d=[];
	        let v=[];
	    array.forEach(function(item,index){
		if(item && item.classList[1]===colors[0] && array[index+1] && array[index+1].classList[1]===colors[0]){
			b[index]=item;
		}else if(item && item.classList[1]===colors[0] && array[index-1] && array[index-1].classList[1]===colors[0]){
			b[index]=item
		}
		if(item && item.classList[1]===colors[1] && array[index+1] && array[index+1].classList[1]===colors[1]){
			g[index]=item;
		}else if(item && item.classList[1]===colors[1] && array[index-1] && array[index-1].classList[1]===colors[1]){
			g[index]=item
		}
		if(item && item.classList[1]===colors[2] && array[index+1] && array[index+1].classList[1]===colors[2]){
			r[index]=item;
		}else if(item && item.classList[1]===colors[2] && array[index-1] && array[index-1].classList[1]===colors[2]){
			r[index]=item
		}
		if(item && item.classList[1]===colors[3] && array[index+1] && array[index+1].classList[1]===colors[3]){
			lb[index]=item;
		}else if(item && item.classList[1]===colors[3] && array[index-1] && array[index-1].classList[1]===colors[3]){
			lb[index]=item
		}
		if(item && item.classList[1]===colors[4] && array[index+1] && array[index+1].classList[1]===colors[4]){
			d[index]=item;
		}else if(item && item.classList[1]===colors[4] && array[index-1] && array[index-1].classList[1]===colors[4]){
			d[index]=item
		}
		if(item && item.classList[1]===colors[5] && array[index+1] && array[index+1].classList[1]===colors[5]){
			v[index]=item;
		}else if(item && item.classList[1]===colors[5] && array[index-1] && array[index-1].classList[1]===colors[5]){
			v[index]=item
		}		
	})
	if(b.length>=5) incUndef(b);
	if(g.length>=5) incUndef(g); 
	if(r.length>=5) incUndef(r);
	if(lb.length>=5) incUndef(lb);
	if(d.length>=5) incUndef(d);
	if(v.length>=5) incUndef(v);
	},0)
}
function incUndef(arr){
		arr[0]===undefined && arr[1]===undefined && arr[2]===undefined && arr[3]===undefined ? arr.splice(0,4) :false;
	    arr[0]===undefined && arr[1]===undefined && arr[2]===undefined ? arr.splice(0,3) :false;
	    arr[0]===undefined && arr[1]===undefined ? arr.splice(0,2) :false;
	    arr[0]===undefined ? arr.splice(0,1):false;
		let id;
		let sp;
		if(arr.includes(undefined)){
			arr.find((el, idx) => el === undefined ? id=idx :id=0)
			sp=arr.splice(id+1);
			if(sp.length>=5){
				remuveBoll(sp)
				arr=[];
			}else{
				return false;
			}
		}else{
			remuveBoll(arr)
			arr=[]
		}
	}
function remuveBoll(arr){
	let pt=parseInt(your_scor.textContent)
		if(arr.length===9){
			arr.forEach(function(item){
			item.parentElement.removeChild(item);
		    rands.unshift(parseInt(item.classList[2]))
				const controller = new AbortController();
				controller.abort(item.removeEventListener("click",dragableBoll));
				controller.abort( item.removeEventListener("click",addBolsInBord));
                  return controller.signal;
			})
			your_scor.innerHTML=pt+26
			arr=[];
		}else if(arr.length===8){
			arr.forEach(function(item){
			item.parentElement.removeChild(item);
		    rands.unshift(parseInt(item.classList[2]))
					const controller = new AbortController();
				controller.abort(item.removeEventListener("click",dragableBoll));
				controller.abort( item.removeEventListener("click",addBolsInBord));
                  return controller.signal;
			})
			your_scor.innerHTML=pt+22
			arr=[];
		}else if(arr.length===7){
			arr.forEach(function(item){
			item.parentElement.removeChild(item);
		    rands.unshift(parseInt(item.classList[2]))	
									const controller = new AbortController();
				controller.abort(item.removeEventListener("click",dragableBoll));
				controller.abort( item.removeEventListener("click",addBolsInBord));
                return controller.signal;
			})
			your_scor.innerHTML=pt+18
			arr=[];
		}else if(arr.length===6){
			arr.forEach(function(item){
			item.parentElement.removeChild(item);
		    rands.unshift(parseInt(item.classList[2]))
				const controller = new AbortController();
			controller.abort(item.removeEventListener("click",dragableBoll));
			controller.abort( item.removeEventListener("click",addBolsInBord));
            return controller.signal;
			})
			your_scor.innerHTML=pt+14
			arr=[];
		}else if(arr.length===5){
			arr.forEach(function(item,index){			
			item.parentNode.removeChild(item);
		    rands.unshift(parseInt(item.classList[2]))
				const controller = new AbortController();
			controller.abort(item.removeEventListener("click",dragableBoll));
			controller.abort( item.removeEventListener("click",addBolsInBord));
				return controller.signal;    
			})
			your_scor.innerHTML=pt+10
			arr=[];
		}	
}