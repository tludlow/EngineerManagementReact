//A stack used to store where the user was last.
let browserStack = [];

//Push the url to the stack.
export const push = (path) => {
    browserStack.push(path);
}

//Get the last url from the stack.
export const get = () => {
    return browserStack.pop();
}