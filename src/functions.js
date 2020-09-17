export function titleCase(snake_case_string) {

    const sentence = snake_case_string.split("_");
    return sentence.join(' ');

}

export function snakeCase(TitleCaseString) {
    const sentence = TitleCaseString.split(' ');
    return sentence.join('_');
}

export function makeFirstLetterUpperCase(word) {
    const [firstLeter, ...restOfWord] = word;
    return `${firstLeter.toUpperCase()}${restOfWord.join('')}`;
}