import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  
	constructor(slides) {
     this.slides = slides;
	  this.elem = this.render();
	  this.initCarousel();
  };

  render() 	{
	
	let innerHTML = `
	<div class="carousel">
	  <!--Кнопки переключения-->
	  <div class="carousel__arrow carousel__arrow_right">
		 <img src="/assets/images/icons/angle-icon.svg" alt="icon">
	  </div>
	  <div class="carousel__arrow carousel__arrow_left">
		 <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
	  </div>
	  <div class="carousel__inner">`;

	  this.slides.forEach(function(item) {
			innerHTML = innerHTML + ` 	  		
			 	<!--Верстка одного слайда-->
		 		<div class="carousel__slide" data-id=` + item.id  + `>  
					<img src="/assets/images/carousel/` + item.image + `" class="carousel__img" alt="slide">
					<div class="carousel__caption">
			  			<span class="carousel__price">€` + item.price.toFixed(2) + `</span>
			  			<div class="carousel__title">` + item.name + `</div>
			  			<button type="button" class="carousel__button">
				 			<img src="/assets/images/icons/plus-icon.svg" alt="icon">
			  			</button>
					</div>
				</div>`
  		});
		innerHTML = innerHTML + `
		   </div>
      </div>
    </div>`;
   
	 	const container = createElement(innerHTML);
		return container;
		};  // end render

		initCarousel() {
			 let arrowRight = this.elem.querySelector(".carousel__arrow_right");  // Кнопка вперед
			 let arrowLeft = this.elem.querySelector(".carousel__arrow_left");    // Кнопка назад
			 let slider = this.elem.querySelector(".carousel__inner");  	  // Слайдер со всеми слайдами 	
			 
			 const carouselSlide = this.elem.querySelectorAll(".carousel__slide");
			 let countSlides = carouselSlide.length;   //Количество слайдов
			 let styleLeft = ''; // смещение  слайдера
			 let currentNumSlide = 0; // Текущий номер слайда
			 const buttons = this.elem.querySelectorAll('.carousel__button');

			 arrowLeft.style.display = 'none'; // Начальная видимость кнопки
			
			 arrowRight.addEventListener("click", function () {// Клик на кнопку вперёд
				currentNumSlide++;
				sliderTransform();	
			 });
		  
			 arrowLeft.addEventListener("click", function () {	// Клик на кнопку назад
				currentNumSlide--;
				sliderTransform();
			 });
		 
			 function sliderTransform() { //Видимость кнопок и позиция слайдера
				if (currentNumSlide < countSlides - 1) { 
					 arrowRight.style.display = '';
				} else { 
						 arrowRight.style.display = 'none';
				 		}
		 
			   if (currentNumSlide > 0) { 
					 arrowLeft.style.display = '';
			   } else { 
						 arrowLeft.style.display = 'none';
			  			}
	
			   let viewWidth = carouselSlide[0].offsetWidth;   // Видимая ширина
			 
			   styleLeft = -currentNumSlide * viewWidth + "px"; //
				slider.style.transform = 'translateX(' + styleLeft + ')';
			 }//  end sliderTransform
	
			this.elem.addEventListener("click", function(event) { 	
				if (event.target.parentElement.tagName !== 'BUTTON') return;
				if (event.target.parentElement.className !== "carousel__button") return;
				this.dataId =  carouselSlide[currentNumSlide].attributes[1].nodeValue;
					// генерация пользовательского события
				let eventAdd = new CustomEvent("product-add", {detail: this.dataId, bubbles: true}); // (2)
				buttons[currentNumSlide].dispatchEvent(eventAdd);  
		  	
			}); // end click
		
	}; // end initCarousel
		
	
}  // end Carousel