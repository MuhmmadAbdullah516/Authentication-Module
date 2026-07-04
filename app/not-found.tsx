import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-gray-100 h-full">
      <h2 className="text-4xl font-bold text-[#1e2550] mb-4">404</h2>
      <p className="text-lg text-gray-600 mb-8">Page Not Found</p>
      <Link
        href="/"
        className="px-6 py-2 bg-[#1e2550] text-white rounded-md hover:bg-[#2a3470] transition-colors"
      >
        Return Home
      </Link>
    </div>
  );
}
