import React, { useRef } from 'react';
import imageCompression from 'browser-image-compression';

interface Props {
  selectedImage: string | null;
  onImageSelected: (base64: string | null) => void;
  isAnalyzing: boolean;
}

export const ImageUpload: React.FC<Props> = ({ selectedImage, onImageSelected, isAnalyzing }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Compress image before upload
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1024,
      useWebWorker: true
    };

    try {
      const compressed = await imageCompression(file, options);
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64 = reader.result as string;
        onImageSelected(base64);
      };

      reader.readAsDataURL(compressed);
    } catch (error) {
      console.error('Image compression failed:', error);
      alert('Failed to process image. Please try again.');
    }
  };

  const handleCameraClick = () => {
    fileInputRef.current?.click();
  };

  const handleClearImage = () => {
    onImageSelected(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="mb-4">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileChange}
        className="hidden"
      />

      {selectedImage ? (
        <div className="relative">
          <img src={selectedImage} alt="Preview" className="w-full rounded-lg shadow-md" />
          {isAnalyzing && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
              <div className="text-center text-white">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-2"></div>
                <p>Analyzing meal...</p>
              </div>
            </div>
          )}
          {!isAnalyzing && (
            <button
              onClick={handleClearImage}
              className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
            >
              Clear
            </button>
          )}
        </div>
      ) : (
        <button
          onClick={handleCameraClick}
          className="w-full py-12 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:border-primary hover:bg-gray-50 transition"
        >
          <svg
            className="w-12 h-12 text-gray-400 mb-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span className="text-gray-600">Take Photo or Upload</span>
        </button>
      )}
    </div>
  );
};
