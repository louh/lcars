<template>
  <div id="planet-view" class="planet-view"></div>
</template>

<script>
import * as THREE from 'three'

// Solar System Scope Solar Textures
// https://www.solarsystemscope.com/textures/
// Creative Commons Attribution 4.0 International
const PLANETS = [
  {
    texture: '2k_ceres_fictional.jpg',
    size: 0.4,
    rotationSpeed: 4,
    glow: [0.3, 0.3, 0.25, 0.25],
    light: 1,
  },
  {
    texture: '2k_earth_daymap.jpg',
    size: 1,
    rotationSpeed: 0.5,
    glow: [0.2, 0.3, 0.5, 0.75],
    light: 1,
  },
  {
    texture: '2k_eris_fictional.jpg',
    size: 0.3,
    rotationSpeed: 10,
    glow: [0.1, 0.1, 0.1, 0.5],
    light: 2,
  },
  {
    texture: '2k_haumea_fictional.jpg',
    size: 0.5,
    rotationSpeed: 5,
    glow: [0.25, 0.25, 0.25, 0.25]
  },
  {
    texture: '2k_jupiter.jpg',
    size: 1.2,
    glow: [0.35, 0.2, 0.2, 0.35],
    light: 1
  },
  {
    texture: '2k_makemake_fictional.jpg',
    glow: [0.8, 0.7, 0.4, 0.5],
    light: 1,
  },
  {
    texture: '2k_mars.jpg',
    glow: [0.8, 0.4, 0.4, 0.5],
  },
  {
    texture: '2k_mercury.jpg',
    size: 0.8,
    rotationSpeed: 2,
  },
  {
    texture: '2k_moon.jpg',
    size: 0.6
  },
  {
    texture: '2k_neptune.jpg',
    rotationSpeed: 10,
    glow: [0.35, 0.35, 0.65, 0.5],
    light: 1,
  },
  {
    texture: '2k_saturn.jpg',
    rotationSpeed: 4,
    glow: [0.5, 0.5, 0.2, 0.85],
  },
  {
    texture: '2k_sun.jpg',
    size: 1.25,
    glow: [1.0, 0.75, 0.0, 1],
    light: 3,
  },
  {
    texture: '2k_uranus.jpg',
    rotationSpeed: 3,
    light: 2
  },
  {
    texture: '2k_venus_atmosphere.jpg',
    rotationSpeed: 2,
    light: 2
  },
  {
    texture: '2k_venus_surface.jpg',
  },
]

