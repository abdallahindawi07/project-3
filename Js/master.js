// Check if there is local storage color option
let mainColors = localStorage.getItem("color_option");
if (mainColors !== null) {
    document.documentElement.style.setProperty('--main-color', localStorage.getItem("color_option"));
        // Remove Active Class From All colors list items
        document.querySelectorAll(".colors-list li").forEach(element => {

            element.classList.remove("active");


        // add active class on element with data-color === local storage item
        if (element.dataset.color === mainColors) {
            element.classList.add("active");
        }


    });


}


// Random Background Option
let backgroundOption = true

// Variable To Control The Background Interval
let backgroundInterval;

let landingPage = document.querySelector('.landing-page');

let imgsArray= ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg'];

landingPage.style.backgroundImage= "url(imgs/1.jpg)"


let backgroundLocalItem = localStorage.getItem("background_option")

// Check If Random Background Local Storage Is Not Empty

if (backgroundLocalItem !== null) {

    if (backgroundLocalItem === 'true') {

        backgroundOption = true;
    }else{

        backgroundOption = false;
    }

    // Remove Active Class from All Spans
    document.querySelectorAll(".random-backgrounds span").forEach(element => {

        element.classList.remove("active");

    });

    if (backgroundLocalItem === 'true'){
        document.querySelector('.random-backgrounds .yes').classList.add('active');
    }else{
        document.querySelector('.random-backgrounds .no').classList.add('active');
    }

}

// Function To Randomize Imgs
function randomizeImgs(){

    if (backgroundOption === true){

        backgroundInterval = setInterval (()=>{
            let randomNumber= Math.floor(Math.random() * imgsArray.length);

            landingPage.style.backgroundImage= "url(imgs/"+ imgsArray[randomNumber] +")";
        },1000);
    }
}
randomizeImgs();


document.querySelector('.toggle-settings .fa-gear').onclick = function () {

    this.classList.toggle('fa-spin');

    document.querySelector(".settings-box").classList.toggle("open");
}


// Switch Colors- Settings Box

const colorsLi = document.querySelectorAll(".colors-list li");

colorsLi.forEach(li => {

    li.addEventListener('click', (e) => {

        console.log(e.target.dataset.color);

        document.documentElement.style.setProperty('--main-color', e.target.dataset.color )

        // Set color on local storage
        localStorage.setItem("color_option", e.target.dataset.color);

        handleActive(e);

    });

});



// Switch random background option

const randomBackgroundsElement = document.querySelectorAll(".random-backgrounds span");

randomBackgroundsElement.forEach(span => {

    span.addEventListener('click', (e) => {

        handleActive(e);

        if (e.target.dataset.background === 'yes'){
            backgroundOption = true;
            randomizeImgs();

            localStorage.setItem("background_option", true);

        }else{
            backgroundOption = false;
            clearInterval(backgroundInterval);

            localStorage.setItem("background_option", false);

        }

    });

});







// Select Skills Selector

let ourSkills = document.querySelector('.skills');

window.onscroll = function () {

    let skillsOffsetTop = ourSkills.offsetTop;
    let skillsOuterHeight = ourSkills.offsetHeight;
    let windowHeight = this.innerHeight;
    let windowScrollTop = this.pageYOffset;

    let allSkills = this.document.querySelectorAll('.skill-box .skill-progress span');

    if (windowScrollTop + windowHeight > skillsOffsetTop) {

        allSkills.forEach(skill => {
            skill.style.width = skill.dataset.progress;
        });

    } else {

        allSkills.forEach(skill => {
            skill.style.width = '0';
        });

    }

};

// Create PopUp With The Image

let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach(img => {

    img.addEventListener('click', (e) => {

        // Create Overlay And Add Class To It

        let overlay = document.createElement("div");
        overlay.className = 'popup-overlay';

        // Append Overlay To The Body

        document.body.appendChild(overlay);

        // Create The PopUp Box
        let popupBox= document.createElement("div");

        // Add Class To The PopUp Box
        popupBox.className = 'popup-box';

                if (img.alt !== null){

            // create heading
            let igmHeading = document.createElement('h3');

            // create text for heading
            let imgText = document.createTextNode(img.alt);

            // Append The Text To Heading
            igmHeading.appendChild(imgText);

            // Append The Heading To The Popup Box
            popupBox.appendChild(igmHeading);

        }


        // Create The Image
        let popupImage = document.createElement('img');

        // Set Image Source
        popupImage.src = img.src;

        // Add Image To Pop-Up Box
        popupBox.appendChild(popupImage);

        // Append The Pop-Up Box To Body
        document.body.appendChild(popupBox)

        // Create The Close Span
        let closeButton = document.createElement("span");

        // Create The Close Button Text
        let closeButtonText = document.createTextNode("X");

        // Append Text To Close Button
        closeButton.appendChild(closeButtonText);

        // Add Class To Close Button
        closeButton.className = 'close-button';

        // Add Close Button To the Popup Box
        popupBox.appendChild(closeButton);

    });

});

// Close Popup Box
document.addEventListener ("click", function (e) {

    if (e.target.className == 'close-button'){

        // Close The Current Popup
        e.target.parentNode.remove();

        // Remove Overlay
        document.querySelector(".popup-overlay").remove();

    }

});


// Select All Bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");

// Selecty All Links
const allLinks = document.querySelectorAll(".links a")

function scrollToSomewhere (elements){
    elements.forEach(ele =>{

    
    ele.addEventListener('click', (e) => {

        e.preventDefault();

        document.querySelector(e.target.dataset.section).scrollIntoView({

            behavior: 'smooth'

        });

    });

});
}
scrollToSomewhere(allBullets);
scrollToSomewhere(allLinks);

// Handle Active State

function handleActive(ev) {
    ev.target.parentElement.querySelectorAll(".active").forEach(element => {

        element.classList.remove("active");

    });
    ev.target.classList.add("active");
}