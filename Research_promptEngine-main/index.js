var components = 0 //keep track of how many components are there
var tagRows = 0

// the function to make the delete icon on tags work
function delSvgToLi(clicked_id) {
  svg = document.getElementById(clicked_id); // find the svg 
  svg.parentElement.parentElement.remove(); // remove the tag
  ms = document.getElementById("materialStuff");
  fi = document.getElementById("finishStuff")
  co = document.getElementById("colorStuff")
  re = document.getElementById("renderStuff")
  // fi.innerHTML = "" // why?
  // re.innerHTML = ""
  if (clicked_id == "delSvg#0") {
    co.innerHTML = ""
    ele = document.getElementById("colorText")
    ele.innerHTML = ""
  } else if (clicked_id == "delSvg#1") {
    ms.innerHTML = ""
    ele = document.getElementById("materialText")
    ele.innerHTML = ""
  } else if (clicked_id == "delSvg#2") {
    fi.innerHTML = ""
    ele = document.getElementById("finishText")
    ele.innerHTML = ""
  } else {
    re.innerHTML = ""
    ele = document.getElementById("renderText")
    ele.innerHTML = ""
  }
  components -= 1
  getFullText()
}


function addStyle() {
  str = "rendering"
  oc = `addColor(${components}, 3)` 
  i = components
  li =
    `
      <li class="nav-item deleteTag" id="deleteTag#${i}">
        <span class="badge d-flex align-items-center p-1 pe-2 text-secondary-emphasis bg-light-subtle border border-dark-subtle rounded">
          <img class="rounded-circle me-1" id="thumbnail#${i}" width="18" height="18" src="img/default_${str}.png" alt="">
          <div onclick="${oc}" id="tag#${i}" class="component">
          ${str}
          </div>
          &nbsp&nbsp
          <svg class="bi" width="12" height="12" id="delSvg#${components}" onclick="delSvgToLi(this.id)">
            <use xlink:href="#x-circle-fill" />
          </svg>
        </span>
      </li>
    `

  tagList4.insertAdjacentHTML('beforeend', li);
  components++;
  getFullText()
  return li
}




function addTag() {
  text = ""
  fullTagList = ""
  for (var i = 0; i < 3; i++) {
    if (i % 3 == 0) { // the sequence of adding elements using the loop
      str = "color"
      oc = `addColor(${components}, 0)`
    }
    else if (i % 3 == 1) { 
      str = "finish"
      oc = `addColor(${components}, 2)`
    }
    else if (i % 3 == 2) {
      str = "material"
      oc = `addColor(${components}, 1)`
    }
    li =
      //tag item display below
      `
      <li class="nav-item deleteTag collapse navbar-collapse" > 
        <span class="badge d-flex align-items-center text-secondary-emphasis bg-light-subtle border border-dark-subtle rounded" id="deleteTag#${components}">
          <img class="rounded-circle me-1" id="thumbnail#${components}" width="18" height="18" src="img/default_${str}.png" alt="">
          <div onclick="${oc}" id="tag#${components}" class= "component"> 
            ${str}
          </div>
          &nbsp&nbsp
          <svg class="bi" width="12" height="12" id="delSvg#${components}" onclick="delSvgToLi(this.id)">
            <use xlink:href="#x-circle-fill" />
          </svg>
        </span>
      </li>

    `
    tagListNum = Math.floor(components/4)
    if (tagListNum == 0){
    tagList0.insertAdjacentHTML('beforeend', li);
    } 
    else if (tagListNum == 1){
      tagList1.insertAdjacentHTML('beforeend', li);
    }
    else if (tagListNum == 2){
      tagList2.insertAdjacentHTML('beforeend', li);
    }
    components += 1
  }
  getFullText()
  console.log(components);
}

function createUl(text){

  addInput(text);
  addTag();

}

// components -> global variable
function addInput(text) { 
  li =
    `
  <li class="xs-2 col-sm-2 px-1">
      <input id="tag#${components}" 
             value="${text}" 
             class="form-control textInput component" 
             placeholder=${text}
             >
  </li>
  `
  tagListNum = Math.floor(components/4)
  if (tagListNum == 0){
  tagList0.insertAdjacentHTML('beforeend', li);
  } 
  else if (tagListNum == 1){
    tagList1.insertAdjacentHTML('beforeend', li);
  }
  else if (tagListNum == 2){
    tagList2.insertAdjacentHTML('beforeend', li);
  }
  
  li = document.getElementById(`tag#${components}`)
  const inputHandler = function (e) { // TODO: know what it means
    getFullText()
  }
  li.addEventListener('input', inputHandler)
  components += 1
}

function changeText(tagIdx, cfmIdx, text) {
  tagIdx = parseInt(tagIdx.split("#")[1])
  id1 = `tag#${tagIdx}`
  text1 = text
  // TODO: fix this prompt generation functionality
  if (cfmIdx == 0) {
    id = "colorText"
    text = "in " + text
  } else if (cfmIdx == 1) {
    id = "materialText"
    text = text
  } else if (cfmIdx == 2) {
    id = "finishText"
    text = text
  } else {
    id = "renderText"
    text = text + " style."
  }
  document.getElementById(id1).innerHTML = text1  // change the tag text

  getFullText()
}

function changeThumbnail(tagIdx, cfmIdx, text) {
  tagIdx = parseInt(tagIdx.split("#")[1])
  id = `thumbnail#${tagIdx}`
  img = document.getElementById(id)
  if (cfmIdx == 0) {
    category = "color"
  } else if (cfmIdx == 1) {
    category = "material"
  } else if (cfmIdx == 2) {
    category = "finish"
  } else {
    category = "render"
  }
  img.src = `img/${category}/${text}.png`
}