export default {
  props: {
    planet: {
      type: Number,
      default: 1
    }
  },
  methods: {
    init: function () {
      const container = document.getElementById('planet-view')
      const planet = PLANETS[this.planet]
      const size = 0.3 + (typeof planet.size !== 'undefined' ? planet.size : 1) * 0.2

      this.scene = new THREE.Scene()

      this.camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.01, 10)
      this.camera.position.z = 1

      // Planet
      const loader = new THREE.TextureLoader()
      loader.load(`planets/${planet.texture}`, (texture) => {
        const geometry = new THREE.SphereGeometry(size, 64, 32)
        const material = new THREE.MeshLambertMaterial({ map: texture })

        this.mesh = new THREE.Mesh(geometry, material)
        this.scene.add(this.mesh)
        this.loaded = true
      })

      // Atmospheric glow
      // create custom material from the shader code above
      //   that is within specially labeled script tags
      const customMaterial = new THREE.ShaderMaterial(
      {
        uniforms: {  },
        vertexShader: `
          varying vec3 vNormal;
          void main()
          {
              vNormal = normalize( normalMatrix * normal );
              gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
          }`,
        fragmentShader: `
          varying vec3 vNormal;
          void main()
          {
              float intensity = pow( 0.7 - dot( vNormal, vec3( 0.0, 0.0, 1.0 ) ), 4.0 );
              gl_FragColor = vec4( ${(typeof planet.glow !== 'undefined' ? planet.glow : [0.7, 0.7, 0.7, 0.3]).toString()} ) * intensity;
          }`,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        transparent: true
      });
      const ballGeometry = new THREE.SphereGeometry(size * 1.4, 64, 32)
      const ball = new THREE.Mesh(ballGeometry, customMaterial)
      this.scene.add(ball)

      // Lights!
      const ambientLight = new THREE.AmbientLight(0x000000)
      this.scene.add(ambientLight)

      switch (planet.light) {
        // Strong light from right side
        case 1: {
          // Key
          const light1 = new THREE.PointLight(0xffffff, 1.5, 0, 2)
          light1.position.set(100, 0, 50)
          this.scene.add(light1)

          // Rim
          const light2 = new THREE.PointLight(0xffffff, 0.5, 0, 2)
          light2.position.set(-100, 0, -75)
          this.scene.add(light2)

          // Fill
          const light3 = new THREE.PointLight(0xffffff, 0.1, 0, 2)
          light3.position.set(0, 0, 200)
          this.scene.add(light3)

          break
        }
        // Harsh light from top left
        case 2: {
          // Key
          const light1 = new THREE.PointLight(0xffffff, 1.75, 0, 2)
          light1.position.set(-75, 100, 50)
          this.scene.add(light1)

          // Rim
          const light2 = new THREE.PointLight(0xffffff, 0.1, 0, 2)
          light2.position.set(25, -25, 0)
          this.scene.add(light2)

          // Fill
          const light3 = new THREE.PointLight(0xffffff, 0.1, 0, 2)
          light3.position.set(0, 0, 50)
          this.scene.add(light3)

          break
        }
        // Harsh direct
        case 3: {
          // Key
          const light1 = new THREE.PointLight(0xffffff, 1.75, 0, 2)
          light1.position.set(-75, 100, 50)
          this.scene.add(light1)

          // Rim
          const light2 = new THREE.PointLight(0xffffff, 0.1, 0, 2)
          light2.position.set(25, -25, 0)
          this.scene.add(light2)

          // Fill
          const light3 = new THREE.PointLight(0xffffff, 1, 0, 2)
          light3.position.set(0, 0, 100)
          this.scene.add(light3)

          break
        }
        // Pretty even light
        default: {
          const light1 = new THREE.PointLight(0xffffff, 0.5, 0, 2)
          light1.position.set(0, 0, 200)
          this.scene.add(light1)

          const light2 = new THREE.PointLight(0xffffff, 1, 0, 2)
          light2.position.set(100, 200, 100)
          this.scene.add(light2)

          const light3 = new THREE.PointLight(0xffffff, 0.25, 0, 2)
          light3.position.set(-100, -200, -100)
          this.scene.add(light3)

          break
        }
      }

      this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
      container.appendChild(this.renderer.domElement)

      // Ensure proper canvas size after mounting has finished
      window.setTimeout(this.onResize, 0)
      // Ensure proper canvas size on viewport resize
      window.addEventListener('resize', this.onResize)
    },
    animate: function () {
      requestAnimationFrame(this.animate)

      if (this.loaded !== true) return

      const planet = PLANETS[this.planet]
      this.mesh.rotation.y += 0.0002 * (typeof planet.rotationSpeed !== 'undefined' ? planet.rotationSpeed : 1)
      this.renderer.render(this.scene, this.camera)
    },
    onResize: function () {
      const container = document.getElementById('planet-view')

      this.renderer.setSize(container.clientWidth, container.clientHeight)
      this.camera.aspect = container.clientWidth / container.clientHeight
      this.camera.updateProjectionMatrix()
    }
  },
  mounted() {
    this.init()
    this.animate()
  },
  unmounted() {
    window.removeEventListener('resize', this.onResize)
  }
}
</script>

<style scoped>
.planet-view {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-image: url('/planets/2k_stars.jpg');
  background-position: center center;
}

.planet-view canvas {
  width: 100%;
  height: 100%;
}
</style>
