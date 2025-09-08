const changeHeight = () => {
	let  vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty('--vh', `${vh}px`);
}
changeHeight();

window.addEventListener('resize', () =>  {
	changeHeight();
});

function openModal(popup_n) {
	let popup = document.querySelector('.popup.opened');
	if (popup != null) popup.classList.remove('opened');

	popup = document.querySelector('.popup[data-popup="' + popup_n + '"]');
	popup.classList.add('opened');
	let b = document.querySelector('body');
	b.classList.add('noscroll');
}
function closeModal() {
	let popup = document.querySelector('.popup.opened');
	popup.classList.remove('opened');

	let b = document.querySelector('body');
	b.classList.remove('noscroll');
}

document.addEventListener('DOMContentLoaded', () => {

	// AOS.init({
	// 	once: true,
	// 	offset: 200,
	// 	duration: 800,
	// 	easing: 'ease-in-out',
	// 	disable: function () {
	// 		var maxWidth = 1024;
	// 		return window.innerWidth < maxWidth;
	// 	}
	// })

	document.querySelectorAll('.js-phone-mask').forEach(phone => {
		var patternMask = IMask(phone , {mask: '+375 (00) 000-00-00', lazy: true, placeholderChar: '_' });

		phone.addEventListener('focus', () => {
			if (!phone.value) {
			//   patternMask.value = '';
			}
			patternMask.updateOptions({ lazy: false });
		});
		
		 phone.addEventListener('blur', () => {
			if (patternMask.unmaskedValue.trim() === '') {
				// phone.value = '';
			}

			patternMask.updateOptions({ lazy: true });
			if (!patternMask.masked.rawInputValue) {
				patternMask.value = '';
			}
		  });
	})

	document.querySelectorAll('.js-choice').forEach(choice => {
		new Choices(choice, {shouldSort: false, searchEnabled: false})
	})
	new Counter('.js-counter-1');
	new Counter('.js-counter-2');



	if (document.querySelector('[data-fancybox]'))
		Fancybox.bind("[data-fancybox]", {
			
	});
	
	

	let scrollPosition = window.pageYOffset;
	if (scrollPosition > 0) document.querySelector('header').classList.add('fixed');


	window.addEventListener('scroll', function(){  
		scrollPosition = window.pageYOffset;    
		
		if (scrollPosition > 0) document.querySelector('header').classList.add('fixed'); 
		else document.querySelector('header').classList.remove('fixed'); 
	});

	
	let btn_scroll = document.querySelectorAll('[data-scroll]');
	btn_scroll.forEach((item) => {
		item.addEventListener('click', (e) => {
			e.preventDefault();
	
			const headerOffset = document.querySelector('header').offsetHeight + 10;
			const element = document.querySelector('#'+e.currentTarget.dataset.scroll)
			const elementPosition = element.getBoundingClientRect().top;
			const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
		
			window.scrollTo({
				top: offsetPosition,
				behavior: "smooth"
			});

			
			document.querySelector('.js-open-navfix').classList.remove('active');
			document.querySelector('.js-navfix').classList.remove('opened');
		});
	});
	
	/**************************************************************
	ПОПАПЫ
	**************************************************************/
	let btn_popup = document.querySelectorAll('[data-open-popup]');
	btn_popup.forEach((item) => {
		item.addEventListener('click', (e) => {
			e.preventDefault();

			openModal(e.currentTarget.dataset.openPopup);
		});
	});

	let btn_popup_close = document.querySelectorAll('.js-popup-close');
	btn_popup_close.forEach((item) => {
		item.addEventListener('click', (e) => {
			e.preventDefault();

			closeModal();
		});
	});

	document.addEventListener('keydown', function(e) {
		if (e.key == "Escape") {
			closeModal();
		}
	  });

	/**************************************************************
	меню
	**************************************************************/
	document.querySelectorAll('.js-open-navfix').forEach(item => {
		item.addEventListener('click', e => {
			e.preventDefault();

			e.currentTarget.classList.toggle('active');
			document.querySelector('.js-navfix').classList.toggle('opened');
			// document.querySelector('body').classList.toggle('noscroll');
		});
	});
	document.querySelectorAll('.js-close-navfix').forEach(item => {
		item.addEventListener('click', e => {
			e.preventDefault();

			document.querySelector('.js-open-navfix').classList.remove('active');
			document.querySelector('.js-navfix').classList.remove('opened');
			// document.querySelector('body').classList.remove('noscroll');
		});
	});


	document.querySelectorAll('.js-menu-toggle').forEach(item => {
		item.addEventListener('click', e => {
			const self = e.currentTarget;
			const parent = self.closest('li');
			const list = self.nextElementSibling;

			parent.classList.toggle('opened');

			
			if (!list.classList.contains('opened')) {
				list.style.maxHeight = list.scrollHeight + 'px';
			} else {
				list.style.maxHeight = null;
			}

			list.classList.toggle('opened');
		})
	})

	/**************************************************************
	Табы
	**************************************************************/
	const showTab = (elTabBtn) => {
		const elTab = elTabBtn.closest('.js-tabs');
		if (elTabBtn.classList.contains('active')) {
		  return;
		}
		const targetId = elTabBtn.dataset.tab;
		const elTabPane = elTab.querySelector(`.js-tabs-content[data-tab="${targetId}"]`);
		if (elTabPane) {
		  const elTabBtnActive = elTab.querySelector('.js-tabs-btn.active');
		  elTabBtnActive.classList.remove('active');
		  const elTabPaneShow = elTab.querySelector('.js-tabs-content.active');
		  elTabPaneShow.classList.remove('active');
		  elTabBtn.classList.add('active');
		  elTabPane.classList.add('active');
		}
	}
	
	document.addEventListener('click', (e) => {
		if (e.target && !e.target.closest('.js-tabs-btn')) {
			return;
		}
		console.log(e);
		e.preventDefault();
		const elTabBtn = e.target.closest('.js-tabs-btn');
		showTab(elTabBtn);
	});

	/**************************************************************
	Аккордеон
	**************************************************************/
	const accordAll = document.querySelectorAll('.js-accord-toggle');
	accordAll.forEach(item => {
		const parent = item.closest('.js-accord-item');
		const content = parent.querySelector('.js-accord-body');

		if (parent.classList.contains('opened')) {
			content.style.maxHeight = content.scrollHeight + 'px';
		}

		item.addEventListener('click', e => {
			const self = e.currentTarget;
			const faq = self.closest('.js-accord');

			if (!parent.classList.contains('opened')) {
				const itemOpened = faq.querySelector('.js-accord-item.opened');
				if (itemOpened) {
					itemOpened.querySelector('.js-accord-body').style.maxHeight = null;
					itemOpened.classList.remove('opened');
				}
		

				if (faq.classList.contains('js-accord-openscroll'))
					//setTimeout(() => {
						parent.scrollIntoView({
							behavior: 'smooth',
							block: 'center'
						});	
						
					//}, 400);
				
				
				content.style.maxHeight = content.scrollHeight + 'px';
			} else {
				content.style.maxHeight = null;
			}

			parent.classList.toggle('opened');
		})
	})

	/**************************************************************
	Раскрытие блока
	**************************************************************/
	const itemToggleAll = document.querySelectorAll('.js-item-toggle');
	itemToggleAll.forEach(item => {

		item.addEventListener('click', e => {
			const self = e.currentTarget;
			const parent = self.closest('.js-item');
			const content = parent.querySelector('.js-item-body');

			if (!parent.classList.contains('opened')) {
				content.style.maxHeight = content.scrollHeight + 'px';
			} else {
				content.style.maxHeight = null;
			}

			parent.classList.toggle('opened');
		})
	})

	/**************************************************************
	Раскрытие текста
	*************************************************************/
	const linkToggleAll = document.querySelectorAll('.js-link-toggle');
	linkToggleAll.forEach(item => {

		item.addEventListener('click', e => {
			e.preventDefault();

			const self = e.currentTarget;
			const content = self.parentNode.querySelector('.js-text-toggle');

			if (!self.classList.contains('opened')) {
				content.style.maxHeight = content.scrollHeight + 'px';
			} else {
				content.style.maxHeight = null;
			}

			self.classList.toggle('opened');
		})
	})

	
	
	/**************************************************************
	cookie
	**************************************************************/
	function getCookie(name) {

		var matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
	
		return matches ? decodeURIComponent(matches[1]) : undefined;
	
	}


	if (document.querySelector('.js-cookie')) {
		if (getCookie('cookie_inf') === '1') {
			document.querySelector('.js-cookie').remove();					
		}  else {
			setTimeout(() => {
				document.querySelector('.js-cookie').classList.add('opened');
			}, 200);
		}
	
		document.addEventListener('click', function(e){
			if(e.target.classList.contains('js-cookie-save')) {
				document.querySelector('.js-cookie').classList.remove('opened');
				document.cookie = "cookie_inf=1; path=/; max-age="+60*60*24*30;
			}
			
			if(e.target.classList.contains('js-cookie-close')) {
				document.querySelector('.js-cookie').classList.remove('opened');
			}
		});
	}



	/**************************************************************
	Carousel
	**************************************************************/
	new Swiper(".js-hero-adv-slider", {
		slidesPerView: 1,
		spaceBetween: 0,
		resistanceRatio: 0,
		loop: true,
		allowTouchMove: false,
		effect: "fade",		
		fadeEffect: {
			crossFade: true
		},
		speed: 1000,
		autoplay: {
			delay: 2000,
			disableOnInteraction: false
		},
	});

	new Swiper(".js-partners-slider", {
		slidesPerView: 1,
		spaceBetween: 20,
		resistanceRatio: 0,
	    loop: true,
		speed: 500,
		autoplay: {
			delay: 2000,
			disableOnInteraction: false
		},
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
		pagination: {
			el: ".js-partners-slider-pagination",
			clickable: true
		},
	});

	
})


document.addEventListener('DOMContentLoaded', () => {    
    const stepsSlider = document.querySelectorAll('.js-calc-range');

    stepsSlider.forEach(item => {
		
		noUiSlider.create(item, {
			start: item.dataset.start,
			connect: [true, false],
			range: {
				'min': +item.dataset.min,
				// '50%': range_center,
				'max': +item.dataset.max
			},
			step: +item.dataset.step,
			format: wNumb({
				decimals: 0,
				thousand: ' '
			}),    
		});
         

        item.noUiSlider.on('update', function (values, handle) {
			const suff = item.dataset.suff ? ' '+item.dataset.suff : '';
			const parent = item.closest('.js-calc-item');
			parent.querySelector('.js-calc-item-input').value = values[handle];
			parent.querySelector('.js-calc-item-val').innerHTML  = values[handle] + suff;

			const count_docs =  +document.querySelector('.js-calc [name=count_docs]').value;
			const count_empl =  +document.querySelector('.js-calc [name=count_empl]').value;
			const res = count_docs / 50 * 17;
			document.querySelector('.js-calc-result').innerHTML = res;
        });
        
    })
})    