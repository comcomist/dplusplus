// under humanitarian agpl license:  You are not allowed to use, produce from or design from this or its part, anything contained with the aim to kill, to torture, or without their consent, to cause harm to or to monitor people and any permission beside this restriction is granted here only under the Agpl License! https://hopeisback.com/#hagpl
function restuctForm(c){//let c = document.createElement("div");
	c.innerHTML+="In ";        
			addfield(c,"radio","locatingit") ;//container.children[0]
			c.innerHTML+="or Before :";
			addfield(c,"radio","locatingit","checked");//container.children[1] 
		    addfield(c,"text","lname","br","The locating name");//container.children[2]	
		    addfield(c,"text","fname","br","The name of this element");//container.children[4]
		    addfield(c,"text","tname","br","The title of this element");//container.children[6]
		    c.innerHTML  +="Its Icon: ";
		    addfield(c,"file","icnname").accept="image/png, image/jpeg";//container.children[8]
		    c.innerHTML  +="Its Image: ";
		    addfield(c,"file","imgname","br").accept="image/png, image/jpeg";//container.children[9]		  
			return c;
	}//<div id="create-item">

function contentApply(container,txt){
	let	bein = container.children[0].checked,
		bebefore = container.children[1].checked;
	if( !bein&&!bebefore)return "";
	let	location = container.children[2].value,
		name = container.children[4].value,
		title = container.children[6].value,	
		icon = container.children[8].value,
		img = container.children[9].value,
		toinsert = '<div class="flding" id="' 
			+name+'"> <input id="i'
			+name+'" class="toggle" type="checkbox"> <label for="i'
			+name+'"class="lbl-toggle">'
			+title+' </label><div class="fcontent" "content-inner">please replace  your content with this one.</div></div>',
		cutAt = txt.indexOf('<div class="flding" id="'+location);
	console.log(
	"children",container.children ,
	"location : ",container.children[2].value,
	"name : ",container.children[4].value,
	"title : ",container.children[6].value,	
		"icon : ",container.children[8].value,
			"img : ",container.children[9].value,
	"toinsert:",toinsert,
	 "cutat",cutAt,
	 "txt.slice(0,cutAt)",txt.slice(0,cutAt),
	 "txt.slice(cutAt,txt.length)",txt.slice(cutAt,txt.length),
	 " txt= ",txt);
	//todo 
	if (cutAt===-1) return "";
	
	let inmenu=txt.indexOf('<div class="dropdown-content">'),
	    endmenu=txt.indexOf('</div>',inmenu);
	if (inmenu!==-1){
		let into=txt.indexOf(location,inmenu);
		//also insert if inmenu exist in <div class="dropdown-content">
	}
	//complete image and icon
	    
	if(bebefore)	return txt.slice(0,cutAt)+toinsert+txt.slice(cutAt,txt.length);
	let endit='"content-inner"';
	cutAt = txt.slice(cutAt,txt.length).indexOf(endit)+endit.length;	
	return txt.slice(0,cutAt)+toinsert+txt.slice(cutAt,txt.length);}

function restruct (container,steps) {
	let c = document.getElementById(container),
	    p = document.getElementById(steps);
	if(p.value ===0){c.value=[1,loadfile(),""];p.value=1;
	document.getElementById("create-item-progress2").innerText="Open and save  this file as you like (all files). and then open that (ctrl+O)";	} // [step,filename, filecontent]
	else {c.value=[2,c.value[1].files[0],""];
			  window.open(c.value[1].name);//,"bemodified", "menubar=no,location=no,resizable=yes,scrollbars=yes,status=yes").document.innerHTML;
		    let reader = new FileReader();
			  reader.onload = function () {		
				// here to plant  
			      //1. in <body.. replace '>' with 'contenteditable="true"> <div id="retructrinnnnng"><button type="button" onclick="restuctForm(this)";>return</button><button type="button" onclick="makeredytosave(this)";>ok</button></div>'
				  //2. button to restuctForm , ok button to seld delete this element
//c 	  = restuctForm(c);						c.style.display="block";

				  saveas(c.value[0].name,reader.result);
				//c.value=[2,c.value[1],reader.result];
		 	// p.value=2;//		 	 
		 	  }
			  reader.readAsBinaryString(c.value[1]);
 }}   
   // break;		case 2:
		 /*c.value[2]=contentApply(c,c.value[2]);	
				if(c.value[2]){p.value=3;
				saveas(c.value[1].name,c.value[2]);
		   //todo here after save window.open(c.value[1].name).. 
		  //p.value=0;//		   
				}else {while (c.firstChild) c.removeChild(c.firstChild);
					   p.value=0;}
				c.value[0]=0;
				*/
    //break;
		/*  * usage eg:
 <div id="create-item" ></div>
    <a href="javascript:void(0);" 
         onclick="restruct('create-item','create-item-progress');">       
	   <progress value="0" max="3" id="create-item-progress">
	</progress></a> 
 **/
	

