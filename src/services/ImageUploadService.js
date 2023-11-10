import axios from "axios";

const ImageUploadService =( () =>{
    const imageUploadUrl = "http://localhost:5056/uploadImage";

    const uploadImage = async (image) => {
        const formData = new FormData();
        formData.append(image);

        const result = await axios({
            url: imageUploadUrl,
            method: "POST",
            data: formData,
            headers: { "Content-Type": "multipart/form-data"}
        });
        formData.delete();
    }
    return {
        uploadImage
    }

})();
export default ImageUploadService;