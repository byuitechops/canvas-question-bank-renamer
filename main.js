/*************************************************************************
 * Module Description
 *************************************************************************/
module.exports = {
   main
};

let browser = require('puppeteer-canvas-login');
let pTimes = require('p-times');

//Checks if text needs to be changed, then replaces it
async function replaceText(search, replace, page, logObject) {
    const textBefore = await page.evaluate(() => document.querySelector('#assessment_question_bank_title').value);
    //If no change, update log and return
    if(!textBefore.includes(search)) {
        logObject.changed = 'No';
        logObject.before = textBefore;
        logObject.after = textBefore;
        return logObject;
    //If change, replace, update log, and return
    } else {
        logObject = await page.evaluate((search, replace, logObject) => {
            //Get element's text and place
            let place = document.querySelector('#assessment_question_bank_title');
            text = place.value;
            //Search and replace
            let regex = new RegExp(search, "g");
            text = text.replace(regex, replace);
            place.value = text;
            //Update log object, return
            logObject.after = text;
            return logObject;
        }, search, replace, logObject);
        //Update log object, return
        logObject.changed = 'Yes';
        logObject.before = textBefore;
        return logObject;
    }
}
async function fixElement(element, search, replace, page, logObject) {
    await element.click();
    await page.waitForSelector('#assessment_question_bank_title');
    logObject = await replaceText(search, replace, page, logObject);
    await page.click('h1');
    logObject.error = 'No';
    return logObject;
}
async function loopPages(courseIDs, search, replace) {
    //Access each url and checks question banks
    let logArray = [];
    await pTimes(courseIDs.length, async function (i) {
        
        //New page to url
        let page = await browser.newPage();
        let url = `https://byui.instructure.com/courses/${courseIDs[i]}/question_banks/`;
        await page.goto(url);
        
        //Grab the elements
        let list = await page.$$('a.Button.Button--icon-action.edit_bank_link');
        list = list.slice(1);
        
        //Go through each of them
        for (let j = 0; j < list.length; j++) {
            //OBJ for logging
            let logObject = {
                course: courseIDs[i],
                changed: '-',
                before: '-',
                after: '-',
                error: '-'
            }
            try {
                logObject = await fixElement(list[j], search, replace, page, logObject);
                logArray.push(logObject);
                //If no change and it should, throw
                //if (test.includes(search)) {
                //    throw new Error('Edit box did not change');
                //}
            } catch (firstEditError) {
                try {
                    logObject = await fixElement(list[j], search, replace, page, logObject);
                    //const test = await page.evaluate(() => document.querySelector('#assessment_question_bank_title').value);
                    //If no change and it should, throw
                    //if (test.includes(search)) {
                    //    throw new Error('Edit box did not change');
                    //}
                } catch (secondEditError) {
                    logObject.error = secondEditError.message;
                    return logObject;
                }
            }
        }
        
        //Close and return log
        await page.waitForSelector('.loading_image_holder', {hidden: true});
        await page.close();

    }, {concurrency: 10})
    return logArray;
}

//Main
async function main(search, replace, courseIDs) {
    //Browser inputs
    inputs = {
        userName: process.env.USERNAMENODE,
        passWord: process.env.PASSWORD,
        launchOptions: {
            headless: false,
        }
    };
    await browser.login(inputs);
 
    let logArray = await loopPages(courseIDs, search, replace); 

    //Close browser, format and send array of objs
    await browser.logout();
    //logArray = flatten(logArray);
    return logArray;
}