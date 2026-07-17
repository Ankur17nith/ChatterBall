const axios = require("axios");

async function translateMessage(text, targetLanguage){
    try {
        const response= await axios.post(
            process.env.LIBRETRANSLATE_URL,
            {
                q:text,
                source: auto,
                target: targetLanguage
            }
        )

        return response.data.translatedTest;
    } catch (error) {
        console.error("Translation Error:", error.message);

        // If translation fails, return the original text
        return text;
    }
}

module.exports = {
    translateMessage,
};