const EventEmmitter = require('events');

const customEmitter = new EventEmmitter();

customEmitter.on("timer", (msg) => console.log(msg))

setInterval(() => {
    customEmitter.emit("timer", "Hi! How are you?")
}, 3000);

const waitForEvent = () => {
    return new Promise((resolve) => {
        customEmitter.on("happens", (msg) => resolve(msg))
    })
}

const doWait = async () => {
    const msg = await waitForEvent()
    console.log('The event message is: ', msg);
}

doWait()
customEmitter.emit("happens", "Hello there!")

customEmitter.on('response', (title, ISBN) => {
    console.log(`The title of the book is "${title}" and it's ISBN is ${ISBN}` );
})

customEmitter.on('response2', (winner, grade) => {
    console.log(`The winner is : ${winner} from ${grade}'th grade`);
})

customEmitter.on('button', (name, status) => {
    console.log(`The person who pushed the button is ${name} and the status of their request is: ${status}`);
})

customEmitter.emit('response', 'The Lord of the Rings', 124581841515)
customEmitter.emit('response2', 'Niki', 11)
customEmitter.emit('button', 'Jack', true)