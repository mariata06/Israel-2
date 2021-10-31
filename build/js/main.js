// Валидация форм в блоках Хочу поехать, Контакты, попап
var callbackPopup = document.querySelector(".popup--callback");
var callbackLink = document.querySelector(".page-header__callback-link");
var closeCallbackPopup = callbackPopup.querySelector(".popup__close");
var overlayForm = document.querySelector(".overlay__form");
var overlayOk = document.querySelector(".overlay__ok");
var popupSuccess = document.querySelector(".popup--success");
var closePopupSuccess = popupSuccess.querySelector(".popup__close");
var popupButton = popupSuccess.querySelector(".popup__button");
var htmlDoc = document.querySelector("html");

var requestFormButton = document.querySelector(".request__form-button");
var requestForm = document.forms[0];

var contactsForm = document.forms[1];
var contactsFormButton = document.querySelector(".contacts__form-button");

var callbackForm = document.forms[2];
var formCheckbox = document.querySelector(".callback-form__checkbox");
var formButton = callbackForm.querySelector(".callback-form__button");

var userName = "";
var userPhone = "";

var isStorageSupport = true;
var currentName = "";
var currentPhone = "";

try {
  currentName = localStorage.getItem("userName");
  currentPhone = localStorage.getItem("userPhone");

} catch (err) {
  isStorageSupport = false;
}

callbackLink.addEventListener("click", function (evt) {
  evt.preventDefault();
  userName = callbackForm.elements.user_name;
  userPhone = callbackForm.elements.user_phonenumber;
  callbackPopup.classList.add("popup--callback--show");
  overlayForm.classList.add("overlay__form--show");
  htmlDoc.classList.add("disable-scroll");
  userName.focus();
  if (currentName && currentPhone) {
    userName.value = currentName;
    userPhone.value = currentPhone;
  }
});

closeCallbackPopup.addEventListener("click", function (evt) {
  evt.preventDefault();
  callbackPopup.classList.remove("popup--callback--show");
  overlayForm.classList.remove("overlay__form--show");
  htmlDoc.classList.toggle("disable-scroll");
});

function closePopup() {
  popupSuccess.classList.remove("popup--success--show");
  overlayOk.classList.remove("overlay__ok--show");
  htmlDoc.classList.toggle("disable-scroll");
}

closePopupSuccess.addEventListener("click", function (evt) {
  evt.preventDefault();
  closePopup();
});

popupButton.addEventListener("click", function (evt) {
  evt.preventDefault();
  closePopup();
});

var checkLocalStorage = function () {
  if (isStorageSupport) {
    localStorage.setItem("userName", userName.value);
    localStorage.setItem("userPhone", userPhone.value);
  }
  overlayOk.classList.add("overlay__ok--show");
  popupSuccess.classList.add("popup--success--show");
  htmlDoc.classList.toggle("disable-scroll");
}

callbackForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  checkLocalStorage();
  callbackPopup.classList.remove("popup--callback--show");
  overlayForm.classList.remove("overlay__form--show");
  htmlDoc.classList.toggle("disable-scroll");
});

window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    if (overlayForm.classList.contains("overlay__form--show")) {
      overlayForm.classList.remove("overlay__form--show");
      htmlDoc.classList.toggle("disable-scroll");
    } else if (overlayOk.classList.contains("overlay__ok--show")) {
        overlayOk.classList.remove("overlay__ok--show");
        htmlDoc.classList.toggle("disable-scroll");
    }
  }
});

document.onclick = function (evt) {
  if (evt.target.className.toString().includes("overlay")) {
    overlayForm.classList.remove("overlay__form--show");
    overlayOk.classList.remove("overlay__ok--show");
    htmlDoc.classList.remove("disable-scroll");
  };
};

formButton.toggleAttribute("disabled");
formCheckbox.addEventListener("change", function () {

  if (formCheckbox.checked) {
    formButton.removeAttribute("disabled");
  } else {
    formButton.toggleAttribute("disabled");
  }
});

requestForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  userPhone = requestForm.elements.user_phonenumber;
  checkLocalStorage();
});

contactsForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  userName = contactsForm.elements.user_name;
  userPhone = contactsForm.elements.user_phonenumber;
  checkLocalStorage();
});

