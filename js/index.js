const gltfLoader = new THREE.GLTFLoader();
new Cursor().init();
const hero_section_3D = new Home_Hero_Section();
const info_section_3D = new Home_Info_Section();
hero_section_3D.init();
info_section_3D.init();

var Scrollbar = window.Scrollbar;

Scrollbar.use(window.OverscrollPlugin)
const scrollbar = Scrollbar.init(document.querySelector('.body'), {
    damping: 0.05,
    thumbMinSize: 20,
    plugins: {
        overscroll: {
            damping: 0.15,
            maxOverscroll: 50,   
        },
    },
});

scrollbar.addListener(e => hero_section_3D.parallax(e, hero_section_3D.threegraces))

document.querySelectorAll('.header .link.clickable').forEach(item => {
    item.addEventListener('click', e => {
        scrollbar.scrollIntoView(document.querySelector(e.target.getAttribute('href')));
        console.log(document.querySelector(e.target.getAttribute('href')))
    })
})

const handleResize = (e) => {
    if(window.innerWidth * 0.06 > 50 && window.innerWidth * 0.06 < 95){
        gsap.to(".h5", {
            duration: 0,
            fontSize: window.innerWidth * 0.02
        });
        gsap.to(".h1", {
            duration: 0,
            fontSize: window.innerWidth * 0.06
        });
    }
    else if (window.innerWidth * 0.06 < 50){
        gsap.to(".h5", {
            duration: 0,
            fontSize: 17
        });
        gsap.to(".h1", {
            duration: 0,
            fontSize: 50
        });
    }
    else if (window.innerWidth * 0.06 > 95){
        gsap.to(".h5", {
            duration: 0,
            fontSize: 50
        });
        gsap.to(".h1", {
            duration: 0,
            fontSize: 95
        });
    }
}

window.addEventListener('resize', handleResize);
handleResize();