const colorList = ['maroon', 'plum', 'purple', 'violet', 'lavender', 'pink', 'mauve',
  'lilac', 'grey', 'brown', 'black', 'indigo', 'blue', 'teal', 'green',
  'aqua', 'olive', 'lime', 'red', 'orange', 'salmon', 'peach', 'mustard',
  'ochre', 'yellow', 'cream']
const materialList = ['leather', 'wood', 'canvas', 'metal', 'rubber', 'diamond', 'plastic',
  'marble', 'concrete', 'gold', 'silver', 'aluminum', 'cloth', 'ceramic', 'liquid']
const finishList = ['gloss', 'high gloss', 'matt', 'brushed', 'polished', 'satin', 'antique',
  'hammered', 'embossed', 'debossed', 'oxidation', 'semi gloss', 'broken glass', 'polished plaster']
const renderList = ['3d rendering', 'watercolor', 'oil paint', 'vector art', 'drawn sketch',
  'photorealistic', 'digital art', 'patent drawing', 'cinematic', 'anmie', 'isometric 3d', 'ikea manual',
  'cutaway', 'lowpoly']


function getFullText() {
  wholeText = ""

  ll = document.getElementsByClassName("component")

  for (var i = 0; i < ll.length; i++) {
    ele = ll[i]
    if (ele.id.startsWith("textInput#")) {
      eleText = ele.value
    } else {
      eleText = ele.innerText;
      if (renderList.includes(eleText)){
        console.log(renderList.includes(eleText))
          eleText = ", " + eleText + " style"
      }
    }
    wholeText = wholeText + " " + eleText
  }
  document.getElementById("fullText").innerHTML = wholeText
}

function addColor(tagIdx, cfmIdx) {  
  // show the card at the bottom of the documentssssssss
  ms = document.getElementById("materialStuff");
  fi = document.getElementById("finishStuff") // why put in this label?
  co = document.getElementById("colorStuff")
  re = document.getElementById("renderStuff")
  fi.innerHTML = "" 
  co.innerHTML = ""
  re.innerHTML = ""
  ms.innerHTML = ""
  oneColStyle = false // by default two cols

  if (cfmIdx == 0) { // cfmIdx is for 
    pane = "color"
    list = colorList
    oneColStyle = true
  } else if (cfmIdx == 1) {
    pane = "material"
    list = materialList
  } else if (cfmIdx == 2) {
    pane = "finish"
    list = finishList
  } else if (cfmIdx == 3){
    pane = "render"
    list = renderList
  }

  str = ""
  for (let i = 0; i < list.length; i++) {
    initialCap = list[i].charAt(0).toUpperCase() + list[i].slice(1)
    if (oneColStyle){

    // tagIdx:  cmfIdx: change 
    s = `
    
    <div class="col-sm-1 p-0 m-2">
      <div class="card">
        <img src="img/${pane}/${list[i]}.png" class="card-img" alt="img" style = "height:150px">
        <div id="changeText#${tagIdx}" 
             onclick="changeText(this.id, ${cfmIdx},'${list[i]}'); changeThumbnail(this.id, ${cfmIdx}, '${list[i]}')" 
             class="card-img-overlay align-items-center d-flex justify-content-center">
          <p class="card-text text-center">${initialCap}</p>
        </div>
      </div>
    </div>
    `}
    else{
    s = `
    <div class="col-sm-2 p-0 m-2">
      <div class="card">
        <img src="img/${pane}/${list[i]}.png" class="card-img" alt="img" style = "height:150px">
        <div id="changeText#${tagIdx}" 
             onclick="changeText(this.id, ${cfmIdx},'${list[i]}'); changeThumbnail(this.id, ${cfmIdx}, '${list[i]}')" 
             class="card-img-overlay align-items-center d-flex justify-content-center">
          <p class="card-text text-center">${initialCap}</p>
        </div>
      </div>
    </div>
    `
    }
    str += s
  }
  // ms.insertAdjacentHTML('afterbegin', str);
  fi.innerHTML = str

}


function showImg() {
  ms = document.getElementById("materialStuff");
  fi = document.getElementById("finishStuff")
  co = document.getElementById("colorStuff")
  re = document.getElementById("renderStuff")
  fi.innerHTML = ""
  co.innerHTML = ""
  re.innerHTML = ""
  ms.innerHTML = ""

  str = `
<div class="row container mx-2">
  <div class="col-sm-3 mb-3">

  <div class="card">
    <img src="img/results/result1.png" class="card-img" alt="img">
  </div>
</div>

<div class="col-sm-3 mb-3">

  <div class="card">
    <img src="img/results/result2.png" class="card-img" alt="img">
  </div>
</div>

<div class="col-sm-3 mb-3">

  <div class="card">
    <img src="img/results/result3.png" class="card-img" alt="img">
  </div>
</div>

<div class="col-sm-3 mb-3">

  <div class="card">
    <img src="img/results/result4.png" class="card-img" alt="img">
  </div>
</div>
</div>

  `
  // ms.insertAdjacentHTML('afterbegin', str);
  re.innerHTML = str

}

function removeAll() {
  document.getElementById("colorText").innerHTML = "";
  document.getElementById("colorStuff").innerHTML = "";

  document.getElementById("finishText").innerHTML = "";
  document.getElementById("finishStuff").innerHTML = "";

  document.getElementById("materialText").innerHTML = "";
  document.getElementById("materialStuff").innerHTML = "";

  document.getElementById("renderText").innerHTML = "";
  document.getElementById("renderStuff").innerHTML = "";

  tags = document.getElementsByClassName("deleteTag")
  while (tags.length > 0) {
    tags[0].parentNode.remove()
  }

  tags = document.getElementsByClassName("textInput")
  while (tags.length > 0) {
    tags[0].parentNode.remove()
  }
  
  components = 0
  getFullText()
}