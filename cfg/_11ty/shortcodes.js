/**
 * Add Eleventy shortcodes here
 * https://www.11ty.dev/docs/shortcodes/
 */

const path = require("path");
const eleventyImage = require("@11ty/eleventy-img");

const relativeToInputPath = (inputPath, relativeFilePath) => {
    let split = inputPath.split("/");
    split.pop();

    let relativePath = path.resolve(split.join(path.sep), relativeFilePath);

    if (relativeFilePath.startsWith("/")) {
        relativePath = path.resolve("./src/assets" + relativeFilePath);
    }

    return relativePath;
};

const findYouTubeVideoId = (url) => {
    const regex =
        /(?<=v=)[a-zA-Z0-9-]+(?=&)|(?<=v\/)[^&\n]+(?=\?)|(?<=v=)[^&\n]+|(?<=youtu.be\/|www.youtube.com\/embed\/)[^&\n]+/;
    const matches = url.match(regex);
    return matches ? matches[0] : "";
};

module.exports = {
    // Eleventy Image shortcode
    // https://www.11ty.dev/docs/plugins/image/
    image: (eleventyConfig) => {
        eleventyConfig.addAsyncShortcode(
            "image",
            async function imageShortcode(src, alt, widths, classes, sizes) {
                // Full list of formats here: https://www.11ty.dev/docs/plugins/image/#output-formats
                // Warning: Avif can be resource-intensive so take care!
                let formats = ["avif", "webp", "auto"];
                let file = relativeToInputPath(this.page.inputPath, src);
                let metadata = await eleventyImage(file, {
                    widths: widths || ["auto"],
                    formats,
                    // Advanced usage note: `eleventyConfig.dir` works here because we’re using addPlugin.
                    outputDir: path.join(eleventyConfig.dir.output, "img"),
                });

                if (!alt || !alt.length) {
                    // extract name form filename
                    alt = path.basename(src, path.extname(src));
                }

                // TODO loading=eager and fetchpriority=high
                let imageAttributes = {
                    alt,
                    sizes,
                    class: classes + "mx-auto",
                    loading: "lazy",
                    decoding: "async",
                };

                return eleventyImage.generateHTML(metadata, imageAttributes);
            }
        );
    },

    imageExt: (eleventyConfig) => {
        eleventyConfig.addShortcode(
            "imageExt",
            function imageExtShortcode(src, args = {}) {
                args = {
                    ...{
                        loading: "lazy",
                        alt: " ",
                        width: "auto",
                        height: "auto",
                    },
                    ...args,
                };

                args.class = args.class
                    ? args.class + " rounded drop-shadow-lg"
                    : "mx-auto rounded drop-shadow-lg";

                return `<img src="${src}" class="${args.class}" loading="${args.loading}" alt="${args.alt}" width="${args.width}" height="${args.height}">`;
            }
        );
    },

    year: (eleventyConfig) => {
        eleventyConfig.addShortcode("year", function yearShortcode() {
            return new Date().getFullYear();
        });
    },

    video: (eleventyConfig) => {
        eleventyConfig.addShortcode(
            "video",
            function videoShortcode(src, poster, classes) {
                return `<video class="${classes}" poster="${poster}" controls><source src="${src}" type="video/mp4"></video>`;
            }
        );
    },

    videoImage: (eleventyConfig) => {
        eleventyConfig.addShortcode(
            "videoImage",
            function videoImageShortcode(src, classes) {
                if (src.startsWith("./")) {
                    src = "/videos/" + src.slice(2);
                }
                classes = classes
                    ? classes + " w-full h-auto"
                    : "w-full h-auto";
                return `<video class="${classes}" autoplay="" loop="" muted="" playsinlin="" src="${src}"></video>`;
            }
        );
    },

    youTube: (eleventyConfig) => {
        eleventyConfig.addShortcode(
            "youTube",
            function youTubeShortcode(videoId, videoTitle = "YouTube video") {
                if (videoId.startsWith("https://")) {
                    videoId = findYouTubeVideoId(videoId);
                }
                return `<lite-youtube x-on:click.stop videoid="${videoId}" class="my-8 mx-auto rounded drop-shadow-lg" style="background-image: url('https://i.ytimg.com/vi/${videoId}/hqdefault.jpg');">
						  <a href="https://youtube.com/watch?v=${videoId}" class="lty-playbtn" title="Play Video">
							<span class="lyt-visually-hidden">Play Video: ${videoTitle}</span>
						  </a>
						</lite-youtube>`;
            }
        );
    },
};
