export default function Toast({ message }) {
  if (!message) return null;

  return (
    <div className="fixed top-6 right-6 z-[9999]">
      <div className="bg-green-600 text-white px-6 py-3 rounded-xl shadow-lg animate-slide-in">
        {message}
      </div>
    </div>
  );
}
