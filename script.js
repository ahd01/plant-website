let menu = document.querySelector("#menu-bar");
let navbar = document.querySelector(".navbar");
let header = document.querySelector(".header-3");
let scrollTop = document.querySelector(".scroll-top");

menu.addEventListener("click", () => {
  menu.classList.toggle("fa-times");
  navbar.classList.toggle("active");
});

// window.onscroll = () => {
//   menu.classList.remove("fa-times");
//   navbar.classList.remove("active");

//   if (window.scrollY > 250) {
//     header.classList.add("active");
//   } else {
//     header.classList.remove("active");
//   }

//   if (window.scrollY > 250) {
//     scrollTop.style.display = "initial";
//   } else {
//     scrollTop.style.display = "none";
//   }
// };

var swiper = new Swiper(".home-slider", {
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  loop: true,
});

//OPEN AND CLOSE CART

const cartIcon = document.querySelector("#cartIcon");
const cart = document.querySelector(".cart");
const closeCart = document.querySelector("#cartClose");

cartIcon.addEventListener("click", () => {
  cart.classList.add("active");
});
closeCart.addEventListener("click", () => {
  cart.classList.remove("active");
});

//start when the document is ready

if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", start);
} else {
  start();
}

//=====================START===========

function start() {
  addEvents();
}

//=========================UPDATE========

function update() {
  addEvents();
  updateTotal();
}

//=======================ADD EVENTS========

function addEvents() {
  //REMOVE ITEMS FROM CART
  let cartRemove_btns = document.querySelectorAll(".cart-remove");
  console.log(cartRemove_btns);
  cartRemove_btns.forEach((btn) => {
    btn.addEventListener("click", handle_removeCartItem);
  });

  //CHANGE ITEMS QUANTITY
  let cartQuantity_inputs = document.querySelectorAll(".cartQuantity");
  cartQuantity_inputs.forEach((input) => {
    input.addEventListener("change", handle_changeItemQuantity);
  });

  //ADD ITEMS TO CART
  let addCart_btns = document.querySelectorAll(".add-cart");
  addCart_btns.forEach((btn) => {
    btn.addEventListener("click", handle_addCartItem);
  });
}

//==============HANDLE EVENTS FUNCTIONS=================
let itemsAdded = [];

function handle_addCartItem() {
  let product = this.parentElement;
  let title = product.querySelector(".productTitle").innerHTML;
  let price = product.querySelector(".price").innerHTML;
  let imgsrc = product.querySelector(".product-img").src;
  let p_quantity = product.querySelector(".quantityVal").value;
  console.log(title, price, imgsrc);
  console.log(p_quantity);

  let newToAdd = {
    title,
    price,
    imgsrc,
    p_quantity,
  };

  //HANDLE ITEM ALREADY EXISTS
  if (itemsAdded.find((el) => el.title == newToAdd.title)) {
    alert("item alreadu exists in the cart");
    return;
  } else {
    itemsAdded.push(newToAdd);
  }

  //ADD PRODUCT TO CART
  let cartBoxElement = cartBoxComponent(title, price, imgsrc, p_quantity);
  let newNode = document.createElement("div");
  newNode.innerHTML = cartBoxElement;
  const cartContent = cart.querySelector(".cartContent");
  cartContent.appendChild(newNode);

  addEvents();
  updateTotal();
}

function handle_removeCartItem() {
  this.parentElement.remove();
  itemsAdded = itemsAdded.filter(
    (el) =>
      el.title !=
      this.parentElement.querySelector(".cartProductTitle").innerHTML
  );

  update();
}

function handle_changeItemQuantity() {
  if (isNaN(this.value) || this.value < 1) {
    this.value = 1;
  }
  this.value = Math.floor(this.value); //to keep it intger

  update();
}

//=================UPDATE FUNCTIONS=======================

function updateTotal() {
  let cartBoxes = document.querySelectorAll(".cartBox");
  const totalElement = document.querySelector(".totalPrice");
  let total = 0;
  cartBoxes.forEach((cartBox) => {
    let priceElement = cartBox.querySelector(".cartPrice");
    let price = parseFloat(priceElement.innerHTML.replace("$", ""));
    let quantity = cartBox.querySelector(".cartQuantity").value;
    total += price * quantity;
  });

  //KEEP TO NUMBERS AFTER THE POINT
  total = total.toFixed(2);

  totalElement.innerHTML = "$" + total;
}

//==================HTML COMPONENTS======================
function cartBoxComponent(title, price, imgsrc, quantity) {
  return `<div class="cartBox">
            <img src="${imgsrc}" class="cartImg" />
            <div class="detailBox">
            <div class="cartProductTitle">${title}</div>
            <div class="cartPrice">${price}</div>
            <input type="number" value="${quantity}" class="cartQuantity" />
             </div>
             <i class="fa-solid fa-trash cart-remove"></i>
         </div>`;
}
