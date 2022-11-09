<template>
  <div id="planet-view" class="planet-view"></div>
</template>

<script>
import * as THREE from 'three'

const textures = [
  // Solar System Scope Solar Textures
  // https://www.solarsystemscope.com/textures/
  // Creative Commons Attribution 4.0 International
  '2k_ceres_fictional.jpg',
  '2k_earth_daymap.jpg',
  '2k_eris_fictional.jpg',
  '2k_haumea_fictional.jpg',
  '2k_jupiter.jpg',
  '2k_makemake_fictional.jpg',
  '2k_mars.jpg',
  '2k_mercury.jpg',
  '2k_moon.jpg',
  '2k_neptune.jpg',
  '2k_saturn.jpg',
  '2k_sun.jpg',
  '2k_uranus.jpg',
  '2k_venus_atmosphere.jpg',
  '2k_venus_surface.jpg',
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

      this.scene = new THREE.Scene()

      this.camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.01, 10)
      this.camera.position.z = 1

      const loader = new THREE.TextureLoader()
      loader.load(`planets/${textures[this.planet]}`, (texture) => {
        const geometry = new THREE.SphereGeometry(0.5, 64, 32)
        const material = new THREE.MeshLambertMaterial({ map: texture })

        this.mesh = new THREE.Mesh(geometry, material)
        this.scene.add(this.mesh)
        this.loaded = true
      })

      const ambientLight = new THREE.AmbientLight(0x000000)
      this.scene.add(ambientLight)

      const light1 = new THREE.PointLight(0xffffff, 0.5, 0, 2)
      light1.position.set(0, 0, 200)
      this.scene.add(light1)

      const light2 = new THREE.PointLight(0xffffff, 1, 0, 2)
      light2.position.set(100, 200, 100)
      this.scene.add(light2)

      const light3 = new THREE.PointLight(0xffffff, 0.25, 0, 2)
      light3.position.set(-100, -200, -100)
      this.scene.add(light3)

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

      this.mesh.rotation.y += 0.0005
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
