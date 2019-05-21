let brows = require('puppeteer-canvas-login');
let pMap = require('p-map');

let search = process.argv[2];
let replace = process.argv[3];

function err(e) {
    console.log(e.message);
}

async function setText(page) {
    let words = await page.evaluate((search, replace) => {
        let place = document.querySelector('#assessment_question_bank_title');
        words = place.value;
        if(!words.includes(search)) {
            return;
        }
        let regex = new RegExp(search, "g");
        words = words.replace(regex, replace);
        place.value = words;    
    },search, replace);
    return words;
}

async function main() {
    inputs = {
        userName: process.env.USERNAMENODE,
        passWord: process.env.PASSWORD,
        subdomain: 'byui.instructure.com',
        launchOptions: {
            defaultViewport: {
                width: 1900,
                height: 1080
            },
            args: ['--start-maximized'],
            headless: false,
            // devtools: true
        }
    };
    await brows.login(inputs);

    // let course_id = 49810;
    let course_id = 55036;

    //Loop here
    let page = await brows.newPage().catch(err);
    let url = `https://byui.instructure.com/courses/${course_id}/question_banks/`
    await page.goto(url).catch(err);

    //Grab the elements
    let list = await page.$$('a.Button.Button--icon-action.edit_bank_link').catch(err);
    list = list.slice(1);

    //Go through each of them
    for (let i = 0; i < list.length; i++) {
        await list[i].click();
        await page.waitForSelector('#assessment_question_bank_title', {visible: true});
        let str = await setText(page);
        await page.click('#byui-copyright');
    }
}

main();