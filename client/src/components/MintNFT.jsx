import React, { useState } from "react";
import defaultAxios from "../axios";

const MintNFT = () => {
  const [data, setData] = useState({
    song: "",
    artist: "",
    description: "",
  });

  const [file, setFile] = useState({
    imageFile: null,
    coverImageFile: null,
    songFile: null,
  });

  const handleDataChange = (e) => {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    setFile((prev) => ({
      ...prev,
      [e.target.name]: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("song", data.song);
      formData.append("artist", data.artist);
      formData.append("description", data.description);
      formData.append("file", file.imageFile);
      formData.append("file", file.coverImageFile);
      formData.append("file", file.songFile);

      console.log(data);
      console.log(file);
      console.log(formData);

      const res = await defaultAxios.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log({ res });
    } catch (err) {
      console.log({ err });
    }
  };

  return (
    <div className="container mx-auto py-10">
      <form onSubmit={handleSubmit} className="flex flex-col gap-10">
        <input
          type="text"
          name="song"
          className="form-input"
          placeholder="Name of the Song"
          value={data.song}
          onChange={handleDataChange}
        />
        <input
          type="text"
          name="artist"
          className="form-input"
          placeholder="Name of the Artist"
          value={data.artist}
          onChange={handleDataChange}
        />
        <textarea
          rows={5}
          cols={3}
          name="description"
          className="form-input"
          placeholder="Description for the Song"
          value={data.description}
          onChange={handleDataChange}
        ></textarea>
        <div>
          <label>Choose an Image: </label>
          <input type="file" name="imageFile" onChange={handleFileChange} />
        </div>
        <div>
          <label>Choose a Cover Image: </label>
          <input
            type="file"
            name="coverImageFile"
            onChange={handleFileChange}
          />
        </div>
        <div className="">
          <label>Choose the Song: </label>
          <input type="file" name="songFile" onChange={handleFileChange} />
        </div>
        <button
          type="submit"
          className="self-start px-6 py-3 pb-4 rounded transition-all text-white bg-blue-600 hover:bg-blue-800"
        >
          Upload
        </button>
      </form>
    </div>
  );
};

export default MintNFT;
