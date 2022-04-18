/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
	this.rows = rows;
	this.elem = this.render();
  }
  render(){
   const table = document.createElement("table");

 	let thead = document.createElement('thead');
	let textHead = ["Имя","Возраст","Зарплата","Город",""];
	let trow = document.createElement('tr');
	for (let i = 0; i < textHead.length; i++) {
		let th = document.createElement('th');
		th.innerHTML = textHead[i];
		trow.appendChild(th);
	}
	thead.appendChild(trow);
	table.appendChild(thead);
	
	let tbody = document.createElement('tbody');

	let valeusRows = [];
	for (let i = 0; i < this.rows.length; i++) {
		valeusRows = Object.values(this.rows[i]);
		let trow = document.createElement('tr');
        for (let j = 0; j < 4; j++) {
			let tdet = document.createElement('td');
			tdet.innerHTML = valeusRows[j];   
			trow.appendChild(tdet);                            
		}
	   let tdet = document.createElement('td');	
	   let tdbutton =  document.createElement('button');
	   let buttext = document.createTextNode('X');
	   tdbutton.appendChild(buttext);
	   tdet.appendChild(tdbutton);
	   trow.appendChild(tdet);
      tbody.appendChild(trow);
	  
	   tdbutton.addEventListener("click", function(event) { 
         if ( event.target.tagName !== 'BUTTON') return;
			event.target.parentElement.parentElement.remove();
		 
	   } )
						  
	} 
   table.appendChild(tbody);
	
   return table; 
  } 
}
