// access key
const accessKey = "XhTZcZ2WZ8B6gFF-gY_lltGTJmq8xqtLdl6v7g39vaw";

// Kerakli DOM elementlarini tanlab olish
const container = document.getElementById("container");
const modal = document.getElementById("modal");
const overlay = document.getElementById("overlay");
const headerLikedBtn = document.getElementById("header-liked-btn");
const likedModal = document.getElementById("liked");
const closeLikedBtn = document.getElementById("close-liked-btn");
const searchInput = document.getElementById("search-input");


// Har window yangilanganda getData funksiyasi ishlasin
window.addEventListener("DOMContentLoaded", () => {
    getData();
})


let interval;

// Inputga yozilganda rasm chiqishi
searchInput.addEventListener("input", async (e) => {
  console.log(e.target.value);
  const query = e.target.value;
  clearInterval(interval);

  interval = setTimeout(async () => {
    try {
      const data = await fetch(`https://api.unsplash.com/photos?query=${query}&client_id=${accessKey}`);
      const response = await data.json();
      console.log(response);
      displayData(response)
    } catch (error) {
      alert("Bir dunyo xatolik: ", error)
    }
  }, 500);
})

// api dan ma'lumotlarni olib kelish
async function getData() {
    try {
      const response = await fetch(`https://api.unsplash.com/photos/?client_id=${accessKey}&per_page=5`);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const json = await response.json();
      displayData(json);
    } catch (error) {
      console.error(error.message);
    }
  }

  
// ma'lumotlarni massiv shaklida olib har bitta massiv elementii renderCardga berish
function displayData(data){
    data.forEach(element => {
        renderCard(element)
    });
}


// massivning harbir elementini HTMLga qo'shish
function renderCard(element){
    const imageCard = document.createElement("div");
    imageCard.classList.add("card");

    imageCard.innerHTML = `<img class="card-image" data-id="${element.id}" src="${element.urls.full}" alt="Rasm 2" />`;

    container.appendChild(imageCard);
}




// modal uchun id berganda bitta image ni api dan olish
async function getOneImage(id) {
    try {
      const response = await fetch(`https://api.unsplash.com/photos/${id}?client_id=${accessKey}`);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const json = await response.json();
      // console.log(json);
      renderModal(json);
    } catch (error) {
      console.error(error.message);
    }
  }


// bazadan kelgan itemni modalda ko'rsatish
function renderModal(item){
    const modalContent = document.createElement("div");
    modalContent.classList.add("modal-content");
    
    modalContent.innerHTML = `
            <button onclick="toLiked(this)" data-id="${item.id}" class="like-btn" id="like-btn"><i class="fa-regular fa-heart"></i></button>
            <img class="modal-img" src="${item.urls.full}" alt="">
            <div class="img-desc">
                <p class="creater-name">Yaratuvchi: <span>${item.user.first_name}</span></p>
                <p class="description">What is depicted?: <span>${item.alt_description}</span></p>
                <p class="likes-count">Views: <span>${item.views}</span></p>
                <p class="likes-count">Likes: <span>${item.likes}</span></p>
            </div>
    `
    modal.appendChild(modalContent)
}



container.addEventListener("click", (event) => {
    const dataID = event.target.getAttribute("data-id")
    console.log(event.target.parentElement);
    if(event.target.classList.contains("card-image")){
        showLoading(event.target.parentElement, event.target.src, dataID)
    }

})

function showLoading(card, src, dataID) {
  // card.innerHTML = "<h2>Loading...</h2>";
  modal.classList.remove("hidden")
  overlay.classList.remove("hidden")
  getOneImage(dataID)
}

const closeBtn = document.getElementById("close-btn");


closeBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
    Array.from(modal.children)[2].remove();
})



// modal chiqqandan kiyin like bosilganda bo'ladigan jarayon
function toLiked(likeBtn){
    const img_id = likeBtn.getAttribute("data-id");

    let likedItems = JSON.parse(localStorage.getItem("likedItems")) || [];
    
    if(!likedItems.includes(img_id)) {
      likedItems.push(img_id);
      localStorage.setItem("likedItems", JSON.stringify(likedItems));
      likeBtn.children[0].classList.add("fa-solid")
    } else {
      const removedLike = likedItems.filter(item => item !== img_id);
      localStorage.setItem("likedItems", JSON.stringify(removedLike));
      likeBtn.children[0].classList.remove("fa-solid")
    }
    // checkIsLiked();
}

// function checkIsLiked(id) {
//   const likedPhotos = JSON.parse(localStorage.getItem('liked') || '[]');
//   return `${
//     likedPhotos.includes(id)
//       ? '<i class="bx bxs-heart"></i>'
//       : '<i class="bx bx-heart"></i>'
//   }`;
// }

headerLikedBtn.addEventListener("click", () => {
  likedModal.classList.remove("hidden");
  overlay.classList.remove("hidden");
})

closeLikedBtn.addEventListener("click", () => {
  likedModal.classList.add("hidden");
  overlay.classList.add("hidden");
})