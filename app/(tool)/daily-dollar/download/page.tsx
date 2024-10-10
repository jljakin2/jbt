import DownloadPreview from "../components/download-preview";

export const dynamic = "force-dynamic";

export default function DownloadPage() {
  return (
    <main className="bg-gray-100 w-full min-h-screen flex flex-col gap-12 pb-12 relative overflow-hidden">
      {/* Dotted background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)",
          backgroundSize: "20px 20px",
          opacity: 0.1,
        }}
      />
      <DownloadPreview />
    </main>
  );
}
