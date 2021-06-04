class Home_Hero_Section {
    
    constructor() {
        this.sizes = {
            width: document.querySelector(".hero-section").clientWidth,
            height: document.querySelector(".hero-section").clientHeight
        }
        this.canvas = document.querySelector('canvas.home_hero_scene')
        this.camera = new THREE.PerspectiveCamera(50, this.sizes.width / this.sizes.height, 0.1, 100);
        this.scene = new THREE.Scene();
        this.pointLight = new THREE.PointLight(0xe0fffb, 2, 1.88, 2)
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true
        })
    }
    init() {
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
        
        window.addEventListener('mousemove', e => this.clientMove(e, this.camera))
        window.addEventListener('touchmove', e => this.clientMove(e, this.camera))
        window.addEventListener('orientationchange', this.handleMobileOrientation)

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
        this.renderer.setClearColor(0x000000);

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



        // this.handleGracesResize();
        window.addEventListener('resize', () =>
        {
            // Update sizes
            this.sizes.width = window.innerWidth
            this.sizes.height = window.innerHeight

            // Update camera
            this.camera.aspect = this.sizes.width / this.sizes.height
            this.camera.updateProjectionMatrix()

            // Update renderer
            this.renderer.setSize(this.sizes.width, this.sizes.height)
            this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

            this.handleGracesResize();
        })


    }

    loadModel(path) {
        gltfLoader.load(path, gltf => {
            const obj = gltf.scene;
            this.threegraces = obj
            this.scene.add(obj);
        })
    }

    clientMove(e, camera) {
        if(!e?.touches?.length)
            this.mouse = {
                x: (e.clientX / window.innerWidth) * 2 - 1,
                y: -(e.clientY / window.innerHeight) * 2 + 1
            };
        else
            this.mouse = {
                x: (e.touches[0].clientX / window.innerWidth) * 2 - 1,
                y: -(e.touches[0].clientY / window.innerHeight) * 2 + 1
            };

        var vector = new THREE.Vector3(this.mouse.x, this.mouse.y, 0.5);
        vector.unproject(camera);
        var dir = vector.sub(camera.position).normalize();
        var distance = -camera.position.z / dir.z;
        var pos = camera.position.clone().add(dir.multiplyScalar(distance));

        if(window.innerWidth > 600) {
            gsap.to(this.pointLight.position, {
                // duration: 3,
                x: Math.abs(pos.x) < 1.6 ? pos.x : pos.x < 0 ? -1.6 : 1.6,
                y: pos.y > 5.4 ? 5.4 : pos.y < 2.9 ? 2.9 : pos.y
            })
    
            gsap.to(this.pointLight, {
                // duration: 3,
                intensity: ((1 - (Math.abs(this.pointLight.position.x) / 1.6)) * 1.5) + 0.5
            })
            
            gsap.to(this.threegraces.rotation, {
                duration: 3,
                y: -pos.x / 10
            });
        }
    }

    parallax(e, threegraces) {
        gsap.to(threegraces.position, {
            duration: 0.7,
            y: (-2 * (e.offset.y / window.innerHeight)),
            z: (-2 * (e.offset.y / window.innerHeight))
        });
    }
    
    handleGracesResize() {
        gsap.to(this.pointLight.position, {
            // duration: 3,
            x: 0,
            y: 4.7
        });

        gsap.to(this.pointLight, {
            // duration: 3,
            intensity: 1
        })
        
        gsap.to(this.threegraces.rotation, {
            duration: 3,
            y: 0
        });
    }

    handleMobileOrientation(e) {
        console.log(e);
    }

}