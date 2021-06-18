import data from './data.json';
import names from './names.json';

async function emulateRequest(data, timeout = 1500) {
    let fake_response = new Promise((resolve) => {
        setTimeout(() => {
            resolve(data);
        }, timeout);
    });
    return await fake_response;
}

async function getData() {
    return await emulateRequest(data);
}

async function getNames() {
    return await emulateRequest(names);
}

export { getData, getNames };
