const sharp = require("sharp");
const download = require("image-downloader");

const imgTypes = ["jpeg", "png", "jpg", "svg", "tif"];

module.exports = function (req, res, next) {
    const uri = 'https://i.postimg.cc/05GfKfKz/IMG-9400.jpg'

    const imgextension = uri.split('.').pop()

    if (imgTypes.includes(imgextension)) {
        const dt = {
            url: uri,
            dest: `${__dirname}/public/images/oldfolder/`
        }
        const resizeimg = `${__dirname}/public/images/newfolder/`

        download.image(dt)
            .then(({ filename }) => {
                sharp(filename)
                    .resize(50, 50)
                    .toFile(`${resizeimg}output.${imgextension}`, (err) => {
                        if (err) { return next(err) }
                        return res.json({
                            success: true,
                            output: 'Image has been resized',
                            thumbnail: resizeimg,
                        })
                    })
            })
    }
    else {
        res.status(400).json({
            success: "false",
            error: `We only handle image files with extensions - ${[...imgTypes]}`
        })
        mlog.error('This is .error()');
    }
};
