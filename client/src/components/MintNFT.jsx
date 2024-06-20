import React, { useState } from "react";
import defaultAxios from "../axios";

const MintNFT = () => {
  const [data, setData] = useState({
    name: "",
    description: "",
    singer: "",
  });

  const [file, setFile] = useState({
    image: null,
    song: null,
  });

  const handleInputChange = (e) => {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    setFile((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.name === "image" ? e.target.files[0] : e.target.files[1],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("singer", data.singer);
      formData.append("image", file.image);
      formData.append("song", file.song);

      console.log(data);
      console.log(file);
      console.log(formData);
      const res = await defaultAxios.post("/upload", formData);
      console.log({ res });

      setData({
        name: "",
        description: "",
        singer: "",
      });
      setFile({
        image: null,
        song: null,
      });
    } catch (err) {
      console.log({ err });
    }
  };

  return (
    <div className="container mx-auto py-10">
      <form onSubmit={handleSubmit} className="flex flex-col gap-10">
        <input
          type="text"
          name="name"
          className="rounded p-3 border border-gray-600"
          placeholder="Give a Song Name"
          value={data.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="singer"
          className="rounded p-3 border border-gray-600"
          placeholder="Artist Name"
          value={data.singer}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="description"
          className="rounded p-3 border border-gray-600"
          placeholder="Give a Song Description"
          value={data.description}
          onChange={handleInputChange}
        />
        <input type="file" name="image" onChange={handleFileChange} />
        <input type="file" name="song" onChange={handleFileChange} />
        <button type="submit">Upload Song</button>
      </form>
    </div>
  );
};

export default MintNFT;
