export const createLetter = () => {
    let options = [];
    for (let i = 65; i < 90; i++) {
        options.push({ name: String.fromCharCode(i), names: String.fromCharCode(i) });
    }
    return options;
}