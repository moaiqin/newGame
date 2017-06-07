$(function(){
	  
      var game={
		      nowGK:1,
			  gk:[
				  {map:[
					   1,1,2,2,2,2,1,1,
					   1,1,2,4,4,2,1,1,
					   1,2,2,3,4,2,2,1,
					   1,2,3,3,3,4,2,1,
					   2,2,3,3,3,3,2,2,
					   2,3,3,2,3,3,3,2,
					   2,3,3,3,3,3,3,2,
					   2,2,2,2,2,2,2,2
					   ],
				   box:[
				        {left:4,top:3},
				        {left:3,top:4},
						{left:4,top:5},
						{left:5,top:5}
					   ],
				  person:{left:3,top:6}
				  },
				  {map:[
				       1,1,1,1,2,2,2,1,1,1,1,
					   1,1,1,2,2,3,2,2,1,1,1,
					   1,1,2,2,3,3,3,2,2,1,1,
					   1,2,2,3,3,3,3,3,2,2,1,
					   1,2,3,3,2,4,2,3,3,2,1,
					   2,2,3,4,4,4,4,4,3,2,2,
					   2,3,3,3,2,3,2,3,3,3,2,
					   2,3,3,3,4,3,4,3,3,3,2,
					   2,2,2,2,3,3,3,2,2,2,2,
					   1,1,1,2,2,2,2,2,1,1,1,
					   2,2,2,2,1,1,1,2,2,2,2
					   ],
					  box:[
					    {left:4,top:3},
				        {left:6,top:3},
						{left:3,top:5},
						{left:7,top:5},
						{left:2,top:7},
				        {left:4,top:7},
						{left:6,top:7},
						{left:8,top:7}
						],
					 person:{left:5,top:1}
				   },
				  {map:[
				         1,1,1,1,2,2,2,2,2,2,2,1,
						 1,1,1,1,2,3,3,2,3,3,2,1,
						 1,1,1,1,2,3,3,3,3,3,2,1,
						 2,2,2,2,2,3,3,2,3,3,2,2,
						 4,4,4,2,2,2,3,2,3,3,2,2,
						 4,3,3,2,3,3,3,3,2,3,3,2,
						 4,3,3,3,3,3,3,3,3,3,3,2,
						 4,3,3,2,3,3,3,3,2,3,3,2,
						 4,4,4,2,2,2,3,2,3,3,2,2,
						 2,2,2,2,2,3,3,3,3,3,2,1,
						 1,1,1,1,2,3,3,2,3,3,2,1,
						 1,1,1,1,2,2,2,2,2,2,2,1
					   ],
					 box:[
					    {left:5,top:6},
				        {left:6,top:3},
						{left:6,top:5},
						{left:6,top:7},
						{left:6,top:9},
				        {left:7,top:2},
						{left:8,top:2},
						{left:9,top:6}
						 ],
					person:{left:5,top:9}
				  }
			  ],
			  
			  init:function(obj){
				   this.parent=obj;
				   this.createMap(this.nowGK);
			  },
			  
			  createMap:function(Now){
				   this.parent.empty();
				   document.title='第'+(Now+1)+'关';
				   this.json=this.gk[Now];
				   this.parent.css('width',Math.sqrt(this.json.map.length)*50);
				   $.each(this.json.map,$.proxy(function(i,elem){
						  this.parent.append('<div class="pos'+elem+'"></div>');
				   },this));
				   this.createBox();
				   this.createPerson();
			  },
			  createBox:function(){
			       $.each(this.json.box,$.proxy(function(i,elem){
				         var div=$('<div class="box"></div>');
						 div.css({
						     left:this.json.box[i].left*50,
							 top:this.json.box[i].top*50
						 });
						 this.parent.append(div);
				   },this));
			  },
			  createPerson:function(){
			       var operson=$('<div class="person"></div>');
				   operson.css({left:this.json.person.left*50,top:this.json.person.top*50});
				   operson.data('x',this.json.person.left);
				   operson.data('y',this.json.person.top);
				   this.parent.append(operson);
				   this.bindPerson(operson);  
			  },
			  bindPerson:function(person){
				  $(document).keydown($.proxy(function(ev){
				       switch(ev.which){
					       case 37:
						   this.runPerson(person,{x:-1});
						   break;
						   case 38:
						   this.runPerson(person,{y:-1});
						   break;
						   case 39:
						   this.runPerson(person,{x:1});
						   break;
						   case 40:
						   this.runPerson(person,{y:1});
						   break;
					   }
				  },this));
			  },
			  runPerson:function(person,pos){
			      var stepX=pos.x||0;
				  var stepY=pos.y||0;
				  if(this.json.map[(person.data('y')+stepY)*Math.sqrt(this.json.map.length)+person.data('x')+stepX] != 2){
					   person.data('x',person.data('x')+stepX);
					   person.data('y',person.data('y')+stepY);
					   person.css({left:person.data('x')*50,top:person.data('y')*50});
					   
					   $('.box').each($.proxy(function(i,elem){
					         if(this.pz(person,$(elem))&&this.json.map[(person.data('y')+stepY)*Math.sqrt(this.json.map.length)+person.data('x')+stepX] != 2){ 
						          $(elem).css({left:(person.data('x')+stepX)*50,top:(person.data('y')+stepY)*50}); 
								  
								  $('.box').each($.proxy(function(j,elemBox){
								         if(this.pz($(elem),$(elemBox))&&elem!=elemBox){
										       $(elemBox).css({left:person.data('x')*50,top:person.data('y')*50});
											   person.data('x',person.data('x')-stepX);
											   person.data('y',person.data('y')-stepY);
											   person.css({left:person.data('x')*50,top:person.data('y')*50});
										 }
								  },this));  
							 }else if(this.pz(person,$(elem))){
							      person.data('x',person.data('x')-stepX);
								  person.data('y',person.data('y')-stepY);
								  person.css({left:person.data('x')*50,top:person.data('y')*50});
							 }
					   },this))
				  }
				  this.showNext();
			  },
			  showNext:function(){
				  var now=0;
			      $('.box').each($.proxy(function(i,elem){
				        $('.pos4').each($.proxy(function(j,elem2){
					          if(this.pz($(elem),$(elem2))){
							        now++; 
									//$(elem).addClass('active');     
							  }
						},this))
				  },this))
				  if(now==($('.box').length)){
				       this.nowGK+=1;
					   this.createMap(this.nowGK);
				  }
			  },
			  pz:function(obj1,obj2){
			      var L1=obj1.offset().left;
				  var R1=obj1.offset().left+obj1.width();
				  var T1=obj1.offset().top;
				  var B1=obj1.offset().top+obj1.height();
				  
				  var L2=obj2.offset().left;
				  var R2=obj2.offset().left+obj2.width();
				  var T2=obj2.offset().top;
				  var B2=obj2.offset().top+obj2.height();
				  
				  if(L1>=R2||R1<=L2||T1>=B2||B1<=T2){
				       return false;
				  }else{
				       return true;
				  }
			  }, 
		  
		  };
		  game.init($('#main'));
})