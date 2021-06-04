class Cursor {
    constructor(){}
    init() {
        let cursorIsHovering = false;

        const updateCursor = (e) => {
            gsap.to(".cursor-dit", {
                duration: 0,
                top: e.clientY,
                left: e.clientX,
            })
            gsap.to(".cursor-dot", {
                duration: 0.5,
                top: e.clientY,
                left: e.clientX,
            })
        }
        
        const downCursor = (e) => {
            gsap.to(".cursor-dit", {
                duration: 0.5,
                scale: 10
            })
            gsap.to(".cursor-dot", {
                duration: 0.1,
                scale: 0
            })
            updateCursor(e)
        }

        const normalizeCursor = (e) => {
            gsap.to(".cursor-dit", {
                duration: 0.5,
                scale: 1
            })
            gsap.to(".cursor-dot", {
                duration: 0.5,
                scale: 1,
                borderStyle: "solid",
            })
        }
        
        const hoverCursor = (e) => {
            if(cursorIsHovering){
                gsap.to(".cursor-dit", {
                    duration: 0.5,
                    scale: 3
                })
                gsap.to(".cursor-dot", {
                    duration: 0.1,
                    scale: 2,
                    borderStyle: "dotted"
                })
            }
            else normalizeCursor();
        }

        const handleResize = (e) => {
            if(window.screen.width < 600) {
                document.querySelector(".cursor-dot").style.display = "none";
                document.querySelector(".cursor-dit").style.display = "none";
            }
            else {
                document.querySelector(".cursor-dot").style.display = "block";
                document.querySelector(".cursor-dit").style.display = "block";
            }
        }
        
        handleResize();
        window.addEventListener("mousemove", updateCursor);
        window.addEventListener("mouseup", normalizeCursor);
        window.addEventListener("mousedown", downCursor);
        window.addEventListener("resize", handleResize);

        document.querySelectorAll(".header .link.clickable").forEach(item => {
            item.addEventListener("mouseenter", e => {
                document.querySelectorAll(".link.clickable").forEach(item => {
                    if(e.toElement !== item)
                        item.style.color = "#555";
                })
            })
            item.addEventListener("mouseleave", e => {
                document.querySelectorAll(".link.clickable").forEach(item => {
                    item.style.color = "#fff";
                })
            })
        })

        document.querySelectorAll(".info-section .tab.clickable").forEach(item => {
            item.addEventListener("mouseenter", e => {
                document.querySelectorAll(".info-section .tab.clickable").forEach(item => {
                    if(e.toElement !== item)
                        item.style.color = "#555";
                })
            })
            item.addEventListener("mouseleave", e => {
                document.querySelectorAll(".info-section .tab.clickable").forEach(item => {
                    item.style.color = "#fff";
                })
            })
        })

        document.querySelectorAll(".clickable").forEach(item => {
            item.addEventListener("mouseenter", e => {
                cursorIsHovering = true;
                hoverCursor();
            })
            item.addEventListener("mouseleave", e => {
                cursorIsHovering = false;
                hoverCursor();
            })
        })
    }
}