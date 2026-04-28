
import react from "react";

const TextModal = ({ text, onClose }) => {
    if (!text) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50" onClick={onClose}>
            <div className="relative max-w-4xl w-full max-h-[80vh] p-6 bg-white rounded-lg shadow-2xl overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <div className="mb-4">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Supply Letter</h2>
                    <div className="text-gray-700 text-lg whitespace-pre-wrap leading-relaxed">
                        {text}
                    </div>
                </div>
                <button onClick={onClose} className="absolute top-4 right-4 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition">
                    ✕
                </button>
            </div>

        </div>


    );


};

export default TextModal;
