// --------------------------------------------------
//
// UploadImage.js
// - Creates a new Entry with a Content Model type of Article
// - Info parsed from inputs on articleWriting.js
//
// Contentful Documentation: https://www.contentful.com/help/adding-new-entry/
//
// Modification Log:
// 01 06 - Thomas O. created UploadImage.js
//
// TODO: 
// - Upload image to a cloud software (probably Google)
// - https://developers.google.com/drive/api/guides/manage-uploads#node.js
// - https://www.daimto.com/upload-image-to-google-drive-with-node-js/#Drive_service
//
// --------------------------------------------------


import { createWriteStream } from "fs";
import { v4 as uuidv4 } from "uuid";
import {
    parse as parseContentType,
    format as formatContentType,
} from "content-type";

// Set your Contentful space ID and access token
const contentful = require("contentful-management");

const client = contentful.createClient({
    accessToken: "CFPAT-r1ZzcvV18KpPzLm7dhrNJlMngdzJf-xlYlgcw6QfIe4",
});

export default async (req, res) => {
    let spaceID = process.env.CONTENTFUL_SPACE_ID;

    try {

        // 1. Try to upload the image file to Thumbnails folder in Mirror App google drive folder


        // 2. Upload the actual image file to Contentful as an asset with the Google Drive URL provided

        // Get the file from the request body
        const file = req.body;
        console.log("🚀 ~ file: UploadImage.js:21 ~ file", req.body)

        // Generate a unique file name for the asset
        const fileName = `${uuidv4()}.png`;

        // Create a write stream to the file
        const stream = createWriteStream(fileName);
        stream.write(file);
        stream.end();

        // Set the Content-Type and Content-Disposition headers for the asset
        const contentType = formatContentType(parseContentType("image/png"));
        const contentDisposition = `inline; filename=${fileName}`;

        // Create a new asset for the file
        const response = await fetch(
            `https://api.contentful.com/spaces/${spaceID}/uploads`,
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer CFPAT-r1ZzcvV18KpPzLm7dhrNJlMngdzJf-xlYlgcw6QfIe4`,
                    "Content-Type": contentType,
                    "Content-Disposition": contentDisposition,
                },
                body: file.data,
            }
        );
        
        console.log("🚀 ~ file: UploadImage.js:48 ~ response", response)

        // Get the asset URL from the response
        const assetUrl = await response.json();
        console.log("🚀 ~ file: UploadImage.js:51 ~ assetUrl", assetUrl)

        // Return the asset URL to the client
        res.status(200).json({ url: assetUrl.url });
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({ error: "Failed to upload asset" });
    }
}
