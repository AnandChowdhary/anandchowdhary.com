import { useEffect, useState } from "preact/hooks";

export default function Emissions() {
  const [emissions, setEmissions] = useState<string>("Amount of");
  useEffect(() => {
    // How many characters are there in the source code?
    const sourceCode = document.documentElement.outerHTML;
    // How many bytes are there in the source code?
    const sourceCodeBytes = new TextEncoder().encode(sourceCode).length;
    // Convert to GB
    const sourceCodeBytesGB = sourceCodeBytes / 1000000000;
    let total = sourceCodeBytesGB;
    const images = document.querySelectorAll("img");
    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      // Get the image bounding box
      const imageRect = image.getBoundingClientRect();
      // Get the image area
      const imageArea = imageRect.width * imageRect.height;
      // Convert to GB approx
      const imageSizeGB = imageArea / 1000000000;
      // Add to total
      total += imageSizeGB;
    }
    setEmissions(`${(total * 0.81 * 0.75 * 442).toFixed(2)} g of`);
  }, []);

  return <span>{emissions}</span>;
}
