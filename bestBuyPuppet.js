const puppeteer = require('puppeteer');
const supportFuncs = require('../supportFuncs');
let processArray = [];

function bestBuyRestock(){
    //keep refreshing page 
}

function change_stat_Color_and_message(dick,dic){
    console.log(" ")
};

const delay = millis => new Promise((resolve, reject) => {
    setTimeout(_ => resolve(), millis)
});


async function runBestBuyPuppet(url,bot_row_number,account_email,account_password,security_code){

    //Page Setup.........
    //----------------------------------------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------------------------------------
    //---------------------------------------------------------------------------------------------------------------
    //launches the browser....
    const browser = await puppeteer.launch({
        headless: false, //false or true
        args: ['--window-size=1000,600',
        '--disable-web-security',
        '--disable-features=IsolateOrigins,site-per-process']
    });

    // You can simply run this to get the browser's pid
    const browserPID = browser.process().pid    
    processArray.push(browserPID); //adds the individual process ID to process array incase we need to kill it
    const page = await browser.newPage();
    

    //open url
    change_stat_Color_and_message(bot_row_number,'Heading To Site\n'); //for changing color and updates text in status td
    await page.goto(url);

    //node kithpuppet.js https://kith.com/collections/mens-footwear/products/cn172936c
    //const supportFuncLib = require('./supportFuncs');
    //supportFuncLib.kithSelectSize(bot_row_number,page,mySizeList);

    try{//add to cart click....
        await delay(1000);
        //await page.waitForSelector(".c-button c-button-primary c-button-lg c-button-block c-button-icon c-button-icon-leading add-to-cart-button")
        await page.click('[class="c-button c-button-primary c-button-lg c-button-block c-button-icon c-button-icon-leading add-to-cart-button"]');
    }catch{
        //add to cart click....
        await delay(4000);
        //await page.waitForSelector(".c-button c-button-primary c-button-lg c-button-block c-button-icon c-button-icon-leading add-to-cart-button")
        await page.click('[class="c-button c-button-primary c-button-lg c-button-block c-button-icon c-button-icon-leading add-to-cart-button"]');
    }

    

    try{
        await delay(1500)
        await page.evaluate(()=>{
        document.getElementsByClassName('c-button c-button-secondary c-button-sm c-button-block ')[0].click()
        });
    }catch{
        await delay(4000)
        await page.evaluate(()=>{
        document.getElementsByClassName('c-button c-button-secondary c-button-sm c-button-block ')[0].click()
        });
    }

    //go to item url 
    //add item to cart

    //click the checkout button
    try{
        await delay(1000);
        await page.click("[class='btn btn-lg btn-block btn-primary']");
    
    }catch{
        await delay(4000);
        await page.click("[class='btn btn-lg btn-block btn-primary']");
    
    }
    
    //select if we want to login or continue as guest
    
    if(account_email !="N/A"){
        //LOGIN
        //await delay(1000);
        await page.waitForSelector("#fld-e");
        //Email Entry
        await page.type("#fld-e",account_email);

        //Password Entry
        await page.type("#fld-p1",account_password);

        //click login button
        await page.click("[class='c-button c-button-secondary c-button-lg c-button-block c-button-icon c-button-icon-leading cia-form__controls__submit ']");

        try{
            // Continue to payment information
            await delay(1000)
            //supportFuncs.bestBuyContinueBtnClick(page);
            await page.evaluate(()=>{
                document.getElementsByClassName('btn btn-lg btn-block btn-secondary')[0].click()
            });
        }catch{
            await delay(2400);
            // Continue to payment information
            //supportFuncs.bestBuyContinueBtnClick(page);
            await page.evaluate(()=>{
                document.getElementsByClassName('btn btn-lg btn-block btn-secondary')[0].click()
            });
        }

        //enter security code to saved card...
        await page.type(".tb-input v-medium ",security_code);

        //Place Order...
        await page.click("[class = '']")
    }else{
        //Click checkout as guest
        await page.click('[class="c-button c-button-secondary c-button-lg cia-guest-content__continue guest"]');

        //click switch shipping
        await page.evaluate(()=>{
            document.getElementsByClassName('ispu-card__switch')[0].click()
        })  
    }
//c-radio-input appearance-none h-full w-full rounded-full border-dark 

}

runBestBuyPuppet("https://www.bestbuy.com/site/microsoft-xbox-series-s-512-gb-all-digital-console-disc-free-gaming-white/6430277.p?skuId=6430277",0,"rexdreyv5@gmail.com","lindaray651999","221")