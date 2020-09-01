var programming_languages = [
    "python",
    "javascript",
    "ruby",
    "json",
    "java",
    "c",
    "mongodb",
    "html",
    "csharp",
    "golang",
    "sql",
    "kotlin",
    "php",
    "fortran"
]

function randomWord() {
    return programming_languages[Math.floor(Math.random() * programming_languages.length)];
    
}

export {randomWord};