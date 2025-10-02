// (1) IMPORTAR MÓDULOS
const express = require('express');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const app = express();

// (2) CONFIGURACIÓN DE MULTER
const upload = multer({ storage: multer.memoryStorage() });

// (3) MIDDLEWARES
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));



// (4) RUTA PRINCIPAL PARA SERVIR EL HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// (5) RUTA DE LA API PARA ANALIZAR EL ARCHIVO
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  try {
    const fileName = req.file.originalname;
    const fileType = req.file.mimetype;
    const fileSize = req.file.size;

    res.json({
      name: fileName,
      type: fileType,
      size: fileSize
    });

  } catch (err) {
    res.status(400).json({ error: "No file uploaded" });
  }
});

// (5) INICIAR EL SERVIDOR
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Tu aplicación está escuchando en el puerto ${PORT}`);
});