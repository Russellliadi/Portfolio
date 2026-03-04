const AboutPage = document.getElementById("About");
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let debounce = false

let AboutPageInfo = {
    state: 0,
};

function bezierCurve(p0, p1, p2, p3, t) {
    return Math.pow(1 - t, 3) * p0 + 
           3 * Math.pow(1 - t, 2) * t * p1 + 
           3 * (1 - t) * Math.pow(t, 2) * p2 + 
           Math.pow(t, 3) * p3;
}

async function updateOpacityForAbout() {
    if (debounce) { return }
    debounce = true

    if (AboutPageInfo.state === 0) {
        
        AboutPageInfo.state = 1;

        let opaStart = 0;
        let opaGoal = 1;
        let p1 = 0.3;
        let p2 = 0.9; 

        for (let i = 0; i <= 100; i++) {
            let t = i / 100;
            let currentOpacity = bezierCurve(opaStart, p1, p2, opaGoal, t);

            if (currentOpacity <= 0.75) {
                document.getElementById("Overlay").style.opacity = currentOpacity 
            }

            AboutPage.style.opacity = currentOpacity;

            await wait(10); 
        }

        AboutPage.style.pointerEvents = "auto";
        document.getElementById("Overlay").style.opacity = 0.75
        
    } else {
        let opaStart = 1;
        let opaGoal = 0;
        let p1 = 0.3;
        let p2 = 0.9; 

        for (let i = 100; i >= 0; i--) {
            let t = i / 100;
            let currentOpacity = bezierCurve(opaGoal, p1, p2, opaStart, t);

            if (currentOpacity > 0.75) {
                document.getElementById("Overlay").style.opacity = currentOpacity
            }   

            AboutPage.style.opacity = currentOpacity;

            await wait(10); 
        }

        AboutPageInfo.state = 0;
        AboutPage.style.opacity = 0;
        AboutPage.style.pointerEvents = "none";
        document.getElementById("Overlay").style.opacity = 0
    }

    debounce = false
}

async function updateCloseButton() {
    if (debounce) { return }
    debounce = true

    let opaStart = 1;
    let opaGoal = 0;
    let p1 = 0.3;
    let p2 = 0.9; 

    for (let i = 100; i >= 0; i--) {
        let t = i / 100;
        let currentOpacity = bezierCurve(opaGoal, p2, p1, opaStart, t);

        if (currentOpacity > 0.75) {
            document.getElementById("Overlay").style.opacity = currentOpacity
        }

        AboutPage.style.opacity = currentOpacity;

        await wait(10); 
    }

    AboutPageInfo.state = 0
    AboutPage.style.opacity = 0
    AboutPage.style.pointerEvents = "none"
    document.getElementById("Overlay").style.opacity = 0

    debounce = false
}

function goToSciptingSection() {
    document.getElementById("ScriptingPage").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

function goToGuiSection() {
    document.getElementById("GuiPage").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}