/**
 * Opens an overlay and displays the selected content.
 *
 * @param {string} type - Type of overlay to display.
 */
function openOverlay(type) {
  ui.overlay.style.display = "flex";

  ui.overlayContent.className = "overlay-content";

  if (type === "imprint") {
    ui.overlayContent.classList.add("overlay-imprint");
  }

  ui.overlayBody.innerHTML = OVERLAYS[type];
}

/**
 * Closes the currently visible overlay.
 */
function closeOverlay() {
  ui.overlay.style.display = "none";
}
