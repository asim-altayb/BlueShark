
import react from "react";

const ImageModal = ({imageUrl , onClose})=> {
if(!imageUrl) return null;

return(
<div className="fixed inset-0 bg-black  bg-opacity-70 flex items-center justify-center z-50">
<div className="relative max-w-3xl w-full p-4 ">
<img src={imageUrl} alt="full size" className="w-full rounded shadow-lg"/>
<button onClick={onClose} className="absolute top-2 right-2 bg-green-300 text-white rounded-full px-3 py-1 hover:bg-green-400">X</button>
</div>

</div>


);


};

export default ImageModal;