export default function Button({ text }) {
  return (
    <button className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
      {text}
    </button>
  );
}
