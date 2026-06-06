# 🎵 NoiseRemover

> An intelligent web application that removes background noise from audio files using advanced machine learning algorithms. Upload your audio and get a crystal-clear version back.

[![Python](https://img.shields.io/badge/Python-3.8%2B-blue)](https://www.python.org/)
[![Node.js](https://img.shields.io/badge/Node.js-16%2B-green)](https://nodejs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-latest-teal)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-19-cyan)](https://react.dev/)
[![License](https://img.shields.io/badge/License-MIT-yellow)](LICENSE)

## ✨ Features

- 🚀 **Fast Noise Removal** - State-of-the-art spectral gating noise reduction algorithm
- 🎨 **Modern Web Interface** - Intuitive React frontend with real-time feedback
- ⚡ **RESTful API** - FastAPI backend with comprehensive documentation
- 📁 **Multiple Format Support** - WAV files with extensibility for MP3, FLAC, OGG
- 🔄 **Batch Ready** - Designed for scalability and concurrent processing
- 🌐 **CORS Enabled** - Seamless cross-origin integration
- 📊 **Zero Configuration** - Works out of the box

## 🛠️ Tech Stack

**Backend:**
- [FastAPI](https://fastapi.tiangolo.com/) - Modern, fast Python web framework
- [Librosa](https://librosa.org/) - Audio analysis and processing
- [Noisereduce](https://github.com/timedomain/noisereduce) - Advanced noise reduction
- [Soundfile](https://github.com/bastibe/soundfile) - Audio I/O operations

**Frontend:**
- [React 19](https://react.dev/) - UI library
- [Vite](https://vitejs.dev/) - Lightning-fast build tool
- [Axios](https://axios-http.com/) - HTTP client
- [ESLint](https://eslint.org/) - Code quality

## 📋 Prerequisites

- **Python** 3.8 or higher
- **Node.js** 16 or higher
- **npm** or **yarn** package manager
- ~500MB disk space for dependencies

## 🚀 Quick Start

### 1️⃣ Clone and Setup

```bash
git clone https://github.com/yourusername/NoiseRemover.git
cd NoiseRemover
```

### 2️⃣ Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv .venv

# Activate virtual environment
# On Windows:
.venv\Scripts\activate
# On macOS/Linux:
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start server
python main.py
```

Backend API: `http://localhost:8000`  
API Docs: `http://localhost:8000/docs` (interactive Swagger UI)

### 3️⃣ Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend: `http://localhost:5173`

## 📖 Usage

### Via Web Interface

1. Open your browser to `http://localhost:5173`
2. Click "Upload Audio" and select a WAV file
3. Click "Remove Noise"
4. Click "Download" to get your cleaned audio

### Via API

**Remove Noise (POST)**
```bash
curl -X POST "http://localhost:8000/remove-noise" \
  -F "file=@audio.wav" \
  -o cleaned_audio.wav
```

**Health Check (GET)**
```bash
curl http://localhost:8000/

# Response:
# {"message": "Audio Noise Remover API Running"}
```

**Interactive API Documentation**
Visit `http://localhost:8000/docs` for Swagger UI or `http://localhost:8000/redoc` for ReDoc

## 📁 Project Structure

```
NoiseRemover/
├── backend/
│   ├── main.py                 # FastAPI application
│   ├── requirements.txt        # Python dependencies
│   ├── .venv/                  # Virtual environment
│   ├── uploads/                # Temporary uploaded files
│   └── cleaned/                # Processed audio files
├── frontend/
│   ├── src/                    # React components
│   │   └── App.jsx
│   ├── public/                 # Static assets
│   ├── package.json            # npm dependencies
│   ├── vite.config.js          # Vite configuration
│   └── index.html              # Entry point
├── .gitignore                  # Git ignore rules
└── README.md                   # This file
```

## ⚙️ Configuration

### Backend Environment

Create a `.env` file in the `backend/` directory (optional):

```env
# Server Configuration
HOST=0.0.0.0
PORT=8000

# File Upload Limits
MAX_FILE_SIZE=50  # MB

# Processing Options
NOISE_REDUCE_STATIONARY=True
NOISE_REDUCE_PROP_DECREASE=1.0
```

### CORS Configuration

The backend currently allows all origins. For production, update `backend/main.py`:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://your-domain.com"],  # Restrict to your domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## 🐛 Troubleshooting

### Backend won't start
```bash
# Make sure virtual environment is activated
source .venv/bin/activate  # macOS/Linux
# or
.venv\Scripts\activate     # Windows

# Reinstall dependencies
pip install --upgrade pip
pip install -r requirements.txt
```

### Port already in use
```bash
# Change backend port
uvicorn main:app --reload --port 8001

# Change frontend port in frontend/vite.config.js
```

### CORS errors
- Make sure backend is running on `http://localhost:8000`
- Check browser console for detailed error messages
- Verify frontend is making requests to correct backend URL

### Audio file issues
- Ensure file is in WAV format
- Check file is not corrupted
- Verify file size is reasonable (< 100MB recommended)

## 🚢 Deployment

### Backend (Heroku/Railway/Render)

1. Create `Procfile`:
```
web: gunicorn -w 4 -k uvicorn.workers.UvicornWorker main:app
```

2. Deploy:
```bash
git push heroku main
```

### Frontend (Vercel/Netlify)

1. Build:
```bash
npm run build
```

2. Deploy `dist/` folder to:
   - [Vercel](https://vercel.com) - Connect GitHub repo
   - [Netlify](https://netlify.com) - Drag & drop `dist/` folder
   - [GitHub Pages](https://pages.github.com)

### Docker (Coming Soon)
```dockerfile
# Dockerfile for containerized deployment
```

## 🔧 Development

### Available Scripts

**Backend:**
```bash
python main.py           # Run with auto-reload
uvicorn main:app --reload --port 8000  # Alternative
```

**Frontend:**
```bash
npm run dev      # Development server
npm run build    # Production build
npm run lint     # Check code quality
npm run preview  # Preview production build
```

## 📝 API Reference

### POST `/remove-noise`

Remove background noise from uploaded audio.

**Request:**
- Method: `POST`
- Content-Type: `multipart/form-data`
- Parameter: `file` (WAV audio file)

**Response:**
- Status: `200 OK`
- Content-Type: `audio/wav`
- Body: Cleaned audio file

**Example:**
```javascript
const formData = new FormData();
formData.append('file', audioFile);

const response = await axios.post(
  'http://localhost:8000/remove-noise',
  formData
);

// Download the cleaned audio
const url = window.URL.createObjectURL(new Blob([response.data]));
const link = document.createElement('a');
link.href = url;
link.setAttribute('download', 'clean_audio.wav');
link.click();
```

### GET `/`

Health check endpoint.

**Response:**
```json
{"message": "Audio Noise Remover API Running"}
```

## 🤝 Contributing

We welcome contributions! Here's how:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/AmazingFeature`
3. **Commit** your changes: `git commit -m 'Add AmazingFeature'`
4. **Push** to branch: `git push origin feature/AmazingFeature`
5. **Open** a Pull Request

### Development Guidelines
- Keep code clean and well-commented
- Add tests for new features
- Follow existing code style
- Update README for new features

## 📊 Performance

- **Processing Speed**: 1-5 seconds per minute of audio (varies by system)
- **Memory Usage**: ~200-500MB during processing
- **Supported Sample Rates**: 8kHz to 48kHz
- **Recommended Max File Size**: 100MB

## 🎓 How It Works

NoiseRemover uses spectral gating for noise reduction:

1. **Audio Loading** - Load WAV file at native sample rate
2. **Noise Profile** - Analyze first ~1 second for noise characteristics
3. **Spectral Gating** - Apply gate to frequency bins with noise signatures
4. **Output** - Save cleaned audio maintaining original quality

For details, see [noisereduce documentation](https://github.com/timedomain/noisereduce).

## 🚧 Known Issues & Limitations

- ⚠️ **WAV Only** - Current implementation supports WAV files (can extend to MP3, FLAC)
- ⚠️ **Local Storage** - Files stored locally (use cloud storage for production)
- ⚠️ **Single Processing** - Synchronous processing (can optimize with async)
- ⚠️ **No Auth** - No authentication (add for production)
- ⚠️ **File Cleanup** - Manual cleanup needed for old files

## 🎯 Future Roadmap

- [ ] Support for MP3, FLAC, OGG formats
- [ ] Adjustable noise reduction intensity slider
- [ ] Real-time waveform visualization
- [ ] Audio quality metrics (SNR, PESQ)
- [ ] User authentication & file history
- [ ] Batch processing API endpoint
- [ ] Real-time audio stream processing
- [ ] Docker containerization
- [ ] Unit & integration tests
- [ ] Advanced noise profiling options

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📧 Support & Feedback

- 📝 **Issues**: Create an [issue](../../issues) for bugs
- 💬 **Discussions**: Start a [discussion](../../discussions) for questions
- ⭐ **Feedback**: Give this repo a star if it helps!

## 🙏 Acknowledgments

- [Librosa](https://librosa.org/) team for audio processing library
- [Noisereduce](https://github.com/timedomain/noisereduce) for noise reduction algorithm
- [FastAPI](https://fastapi.tiangolo.com/) community
- All contributors and users

---

<div align="center">

**Made with ❤️ by Siddharudh Sanmukh**

[⬆ Back to Top](#-noisremover)

</div>
