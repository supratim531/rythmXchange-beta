const cors = require("cors");
const multer = require("multer");
const dotenv = require("dotenv");
const express = require("express");
const pinataSDK = require("@pinata/sdk");
const streamifier = require("streamifier");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const pinata = new pinataSDK({ pinataJWTKey: process.env.PINATA_JWT });

const upload = multer({
  limits: {
    fileSize: 1000000000,
  },
});

app.post("/upload", cors(), upload.array("file"), async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.files);
    const [file1, file2] = req.files;
    const readableStreamOfFile1 = streamifier.createReadStream(file1.buffer);
    const readableStreamOfFile2 = streamifier.createReadStream(file2.buffer);

    const optionsOfFile1 = {
      pinataMetadata: {
        name: file1.originalname,
      },
      pinataOptions: {
        cidVersion: 0,
      },
    };
    const optionsOfFile2 = {
      pinataMetadata: {
        name: file2.originalname,
      },
      pinataOptions: {
        cidVersion: 0,
      },
    };

    const response1 = await pinata.pinFileToIPFS(
      readableStreamOfFile1,
      optionsOfFile1
    );
    const response2 = await pinata.pinFileToIPFS(
      readableStreamOfFile2,
      optionsOfFile2
    );

    const json = {
      name: "Name1",
      attributes: [
        {
          singer: "Singer1",
          country: "Country1",
        },
      ],
      description: "Long description1",
      song: `https://blue-defensive-rhinoceros-347.mypinata.cloud/ipfs/${response2.IpfsHash}`,
      image: `https://blue-defensive-rhinoceros-347.mypinata.cloud/ipfs/${response1.IpfsHash}`,
    };
    const options = {
      pinataMetadata: {
        name: `${file2.originalname}.metadata.json`,
      },
      pinataOptions: {
        cidVersion: 0,
      },
    };

    const response = await pinata.pinJSONToIPFS(json, options);
    console.log({ response });

    return res.status(201).json({
      status: `https://${process.env.PINATA_DOMAIN}/ipfs/${response.IpfsHash}`,
    });
  } catch (err) {
    console.log({ err });

    return res.status(500).json({
      error: err,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
