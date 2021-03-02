async function getDefaultDictionary() {
    const response = await globalThis.fetch("./lib/sowpods.txt");
    const text = await response.text();
    //const dictionary = text.split("\n").map((str) => str.toLowerCase());

    console.log(text);
    return [];
}

export default getDefaultDictionary;
