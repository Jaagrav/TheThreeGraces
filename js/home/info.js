class Home_Info_Section {
    constructor(){
        this.sizes = {
            width: document.querySelector(".info-section").clientWidth/2,
            height: document.querySelector(".info-section").clientHeight
        }
        this.canvas = document.querySelector('canvas.home_info_scene')
        this.camera = new THREE.PerspectiveCamera(50, this.sizes.width / this.sizes.height, 0.1, 100);
        this.scene = new THREE.Scene();
        this.pointLight = new THREE.PointLight(0xe0fffb, 2, 1.88, 1)
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true
        })

        new THREE.OrbitControls(this.camera, this.canvas)
    };

    init() {
        this.openTab(0);
        document.querySelectorAll(".info-section .tab.clickable").forEach((item, index) => {
            item.addEventListener("click", e => {
                this.openTab(index);
            })
        })

        /**
         * Base
         */

         this.loadModel("../assets/models/threegraces.gltf");

         /**
          * Sizes
          */
 
         // Lights 
         this.pointLight.position.set(-0.087, 4.708, 0.701);
         this.pointLight.visible = true;
         this.scene.add(this.pointLight);
 
         /**
          * Camera
          */
         // Base camera
         this.camera.position.set(0, 4.15, 3);
         this.scene.add(this.camera)
 
         /**
          * Renderer
          */
         this.renderer.setSize(this.sizes.width, this.sizes.height)
         this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
         this.renderer.setClearColor(0x16171a);
 
         /**
          * Animate
          */
         const clock = new THREE.Clock()
 
         const tick = () =>
         {
             const elapsedTime = clock.getElapsedTime()
 
             // Render
             this.renderer.render(this.scene, this.camera)
 
             // Call tick again on the next frame
             window.requestAnimationFrame(tick);
         }
 
         tick()
 
 
 
         window.addEventListener('resize', () =>
         {
             // Update sizes
             this.sizes.width = document.querySelector(".info-section").clientWidth/2
             this.sizes.height = document.querySelector(".info-section").clientHeight
 
             // Update camera
             this.camera.aspect = this.sizes.width / this.sizes.height
             this.camera.updateProjectionMatrix()
 
             // Update renderer
             this.renderer.setSize(this.sizes.width, this.sizes.height)
             this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
         })
        
    }

    openTab(index) {
        gsap.to(".tab-data0", {
            translateX: 50,
            opacity: 0
        });
        
        gsap.to(".tab-data1", {
            translateX: 50,
            opacity: 0
        });
        
        gsap.to(".tab-data2", {
            translateX: 50,
            opacity: 0
        });

        switch(index) {
            case 0: 
                gsap.to(".mini-nav .underline", {
                    left: 0
                });

                gsap.to(".tab-data0", {
                    delay: 0.5,
                    translateX: 0,
                    opacity: 1
                });

                gsap.to(this.camera.position, {
                    duration: 2,
                    x: 0,
                    y: 4.5,
                    z: 0.7
                })

                gsap.to(this.camera.rotation, {
                    duration: 2,
                    y: 0.7,
                })
                break;
                
            case 1: 
                gsap.to(".mini-nav .underline", {
                    left: "33%"
                });
                
                gsap.to(".tab-data1", {
                    delay: 0.5,
                    translateX: 0,
                    opacity: 1
                });

                gsap.to(this.camera.position, {
                    duration: 2,
                    x: -0.1,
                    y: 4.7,
                    z: 1.2
                })

                gsap.to(this.camera.rotation, {
                    duration: 2,
                    y: 0,
                })
            break;
            
            case 2: 
                gsap.to(".mini-nav .underline", {
                    left: "66%"
                });

                gsap.to(".tab-data2", {
                    delay: 0.5,
                    translateX: 0,
                    opacity: 1
                });
                
                gsap.to(this.camera.position, {
                    duration: 2,
                    x: -0.1,
                    y: 4.55,
                    z: 0.4
                })

                gsap.to(this.camera.rotation, {
                    duration: 2,
                    y: -0.8,
                })
            break;
        }
    }

    loadModel(path) {
        gltfLoader.load(path, gltf => {
            const obj = gltf.scene;
            this.threegraces = obj
            obj.children[1].visible = false;
            this.scene.add(obj);
            console.log(obj);
        })
    }

}