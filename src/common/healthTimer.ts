import * as fs from 'fs';
import * as path from 'path';

const filePath = path.resolve(__dirname, 'timer.json');

export function updateTimer() {
    const now = new Date();
    const dateTimeString = now.toISOString();

    const dateTimeObject = {
        currentDateTime: dateTimeString
    };
    const jsonString = JSON.stringify(dateTimeObject, null, 2);

    //console.log(jsonString);
    fs.writeFileSync(filePath, jsonString);
}

export function computeTimeDifference() {
    const data = fs.readFileSync(filePath, 'utf8');
    const dateTimeObject = JSON.parse(data);
    const savedDateTime = new Date(dateTimeObject.currentDateTime);
    const now = new Date();
    const differenceInMilliseconds = now.getTime() - savedDateTime.getTime();
    const differenceInMinutes = Math.floor(differenceInMilliseconds / (1000 * 60));
    //console.log(data);
    return differenceInMinutes;
}

export function createTimer() {

    // Only create a new file if it does not exist.
    if (!fs.existsSync(filePath)) {
        const now = new Date();
        const dateTimeString = now.toISOString();
    
        const dateTimeObject = {
            currentDateTime: dateTimeString
        };
        const jsonString = JSON.stringify(dateTimeObject, null, 2);
        //console.log(jsonString);
        fs.writeFileSync(filePath, jsonString);
    }

}