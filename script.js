document.getElementById('generateYoutubeTag').addEventListener('click', function () {
    const url = document.getElementById('youtubeUrl').value.trim();
    let videoId = "";

    try {
        const parsedUrl = new URL(url);

        // Shorts
        if (parsedUrl.hostname.includes("youtube.com") && parsedUrl.pathname.startsWith("/shorts/")) {
            videoId = parsedUrl.pathname.split("/shorts/")[1].split(/[?&]/)[0];
            document.getElementById('youtubeTagOutput').value =
                `{GENERICO:type="youtube",width="152",height="280",id="${videoId}"}`;
        }

        // Vidéo classique
        else if (parsedUrl.hostname.includes("youtube.com") && parsedUrl.searchParams.has("v")) {
            videoId = parsedUrl.searchParams.get("v");
            document.getElementById('youtubeTagOutput').value =
                `{GENERICO:type="youtube",width="280",height="152",id="${videoId}"}`;
        }

        // Lien raccourci youtu.be
        else if (parsedUrl.hostname === "youtu.be") {
            videoId = parsedUrl.pathname.replace("/", "").split(/[?&]/)[0];
            document.getElementById('youtubeTagOutput').value =
                `{GENERICO:type="youtube",width="280",height="152",id="${videoId}"}`;
        }

        // Sinon, non reconnu
        else {
            document.getElementById('youtubeTagOutput').value = "Lien YouTube non reconnu.";
        }
    } catch (e) {
        document.getElementById('youtubeTagOutput').value = "Lien invalide.";
    }
});
