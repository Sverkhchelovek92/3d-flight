const canvas = document.getElementById('c')
const ctx = canvas.getContext('2d')

function resizeCanvas() {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
}
resizeCanvas()
window.addEventListener('resize', resizeCanvas)

let cameraZ = 0
const speed = 0.05

function loop() {
  cameraZ += speed
  draw()
  requestAnimationFrame(loop)
}

function draw() {
  const W = canvas.width
  const H = canvas.height

  ctx.fillStyle = 'black'
  ctx.fillRect(0, 0, W, H)

  const horizon = H * 0.5

  for (let y = horizon; y < H; y++) {
    const dy = y - horizon

    const z = 5000 / dy // расстояние

    const worldZ = Math.floor(cameraZ + z)

    // количество столбцов (ограничено!)
    const columns = 120
    const rowWidth = W * (300 / z)
    const cellWidth = rowWidth / columns

    // отступы
    const startX = W / 2 - rowWidth / 2

    for (let i = 0; i < columns; i++) {
      const worldX = i - columns / 2

      const cx = Math.floor(worldX)
      const cz = Math.floor(worldZ)

      const dark = ((cx + cz) & 1) === 0
      ctx.fillStyle = dark ? '#2c5960' : '#54a6b0'

      ctx.fillRect(startX + i * cellWidth, y, cellWidth + 1, 1)
    }
  }
}

loop()
