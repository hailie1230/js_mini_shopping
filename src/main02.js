// 제이슨 파일의 아이템을 fetch
function loadItems (){
  return fetch('data/data.json')
    .then(response => response.json())
    .then(json => json.items);
}

//모든 아이템들 업데이트 
function dispalyItems(itmes){
  const container = document.querySelector('.items');
  container.innerHTML = itmes.map(item => createHTMLstring(item)).join('');

}

//  html 태그로 li item 만들기 
function createHTMLstring(item){
  return `
  <li class="item">
    <img src="${item.image}" alt="${item.type}" class="item__thumbnail">
    <span class="item__description">${item.gender}, ${item.size}</span>
  </li>
  `;
}

function onButtonClick(event, items){
  const dataset = event.target.dataset;
  const key = dataset.key;
  const value = dataset.value;

  if(key == null || value == null){
    return;
  }
  const filtered = items.filter(item => item[key] === value);
  console.log(filtered);
  dispalyItems(filtered);
  
}

// function onButtonClick(event, items){
//   const target = event.target;
//   const key = target.dataset.key;
//   const value = target.dataset.value;

//   if(key == null || value == null){
//     return;
//   }
//   updateItems(items, key, value);
// }

// function updateItems (items, key, value){
//   items.forEach(item => {
//     if(item.dataset[key] === value){
//       // console.log(item);
//       item.classList.remove('invisible');
//     } else {
//       // console.log(item);
//       item.classList.add('invisible');
//     }
//   });
// }

function setEventListener(items){
  const logo = document.querySelector('.logo');
  const buttons = document.querySelector('.buttons');
  logo.addEventListener('click', () => dispalyItems(items));
  buttons.addEventListener('click', event => onButtonClick(event, items));
}

//main
loadItems()
.then(items => {
  console.log(items);
  dispalyItems(items);
  setEventListener(items);
})
.catch(console.log);