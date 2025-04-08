const express = require('express')
const path = require('path')

const app = express()
const PORT = 3000

// Ruta absoluta a la carpeta dist
const buildPath = path.join(__dirname, '..', 'dist')

// Servir archivos estáticos de React
app.use(express.static(buildPath))

// Cualquier ruta que no sea archivo (SPA fallback)
app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'))
})

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})
