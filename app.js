const loedAllCategory = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pets`)
    const data = await res.json()
    displayShowAllPet(data.pets);
    const loading = document.getElementById('spiner').classList.add('hidden')

}
const loedAllCategoryBtn = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/categories`)
    const data = await res.json()
    displayCategoryBtn(data.categories);
}
const removeActiveBtn = () => {
    const buttons = document.getElementsByClassName("catagory-btn")
    for (let btn of buttons) {
        btn.classList.remove("active")
    }
    const loading = document.getElementById('spiner').classList.add('hidden')
}

const displayAllPet = (category) => {
    console.log(category);
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`)
        .then((res) => res.json())
        .then((data) => {
            //removeActive btn
            removeActiveBtn()
            //added active btn
            const activeBtn = document.getElementById(`btn-${category}`)
            activeBtn.classList.add('active')

            displayShowAllPet(data.data)
        }
        )

}

const displayCategoryBtn = (data) => {
    const showButton = document.getElementById('petBtn-container')
    data.forEach(item => {
        // console.log(item.id);
        const div = document.createElement('div')
        div.innerHTML = `
        <div class="flex gap-11">
        
        <button  id='btn-${item.category}' onclick="displayAllPet('${item.category}')"  id = "pet-btn" class="lg:flex  items-center btn lg:px-10 gap-2 catagory-btn" > <img class="h-5 handler" src="${item.category_icon}" alt="">${item.category}</button>
        </div>
        `
        showButton.appendChild(div)
    });

}
const likecontainerPet = (petId) => {
    console.log(petId);
    const image = document.getElementById('likedPets')
    const petImage = document.createElement('div')
    petImage.innerHTML = `
    <div class=" border-2 p-2 rounded-md">
    <img class="w-full rounded-md"  src='${petId}'>
    </div>
    
    `
    image.appendChild(petImage)

}
const showMordal = async (id) => {
    // alert(id)
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`)
    const data = await res.json()
    showModal(data.petData);


}
// show modal in details
const showModal = (data) => {
    const modalContainer = document.getElementById('modal-container')
    modalContainer.innerHTML = `  
    <dialog id="my_modal_4" class="modal">
    <div class="modal-box w-11/12 max-w-5xl">
    <img  class="w-full rounded-2xl mb-3" src="${data.image}">
    <h1 class="text-2xl font-bold font-Lato">${data.pet_name}</h1>
           <div class="text-xl">
           <div class="flex gap-10">
           <div >
            <p><i class="fa-solid fa-border-all"></i>  Breed : ${data.breed || "Normal"} </p>
            <p><i class="fa-solid fa-mercury"></i> Gender : ${data.gender}</p>
            <p><i class="fa-solid fa-mercury"></i> vaccinated_status: ${data.vaccinated_status}</p>
           </div>
           <div>
           <p><i class="fa-regular fa-calendar"></i> Birth : ${data.date_of_birth}</p>
           <p><i class="fa-solid fa-dollar-sign"></i> Price : ${data.price}</p>
           </div>
           </div>
           <div class="border-2 my-4"></div>
           <p class="text-2xl font-semibold">Details information</p>
           <p>${data.pet_details}</p>
           
           </div>
           <div class="modal-action w-full">
           <form method="dialog" class="w-full">
           <button class="btn w-full">Close</button>
                    <!-- if there is a button, it will close the modal -->
                </form>
            </div>
        </div>
    </dialog>
    
    `
    my_modal_4.showModal()
}

//show adopt in modal

const adoptModalShow = () => {
    const adoptModalContainer = document.getElementById('adoptModal-container')
    adoptModalContainer.innerHTML = `
    <dialog id="my_modal_5" class="modal">
    <div class="modal-box w-11/12 flex flex-col justify-center items-center">
       <img  src="https://img.icons8.com/?size=80&id=JDJpJPFVUvFU&format=png">
        <p class=" font-extrabold  text-4xl ">Congrats</p>
        <p class="py-4 text-xl font-bold font-Lato">Adoption process Start for Your Pet</p>
        <div class="modal-action">
            <form method="dialog">

                
                <h1 id="countdown" class="text-5xl">3</h1>
            </form>
        </div>
    </div>
    
</dialog> 
    
    `
    my_modal_5.showModal()
    let countdownValue = 3;
    const countdownElement = document.getElementById('countdown');


    const countdownTimer = setInterval(() => {
        countdownValue--;
        countdownElement.textContent = countdownValue;

        if (countdownValue <= 0) {
            clearInterval(countdownTimer);
            countdownElement.textContent = "";
            my_modal_5.close();
        }

    }, 1000);

}



const displayShowAllPet = (item) => {
    const postContainer = document.getElementById('post-container')
    postContainer.innerHTML = ""
    if (item.length == 0) {
        postContainer.classList.remove('grid')
        postContainer.innerHTML = `
        <div class= " flex flex-col gap-5 justify-center items-center bg-gray-100 p-5   rounded-md  border">
        <img  src="./images/error.webp" alt="">
      <h1 class="text-2xl font-Lato font-bold"> No Information Avaailable</h1>
      <p class="w-3/4 mx-auto text-center">It is a long established fact that a reader will be distracted by the readable content of a page when  looking atits layout. The point of using Lorem Ipsum is that it has a.</p>
        
        </div>    
        `;
         
        return
    } else {
        postContainer.classList.add('grid')
    }
    // item.sort((a, b) => b.price - a.price);
    // console.log(item);
    item.forEach(items => {
        // console.log(data);

        const div = document.createElement('div')
        div.innerHTML = `
      <div class="border rounded-md">
    <figure class="px-5 pt-5">
        <img class="w-full rounded-md" src="${items.image}" alt="Shoes" class="rounded-xl" />
    </figure>
    <div class="p-4 ">
        <h2 class="card-title">${items.pet_name} </h2>
        <p><i class="fa-solid fa-border-all"></i> Breed : ${items.breed || "Normal"} </p>
        <p><i class="fa-regular fa-calendar"></i> Birth : ${items.date_of_birth || "Not available"} </p>
        <p><i class="fa-solid fa-mercury"></i> Gender : ${items.gender || 'Not available'} </p>
        <p class=" "><i class="fa-solid fa-dollar-sign"></i> Price : ${items.price || 'Not available'} $ </p>
        <div class="border-b-2 my-3"></div>
        <div class=" flex  justify-between  ">
            <button onclick="likecontainerPet('${items.image}')" class="btn border-color"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
                </svg>
            </button>
            <button onclick="adoptModalShow()" class="btn text-color border-color hover:bg-primary hover:text-white hover:text-sm">Adopt</button>
            <button onclick="showMordal('${items.petId}')"  class="btn text-color border-color hover:bg-primary hover:text-white hover:text-sm">Details</button>
        </div>
    </div>
</div>
        
        
        `
        postContainer.appendChild(div)

    })

}


//setTime Out 
const countdowen = () => {
    const loading = document.getElementById('spiner').classList.remove('hidden')


    setTimeout(function () {
        loedAllCategory(loading)
    }, 2000)
}
countdowen()

loedAllCategoryBtn()