function addfield(container,type,name,sofix,placeholder){           
          let i = document.createElement("input");// Create an <input> element, set its type and name attributes
          i.type = type;
          i.name = name;
          if(placeholder)i.placeholder=placeholder;
          container.appendChild(i);
          if(sofix)if(sofix ==="checked")
				  i.outerHTML=i.outerHTML.slice(0,i.outerHTML.length-1)+"checked>";//default is checked by replace '>' with "checked>"
			 else container.appendChild(document.createElement(sofix));// Append a line break 
     return i ;} 	

function saveas(filename, text) {let a = document.createElement('a');
    a.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    a.setAttribute('download', filename);
    if (document.createEvent){let event = document.createEvent('MouseEvents');
          event.initEvent('click', true, true);  
          a.dispatchEvent(event);
  }  else a.click();}
     
     
function loadfile(){
	let i = document.createElement("input");// Create an input element          // this function must be called from  a user    ,,,https://stackoverflow.com/questions/6463439/how-to-open-a-file-browse-dialog-using-javascript
    i.type   = "file";						// Set its type to file
    i.accept = ".html";    					// Set accept to the file types you want the user to select.   Include both the file extension and the mime type
    i.id     = "loadFile";                  // set it id  
    i.dispatchEvent(new MouseEvent("click"));// dispatch a click event to open the file dialog
	return i;}//  i.addEventListener("change", beforeload(i));// set onchange event to call callback when user has selected file


	function swtichTo(my,n){	  my.style.display="none";
		
		let i=document.getElementById(n);//my.parentElement.childern[n];
		i.style.display="block";
		}
	function diveto(){let a=location.hash,al=a.length;
						if(al)return a.substr(1,al-1);return null;}
	function relocate(){let s=diveto();
						if(s)relocateit(document.getElementById(s));}	
    function divein(a){if(a!==null)for(;a.tagName!=='body';a=a.parentElement)	 
						a.childNodes[1].setAttribute("checked","checked");}
	function relocateid(i){	location.hash=i;relocateit(document.getElementById(i));}								
    function relocateit(b,at=0){b.scrollIntoView({inline:"end"});
						b.style.borderColor='purple';b.style.borderStyle='double none';
						divein(b);}		
    function occurrencesOf(e,v){let r=[];
		for(ontag=0,l=v.length,el=e.length,i=0;i<el;){i=e.indexOf(v,i+l);
			   if(i===-1)break; 			// console.log("occurrencesOf  - r,i:",r,i);
			   ontag=e.lastIndexOf('<',i);//		console.log(x,i);
			   let tag1=e[ontag+1], tag3=e.substr([ontag+1],3);
			   if(tag1!=='a'&&tag3!=="<di")   //   &&tag3!=="<la" and why having 
			       r.push(i);}//// filling r with  found v  only if the tag is not of link	     
	    return r;}	  // else console.log(i," was not pushed tag3=", tag3);			  //console.log("occurrencesOf  - r:",r);
	function removehtag(hiliteTag){let arr = document.getElementsByTagName(hiliteTag);// remove highlighting //console.log("removehtag ",arr);
		while(arr.length && (el = arr[0])) {let parent = el.parentNode;
					parent.replaceChild(el.firstChild, el);
					parent.normalize();}};								
	function unfold(n,oc={}){if(oc.length){	
		let highlight = new Highlight(document.querySelectorAll(".content-inner")[n]); // id of the element to parse
		highlight.apply(document.getElementById("searchItem").value);
		} relocateit(document.querySelectorAll(".content-inner")[n]); } 
	function resultb(n,r,i={},l=0){let bu = document.createElement("button");
			bu.innerHTML= l.toString(); // r.toString()+here we should have number of results in the element
		//	bu.onmouseover=marked;// on hover;
			bu.type		="button";	
//			bu.background-color ='purple';				
			bu.addEventListener("click", function(){unfold(n,i);}, false);			
			return bu;}
				
	function cleaning(alsov=true){let res=document.getElementById("searchresults");
	  while(res.childNodes[0]) res.removeChild(res.childNodes[0]);
	  document.getElementById("searchmsg").textContent='';
	  if(alsov){
		  console.log("alsov in cleaning ");
		  removehtag( "MARK");//document.getElementById("searchItem").value||
	  document.getElementById("searchItem").value='';
  }
	  return res;}
	  		
	function findit(a){if(a){//		 console.log("findit a", a);
		let res=cleaning(false);
	  let item = document.querySelectorAll(".content-inner"),//document.querySelec­torAll("content-inner");// getting the hidden element from the doby.
		  maxn = item.length,  r = 0,	n = 0, t = 0;//console.log("maxn="+maxn);
	  for(;n<maxn&&r<100;n++){let i=occurrencesOf(item[n].innerHTML,a);//		  let i=occurrencesOf(item[n].outerHTML,a);//item[n].outerHTML.indexOf(a);//item[n].innerHTML.indexOf(a);					
		   if (i.length){res.appendChild(resultb(n,r++,i,i.length));
				t+=i.length;}}
		   document.getElementById("searchmsg").textContent=t.toString();
		  return t;	 } 
		  else cleaning(true);;
		  }
		  
