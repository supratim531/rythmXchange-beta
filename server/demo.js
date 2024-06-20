const dotenv = require("dotenv");
const pinataSDK = require("@pinata/sdk");

dotenv.config();
const { PINATA_API_KEY, PINATA_API_SECRET } = process.env;
const pinata = new pinataSDK(PINATA_API_KEY, PINATA_API_SECRET);

async function testAuthentication() {
  try {
    const res = await pinata.testAuthentication();
    console.log({ res });
  } catch (err) {
    console.log({ err });
  }
}

async function uploadJSONToPinata(json) {
  try {
    const options = {
      pinataMetadata: {
        name: "test.json",
      },
      pinataOptions: {
        cidVersion: 0,
      },
    };
    const res = await pinata.pinJSONToIPFS(json, options);
    console.log({ res });
  } catch (err) {
    console.log({ err });
  }
}

const json = {
  name: "Test JSON File1",
  description: "This is a long description of this JSON1",
  attributes: {
    singer: "Name of Singer1",
    album: "Album1",
  },
  song: "songCID",
  image: "imageCID",
};

testAuthentication();
uploadJSONToPinata(json);