var phoneInputs = document.querySelectorAll(".input--phone");
phoneInputs.forEach(function (item) {
  item.addEventListener("input", function (e) {
    if(e.target.value.length == 1) {
      var x = e.target.value.replace(/\D/g, "").match(/(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
    } else {
      var x = e.target.value.substring(2,e.target.value.length).replace(/\D/g, "").match(/(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
    }
    e.target.value = !x[2] ? "+7 (" + x[1] : "+7 (" + x[1] + ") " + (x[3] ? x[2]  + "-" : x[2]) + x[3] + (x[4] ? "-" + x[4] : "");

    if (e.target.value.length == 18) {
      item.style.borderColor = "#484848";
      errorMessages.forEach(element => {
        element.classList.remove("error-message--show");
      });
      console.log("ошибки нет?");
      item.setCustomValidity("");
    }
  });
});

var errorMessages = document.querySelectorAll(".error-message");
phoneInputs.forEach(function (item) {
  item.addEventListener("invalid", function () {
    if (item.validity.patternMismatch) {
      item.setCustomValidity("Телефон должен состоять из 11 цифр");
      item.style.borderColor = "#ff0000";
      var currentErrorMessage = item.parentElement.parentElement.querySelector("p");
      currentErrorMessage.classList.add("error-message--show");
    } else {
      item.setCustomValidity("");
      item.style.borderColor = "#484848";
      console.log("ошибки нет?");
    }
  });
});

// Переключение вкладок - табов в блоке Программы
var chooseProgramItem = function () {
  var programChoiceItem = document.querySelectorAll(".program__choice-item");
  var programItem = document.querySelectorAll(".program__item");
  var programName;

  programChoiceItem.forEach(function (item) {
    item.addEventListener('click', toggleProgramChoiceItem)
  });

  function toggleProgramChoiceItem() {
    programChoiceItem.forEach(function (item) {
      item.classList.remove("program__choice-item--active")
    });
    this.classList.add("program__choice-item--active");
    programName = this.getAttribute("data-tab-name");
    selectProgramContent(programName);
  }

  function selectProgramContent(programName) {
    programItem.forEach(function (item) {
      if (item.classList.value.includes(programName)) {
        item.classList.add("program__item--active")
      } else {
        item.classList.remove("program__item--active");
      }
    })
  }
};

chooseProgramItem();

// Переключение меню - аккордеона в блоке Частые вопросы
var accordionItemTrigger = document.querySelectorAll(".accordion__item-trigger");
var accordionItem = document.querySelectorAll(".accordion__item");
var arrowItems = document.querySelectorAll(".accordion__item-svg");

var activeArrow = document.querySelector(".accordion__item--active").querySelector(".accordion__item-svg");
activeArrow.style.transform = "rotate(180deg)";

accordionItemTrigger.forEach(function (item) {
  item.addEventListener("click", () => {
    arrowItems.forEach(function (item) {
      item.style.transform = "none";
    })

    const parent = item.parentNode;
    var arrowItem = item.querySelector(".accordion__item-svg");
    arrowItem.style.transform = "rotate(360deg)";
    if (parent.classList.contains("accordion__item--active")) {
      parent.classList.remove("accordion__item--active");
    } else {
      accordionItem.forEach((child) => child.classList.remove("accordion__item--active"))

      parent.classList.add("accordion__item--active");
      arrowItem.style.transform = "rotate(180deg)";
    }
  })
});


// Инициализация свайпер-слайдера в блоке Отзывы
var swiper = new Swiper(".swiper-container.swiper-container--reviews", {
  pagination: {
    el: ".swiper-pagination",
    type: "fraction",
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  initialSlide: 2
});

// Инициализация свайпер-слайдеров в блоках: Жизнь в Израиле, Программы (когда в мобильной версии табы превращаются в свайпер-слайдер)
var swiper = Swiper;
var swiper2 = Swiper;
var swiperExist = false;

/* Which media query
**************************************************************/
function swiperMode() {
  let mobile = window.matchMedia("(min-width: 0px) and (max-width: 767px)"); // было max-width: 768px
  let tablet = window.matchMedia("(min-width: 768px) and (max-width: 1023px)"); // было (min-width: 769px) and (max-width: 1024px)
  let desktop = window.matchMedia("(min-width: 1024px)"); // было (min-width: 1025px)

  // Enable (for mobile)
  if(mobile.matches) {
    if (!swiperExist) {
      swiperExist = true;
      swiper = new Swiper(".swiper-container.swiper-container--internship", {
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      });
      swiper2 = new Swiper(".swiper-container.swiper-container--programmes", {
        slidesPerView: "auto", //1.9,//window.innerWidth*3.1/568 + 5 - 3.1*768/568,//1.9,
      });
    }
  }
    // Disable (for tablet)
  else if(tablet.matches) {
    if (swiperExist) {
      swiper.destroy();
      swiper2.destroy();
      swiperExist = false;
    }
  }
    // Disable (for desktop)
  else if(desktop.matches) {
    if (swiperExist) {
      swiper.destroy();
      swiper2.destroy();
      swiperExist = false;
    }
  }
}

/* On Load
**************************************************************/
window.addEventListener("load", function() {
  swiperMode();
});

/* On Resize
**************************************************************/
window.addEventListener("resize", function() {
  swiperMode();
});

