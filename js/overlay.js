function openOverlay(type){

    ui.overlay.style.display = "flex";

    ui.overlayContent.className = "overlay-content";

    if(type === "imprint"){
        ui.overlayContent.classList.add("overlay-imprint");
    }

    ui.overlayBody.innerHTML = OVERLAYS[type];

}

function closeOverlay(){

    ui.overlay.style.display = "none";

}