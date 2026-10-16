
const loading = document.getElementById("loading");

// Hide the opening screen
window.addEventListener("load", () => {
    setTimeout(() => {
        loading.classList.add("hide");
    }, 1800);
});

// Open My Heart button
document.getElementById("openButton").addEventListener("click", () => {
    document.getElementById("gallery").scrollIntoView({
        behavior: "smooth"
    });

    createHearts(20);
});

// Floating hearts
function createHearts(amount = 10) {
    const container = document.getElementById("hearts");

    for (let i = 0; i < amount; i++) {
        const heart = document.createElement("span");

        heart.className = "floating-heart";
        heart.textContent = Math.random() > 0.5 ? "♡" : "♥";
        heart.style.left = Math.random() * 100 + "%";
        heart.style.fontSize = (14 + Math.random() * 20) + "px";
        heart.style.animationDelay = Math.random() * 1.5 + "s";

        container.appendChild(heart);

        heart.addEventListener("animationend", () => {
            heart.remove();
        });
    }
}

// Small floating hearts appear occasionally
setInterval(() => {
    createHearts(2);
}, 3500);

// Surprise message
document.getElementById("surpriseButton").addEventListener("click", () => {
    const message = document.getElementById("surpriseMessage");

    message.hidden = !message.hidden;

    if (!message.hidden) {
        createHearts(25);

        message.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    }
});

// Click photos to enlarge them
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");

document.querySelectorAll(".photo").forEach((photo) => {
    photo.addEventListener("click", () => {
        const img = photo.querySelector("img");

        if (!img.complete || img.naturalWidth === 0) {
            alert("Please add a picture to the images folder first.");
            return;
        }

        lightboxImage.src = img.src;
        lightbox.classList.add("open");
    });
});

// Close enlarged photo
function closeLightbox() {
    lightbox.classList.remove("open");
    lightboxImage.src = "";
}

document.getElementById("closeLightbox").addEventListener(
    "click",
    closeLightbox
);

lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
        closeLightbox();
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeLightbox();
    }
});

// Music player
const music = document.getElementById("music");
const musicButton = document.getElementById("musicButton");

musicButton.addEventListener("click", async () => {
    if (music.paused) {
        try {
            await music.play();
            musicButton.textContent = "Ⅱ";
            musicButton.setAttribute("aria-label", "Pause music");
        } catch (error) {
            alert(
                "Music unavailable. Please add a valid music.mp3 file."
            );
        }
    } else {
        music.pause();
        musicButton.textContent = "▶";
        musicButton.setAttribute("aria-label", "Play music");
    }
});

// Update button if playback ends
music.addEventListener("ended", () => {
    musicButton.textContent = "▶";
});
