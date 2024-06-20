require("dotenv").config();

const pinataSDK = require("@pinata/sdk");

const { PINATA_DOMAIN, PINATA_API_KEY, PINATA_API_SECRET } = process.env;

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
    const pinOptions = {
      pinataMetadata: {
        name: "test.json",
      },
      pinataOptions: {
        cidVersion: 0,
      },
    };
    const res = await pinata.pinJSONToIPFS(json, pinOptions);
    console.log({ res });
    console.log(`Visit https://${PINATA_DOMAIN}/ipfs/${res.IpfsHash}`);
  } catch (err) {
    console.log({ err });
  }
}

const json = {
  song: "Song1",
  singer: "Singer1",
  description: "This is the long description of the Song1",
  imageURL: `https://${PINATA_DOMAIN}/ipfs/<imageCID>`,
  songURL: `https://${PINATA_DOMAIN}/ipfs/<songCID>`,
};

testAuthentication();
uploadJSONToPinata(json);
