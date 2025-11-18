const canvas = document.getElementById('c')
const ctx = canvas.getContext('2d')

function resizeCanvas() {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
}

resizeCanvas()
window.addEventListener('resize', resizeCanvas)

// Camera options

let cameraZ = 0
const speed = 0.05

// Cell Size

const cellSize = 1

// loop

function loop() {
  cameraZ += speed

  drawScene()

  requestAnimationFrame(loop)
}

function drawScene() {
  const W = canvas.width
  const H = canvas.height

  ctx.fillStyle = 'black'
  ctx.fillRect(0, 0, W, H)

  // draw ground

  for (let screenY = H / 2; screenY < H; screenY++) {
    // find perspective
    const perspective = (screenY - H / 2) / (H / 2)
    const z = 1 / (perspective + 0.01)

    // find cell
    const worldZ = cameraZ + z
    const cellZ = Math.floor(worldZ / cellSize)

    // find line size
    const lineWidth = W / z

    // find cell color

    const isDark = cellZ % 2 === 0
    ctx.fillStyle = isDark ? '#2c5960' : '#54a6b0'

    // draw line

    ctx.fillRect(W / 2 - lineWidth / 2, screenY, lineWidth, 1)
  }
}

loop()
