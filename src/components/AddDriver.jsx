import { useState } from "react";
import ImageUploadService from "../services/ImageUploadService";
import DriverService from "../services/DriverService";

const AddDriver = ({onAddDriver}) => {
    const [image, setImage] = useState(null);
    const [newDriver, setNewDriver] = useState({
        id: 0,
        name: "",
        age: "",
        nationality: "",
        driverImage: "",
    })
    const [imageUploadStatus, setImageUploadStatus] = useState("");

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setNewDriver({...newDriver, imageName: file.name});
    }

    const handleAddNewDriver = async()=>{
        setImageUploadStatus("Uploading image...");
        try{
            if(image!=null){
                await ImageUploadService.uploadImage(image);
            }
            setImageUploadStatus("Image uploaded");
        }
        catch(error){
            console.error("error uploading image", error);
            setImageUploadStatus("Upload failed");
        }
        try{
            const response = await DriverService.addDriver(newDriver);
            onAddDriver(newDriver);
            setNewDriver({id: 0, name: "", age: "", nationality: "", driverImage: ""});
        }
        catch(error){
            console.error("error adding driver", error.response.data)
        }
    }
    return(
        <div>
            <input
                type="text"
                placeholder="id"
                value={newDriver.id}
                onChange={(e)=>setNewDriver({...newDriver, id: e.target.value})}
                className="w-full p-2 border-gray-300 rounded"
            >
            </input>
            <input
                type="text"
                placeholder="name"
                value={newDriver.name}
                onChange={(e)=>setNewDriver({...newDriver, name: e.target.value})}
                className="w-full p-2 border-gray-300 rounded"
            >
            </input>
            <input
                type="text"
                placeholder="age"
                value={newDriver.age}
                onChange={(e)=>setNewDriver({...newDriver, age: e.target.value})}
                className="w-full p-2 border-gray-300 rounded"
            >
            </input>
            <input
                type="text"
                placeholder="nationality"
                value={newDriver.nationality}
                onChange={(e)=>setNewDriver({...newDriver, nationality: e.target.value})}
                className="w-full p-2 border-gray-300 rounded"
            >
            </input>
            <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
            > 
            </input>
            <button
                onClick={handleAddNewDriver}
            >Add Driver</button>

            <div>
                {imageUploadStatus && <p>{imageUploadStatus}</p>}
            </div>
        </div>
    )
}
export default AddDriver;