import { useRef, useState } from "react"
import { ChatStore } from "../../Store/ChatStore";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";


const MessageInput = () => {

  const [text,setText] = useState<string>("")
  const [imagePreview,setImagePreview] = useState("")

  
  // ? Chat Store Send Message ? \\
  const {sendMessages} = ChatStore();
  // ? Chat Store Send Message ? \\


  const fileInput = useRef<HTMLInputElement>(null);


  // ? Handle Image Change ? \\
  const HandleImageChange = async (e:React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if(!file?.type.startsWith("image")){
      toast.error("Please Select An Image !");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    }

    reader.readAsDataURL(file);

  }
  // ? Handle Image Change ? \\


  // ? Remove Image ? \\
  const RemoveImage = async () => {

    setImagePreview("");
  
    if(fileInput.current){
      fileInput.current.value = "";
    }

  }
  // ? Remove Image ? \\


  // ? Handle Send Message ? \\
  const HandleSendMessage = async (e:React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();

    if(!text.trim() && !imagePreview) return;

    try {
      await sendMessages({
        text:text.trim(),
        image:imagePreview
      })
    } catch (error) {
      console.log("Failed To Send Message !",error);
      toast.error("Failed To Send Message !",{duration:3000});
    }

  }
  // ? Handle Send Message ? \\



  return (
    <div className="p-4 w-full">
      
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              onClick={RemoveImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
              flex items-center justify-center"
              type="button"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}

<form onSubmit={HandleSendMessage} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            className="w-full input input-bordered rounded-lg input-sm sm:input-md"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInput}
            onChange={HandleImageChange}
          />
          <button
            type="button"
            className={`hidden sm:flex btn btn-circle
                     ${imagePreview ? "text-emerald-500" : "text-zinc-400"}`}
            onClick={() => fileInput.current?.click()}
          >
            <Image size={20} />
          </button>
        </div>
        <button
          type="submit"
          className="btn btn-sm btn-circle"
          disabled={!text.trim() && !imagePreview}
        >
          <Send size={22} />
        </button>
      </form>

    </div>
  )
}

export default MessageInput
