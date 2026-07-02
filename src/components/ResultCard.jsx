import { useDispatch } from "react-redux";
import { addCollection, removeCollection } from "../redux/features/collectionSlice";

const ResultCard = ({ item , showSave = true , showRemove = false , onCardClick }) => {
  const dispatch = useDispatch();
  const cardRatio = `${item.width || 4}/${item.height || 5}`;

  const addToCollection = (item) => {
    dispatch(addCollection(item));
  };

  const removeFromCollection = (item) => {
    dispatch(removeCollection(item));
  };

  return (
    <div 
      onClick={() => {
        if(onCardClick){
          onCardClick(item)
        }
      }}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-lg transition duration-300 hover:scale-105 hover:shadow-[0_0_35px_#477023] cursor-pointer"
    >
      <div
        className="block"
        style={{ aspectRatio: cardRatio }}
      >
        {item.type === "photo" && (
          <img
            className="w-full h-full object-cover object-center transition duration-300 group-hover:brightness-75"
            src={item.src}
            alt={item.title || "photo"}
          />
        )}

        {item.type === "video" && (
          <video
            className="w-full h-full object-cover object-center transition duration-300 group-hover:brightness-75"
            autoPlay
            loop
            muted
            playsInline
            src={item.src}
          />
        )}
      </div>

      <div
        id="bottom"
        className="flex justify-between gap-3 items-end w-full px-3 py-4 absolute bottom-0 text-white bg-gradient-to-t from-[#071E07] to-transparent opacity-0 group-hover:opacity-100 transition duration-300"
      >
        <h2 className="text-sm font-semibold capitalize max-h-12 overflow-hidden">
          {item.title}
        </h2>

        {showSave && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCollection(item);
            }}
            className="bg-[#0D330E] active:scale-95 text-white rounded-4xl px-3 py-1 cursor-pointer font-medium"
          >
            Save
          </button>
        )}

        {showRemove && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              removeFromCollection(item);
            }}
            className="bg-[#E60023] active:scale-95 text-white rounded-4xl px-3 py-1 cursor-pointer font-medium"
          >
            Remove
          </button>
        )}
      </div>
    </div>
  );
};

export default ResultCard;
