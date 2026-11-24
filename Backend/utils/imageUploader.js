const cloudinary = require('cloudinary').v2;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Cloudinary sometimes throttles bursts ("Too many concurrent requests"), so retry a few times.
const isRateLimited = (err) =>
    err?.http_code === 420 || err?.http_code === 429 ||
    /too many|rate limit|slow down/i.test(err?.message || "");

const uploadImageToCloudinary = async (file, folder, height, quality) => {

    const options = {
        folder: folder
    };

    if (height) {
        options.height = height;
    }
    if (quality) {
        options.quality = quality;
    }

    options.resource_type = 'auto';

    const maxAttempts = 4;
    for (let attempt = 1; ; attempt++) {
        try {
            return await cloudinary.uploader.upload(file.tempFilePath, options);
        } catch (err) {
            if (attempt >= maxAttempts || !isRateLimited(err)) throw err;
            await sleep(1000 * attempt); // 1s, 2s, 3s
        }
    }
}

module.exports = uploadImageToCloudinary;
