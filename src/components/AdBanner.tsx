import React from "react";

interface AdBannerProps {
  adSlot?: string; // Optional for static mode
  adFormat?: "auto" | "rectangle" | "horizontal" | "vertical";
  className?: string;
  isStatic?: boolean; // New: Enable static placeholder for testing
}

const AdBanner: React.FC<AdBannerProps> = ({
  adSlot,
  adFormat = "auto",
  className = "",
  isStatic = false, // Default to real ad
}) => {
  if (isStatic) {
    // Static placeholder for local testing
    return (
      <div
        className={`ad-container bg-gray-200 p-4 rounded-lg shadow-md ${className}`}
      >
        <div className="flex flex-col items-center justify-center w-full h-32 border border-gray-400 border-dashed">
          <p className="text-lg font-bold text-gray-700">
            Static Ad Placeholder
          </p>
          <p className="text-sm text-gray-500">
            This is a test banner (300x250 example)
          </p>
          <button className="hover:bg-blue-600 px-4 py-2 mt-2 text-white bg-blue-500 rounded">
            Fake Call to Action
          </button>
        </div>
      </div>
    );
  }

  // Real AdSense ad (as before)
  return (
    <div className={`ad-container ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" // Your publisher ID
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive="true"
      ></ins>
      <script
        dangerouslySetInnerHTML={{
          __html: "(adsbygoogle = window.adsbygoogle || []).push({});",
        }}
      />
    </div>
  );
};

export default AdBanner;
