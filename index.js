const btnEl = document.getElementById("btn")
const errorMessageEl = document.getElementById("errorMessage")
const galleryEl = document.getElementById("gallery")
async function fetchImage(){
    const inputEl = document.getElementById("input").value;
    if(inputEl > 10 || inputEl < 1){
        errorMessageEl.style.display = "block"
        return
    }

    imgs = " "
    try {
        btnEl.style.display = "none"
        const loading = `<img src="spinner.svg"/>`
        galleryEl.innerHTML = loading
        await fetch(`https://api.unsplash.com/photos?per_page=${inputEl}&page=${Math.round(Math.random() * 1000)}&client_id=C4Joej8ce2Qph0-3QGRpkukJomSyC7Y87WhFSx2rx3M`).then((res)=>res.json().then((data)=>{
            if(data){
                data.forEach((pic) => {
                    imgs += `
                    <img src = ${pic.urls.small} alt = "img" />
                    `
                    galleryEl.style.display = "flex"
                    galleryEl.innerHTML = imgs
                    btnEl.style.display = "block"
                    errorMessageEl.style.display = "none"
                });
            }
        }))
       
    } catch (error) {
        console.log(error);
        errorMessageEl.style.display = "block"
        errorMessageEl.innerText = "An error happend,try later"
        btnEl.style.display = "block"
        galleryEl.style.display = "none"
    }


}


btnEl.addEventListener("click", fetchImage)