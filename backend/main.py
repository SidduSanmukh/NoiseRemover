from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse

import librosa
import noisereduce as nr
import soundfile as sf

import os
import uuid

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "uploads"
CLEAN_DIR = "cleaned"

os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(CLEAN_DIR, exist_ok=True)


@app.get("/")
def home():
    return {"message": "Audio Noise Remover API Running"}


@app.post("/remove-noise")
async def remove_noise(file: UploadFile = File(...)):

    # Unique filename
    file_id = str(uuid.uuid4())

    input_path = f"{UPLOAD_DIR}/{file_id}.wav"
    output_path = f"{CLEAN_DIR}/{file_id}_clean.wav"

    # Save uploaded file
    with open(input_path, "wb") as buffer:
        buffer.write(await file.read())

    # Load audio
    data, rate = librosa.load(input_path, sr=None)

    # Reduce noise
    reduced_noise = nr.reduce_noise(
        y=data,
        sr=rate
    )

    # Save cleaned audio
    sf.write(output_path, reduced_noise, rate)

    # Return cleaned file
    return FileResponse(
        output_path,
        media_type="audio/wav",
        filename="clean_audio.wav"
    )