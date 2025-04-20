const container = document.getElementById("container");
const modal = document.getElementById("modal");
const overlay = document.getElementById("overlay");
const headerLikedBtn = document.getElementById("header-liked-btn");
const likedModal = document.getElementById("liked");
const closeLikedBtn = document.getElementById("close-liked-btn");


const accessKey = "XhTZcZ2WZ8B6gFF-gY_lltGTJmq8xqtLdl6v7g39vaw";


window.addEventListener("DOMContentLoaded", () => {
    getData();
})

async function getData() {
    try {
      const response = await fetch(`https://api.unsplash.com/photos/?client_id=${accessKey}&per_page=4`);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const json = await response.json();
      displayData(json);
    } catch (error) {
      console.error(error.message);
    }
  }

  

function displayData(data){
    data.forEach(element => {
        renderCard(element)
    });
}

function renderCard(element){
    const imageCard = document.createElement("div");
    imageCard.classList.add("card");

    imageCard.innerHTML = `<img class="card-image" data-id="${element.id}" src="${element.urls.full}" alt="Rasm 2" />`;

    container.appendChild(imageCard);
}




async function getOneImage(id) {
    try {
      const response = await fetch(`https://api.unsplash.com/photos/${id}?client_id=${accessKey}`);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const json = await response.json();
      console.log(json);
      renderModal(json);
    } catch (error) {
      console.error(error.message);
    }
  }




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
    if(event.target.classList.contains("card-image")){
        modal.classList.remove("hidden")
        overlay.classList.remove("hidden")
        getOneImage(dataID)
    }


})

const closeBtn = document.getElementById("close-btn");


closeBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
    Array.from(modal.children)[2].remove();
})


let isLike = false;
function toLiked(likeBtn){
    console.log(likeBtn.getAttribute("data-id"));
    
    isLike = (!isLike);
    if(isLike){
        addToLiked()
    } else {
        removeFromLiked()
    }
    const likeBtnChild = likeBtn.getElementsByTagName("i")[0]
    likeBtnChild.classList.toggle("fa-solid")
}

function toLiked2(item) {
  console.log(item);
}

function addToLiked(){
    console.log("Like bosildi");
}

function removeFromLiked() {
    console.log("Like olib tashlandi");
}


headerLikedBtn.addEventListener("click", () => {
  likedModal.classList.remove("hidden");
  overlay.classList.remove("hidden");
})

closeLikedBtn.addEventListener("click", () => {
  likedModal.classList.add("hidden");
  overlay.classList.add("hidden");
})