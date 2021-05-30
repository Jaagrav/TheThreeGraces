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