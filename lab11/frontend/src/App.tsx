import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [uploaded, setUploaded] = useState<any>(null);
  const api = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const upload = async () => {
    if (!file) return;

    const form = new FormData();
    form.append("file", file);

    const res = await axios.post(`${api}/files`, form, {
      onUploadProgress: (e) => {
        setProgress(Math.round((e.loaded * 100) / e.total!));
      },
    });

    setUploaded(res.data);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Завантаження файлів</h1>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />

      {preview && (
        <div>
          <h3>Прев'ю:</h3>
          <img src={preview} width={300} />
        </div>
      )}

      {file && (
        <button onClick={upload}>Завантажити</button>
      )}

      {progress > 0 && progress < 100 && (
        <p>Прогрес: {progress}%</p>
      )}

      {uploaded && (
        <div>
          <h3>Завантажено:</h3>
          <img src={uploaded.url} width={300} />
        </div>
      )}
    </div>
  );
}

export default App;