function Highlight(id, tag){////https://www.the-art-of-web.com/javascript/search-highlight/  Original JavaScript code by Chirp Internet: www.chirp.com.au // Please acknowledge use of this code by including this header.
  let targetNode = id;//document.getElementById(id) || document.body;
  let hiliteTag = tag || "MARK";
  let skipTags = new RegExp("^(?:" + hiliteTag + "|SCRIPT|FORM|SPAN)$");
  let colors = ["#ff6", "#a0ffff", "#9f9", "#f99", "#f6f"];
  let wordColor = [];
  let colorIdx = 0;
  let matchRegExp = "";
  let openLeft = false;
  let openRight = false; 
  let endRegExp = new RegExp('^[^\\w]+|[^\\w]+$', "g");// characters to strip from start and end of the input string 
  let breakRegExp = new RegExp('[^\\w\'-]+', "g");// characters used to break up the input string into words

  this.setEndRegExp = function(regex) {  endRegExp = regex;
										 return endRegExp; };
  this.setBreakRegExp = function(regex) {breakRegExp = regex;
										return breakRegExp;  };
  this.setMatchType = function(type){switch(type){
      case "left": this.openLeft = false;  this.openRight = true;break;
      case "right":this.openLeft = true;   this.openRight = false;break;
      case "open": this.openLeft = this.openRight = true; break;
      default:        this.openLeft = this.openRight = false;    }  };
  this.setRegex = function(input){
    input = input.replace(endRegExp, "");
    input = input.replace(breakRegExp, "|");
    input = input.replace(/^\||\|$/g, "");
    if(input) { let       re = "(" + input + ")";
      if(!this.openLeft)  re = "\\b" + re;
      if(!this.openRight) re = re + "\\b";
      matchRegExp = new RegExp(re, "i");
      return matchRegExp; }
    return false;  };
  this.getRegex = function() { let retval = matchRegExp.toString();
	retval = retval.replace(/(^\/(\\b)?|\(|\)|(\\b)?\/i$)/g, "");
    retval = retval.replace(/\|/g, " ");
    return retval;  };
  this.hiliteWords = function(node){// recursively apply word highlighting
    if(node === undefined || !node) 	return;
    if(!matchRegExp) 					return;
    if(skipTags.test(node.nodeName)) 	return;
    if(node.hasChildNodes()){for(let i=0; i < node.childNodes.length; i++)
								this.hiliteWords(node.childNodes[i]);}
    if(node.nodeType == 3) { // NODE_TEXT
      if((nv = node.nodeValue) && (regs = matchRegExp.exec(nv))) {
        if(!wordColor[regs[0].toLowerCase()]) 
			wordColor[regs[0].toLowerCase()] = colors[colorIdx++ % colors.length];
        let match = document.createElement(hiliteTag);
        match.appendChild(document.createTextNode(regs[0]));
        match.style.backgroundColor = wordColor[regs[0].toLowerCase()];
        match.style.color = "#000";
        let after = node.splitText(regs.index);
        after.nodeValue = after.nodeValue.substring(regs[0].length);
        node.parentNode.insertBefore(match, after);
      }    }  };//      }    };  };

  
  this.remove = function(){let arr = document.getElementsByTagName(hiliteTag);// remove highlighting
    while(arr.length && (el = arr[0])) {let parent = el.parentNode;
					parent.replaceChild(el.firstChild, el);
					parent.normalize();    }  };
  
  this.apply = function(input){ this.remove();// start highlighting at target node
    if(input === undefined || !(input = input.replace(/(^\s+|\s+$)/g, ""))) return;    
    if(this.setRegex(input)) this.hiliteWords(targetNode);    
    return matchRegExp;};
}// end of Highlight
//let lv=a.length;//			   console.log(n +"startloop i="+i); //v=document.getElementById("searchItem").value,
//  <body onfocus="relocate()">
// <body onfocus="relocate(data-active-id)"> 

 //<body >					  	
	// src="nicEdit-latest.js" 
    // bkLib.onDomLoaded(nicEditors.allTextAreas);
