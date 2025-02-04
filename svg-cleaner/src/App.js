import React, { useState } from "react";
import { optimize } from "svgo";

export default function App() {
  const [svgInput, setSvgInput] = useState("");
  const [optimizedSvg, setOptimizedSvg] = useState("");

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setSvgInput(e.target.result);
      reader.readAsText(file);
    }
  };

  const cleanSvg = () => {
    try {
      const result = optimize(svgInput, { multipass: true });
      setOptimizedSvg(result.data);
    } catch (error) {
      alert("Invalid SVG format");
    }
  };

  const downloadSvg = () => {
    const blob = new Blob([optimizedSvg], { type: "image/svg+xml" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "cleaned.svg";
    link.click();
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>SVG Cleaner</h1>
      <input type="file" accept=".svg" onChange={handleFileUpload} />
      <button onClick={cleanSvg}>Optimize</button>
      {optimizedSvg && (
        <>
          <div dangerouslySetInnerHTML={{ __html: optimizedSvg }} style={{ marginTop: "20px", border: "1px solid #ccc", display: "inline-block" }}></div>
          <button onClick={downloadSvg}>Download Cleaned SVG</button>
        </>
      )}
      <ins className="adsbygoogle"
           style={{ display: "block" }}
           data-ad-client="ca-pub-XXXXXXXXXXXX"
           data-ad-slot="YYYYYYYYYY"
           data-ad-format="auto"></ins>
      <script>
           (adsbygoogle = window.adsbygoogle || []).push({});
      </script>

    </div>
  );
}
