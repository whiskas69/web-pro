function sayHello () {
    return "Hello world!"
}

function isString (input) {
    return (typeof input == "string")
}

function isNumber (input) {
    return (typeof input == "number")
}

function isArray (input) {
    return (Array.isArray(input))   
}

function isObject (input) {
    return (
        typeof input === 'object' &&
        input !== null &&
        !Array.isArray(input)
    );
}

function isFunction (input) {
    return (typeof input == "function")
}