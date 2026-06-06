import { useState } from "react";
import axios from "axios";

function App() {

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {

    if (!file) {
      alert("Please select an audio file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {

      setLoading(true);

      const response = await axios.post(
        "http://127.0.0.1:8000/remove-noise",
        formData,
        {
          responseType: "blob"
        }
      );

      // Create download link
      const url = window.URL.createObjectURL(
        new Blob([response.data])
      );

      const link = document.createElement("a");

      link.href = url;
      link.setAttribute("download", "clean_audio.wav");

      document.body.appendChild(link);

      link.click();

      link.remove();

    } catch (error) {

      console.error(error);
      alert("Error processing audio");

    } finally {

      setLoading(false);

    }
  };

  return (
    <div style={styles.container}>

      <h1>AI Audio Noise Remover</h1>

      <input
        type="file"
        accept="audio/*"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button
        onClick={handleUpload}
        style={styles.button}
      >
        {loading ? "Processing..." : "Remove Noise"}
      </button>

    </div>
  );
}

const styles = {

  container: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    fontFamily: "Arial"
  },

  button: {
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer"
  }
};

export default App;