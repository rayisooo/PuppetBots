const url = "";
var processArray = [];
var keywords = "Bling Box Logo Skateboard";
var itemType ="jackets";
var headMode = false;
var chrome_doll_driver_path = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
//GLOBAL VARIABLES......
var Grabbed_Price_For_Discord_Feedback;
var Grabbed_Image_URL_For_Dicord_Feedback;
var Grabbed_Item_Name_For_Discord_Feedback;


function change_stat_Color_and_message(dick,dic){
    console.log(dic)
};

const delay = millis => new Promise((resolve, reject) => {
    setTimeout(_ => resolve(), millis)
});



//main SUPREME function....
async function  runSupremePuppet(headMode,url,keywords,itemType,bot_row_number,full_name,email,phoneNumber,address,zipcode,city,state,cardnumber,cardMonth,cardYear,CVV,mode,proxy){
    
    const supportFuncLib = require('../supportFuncs.js');//so i can call functions from the support.js file

    //const puppeteer = require('puppeteer-extra')
    const puppeteer = require('puppeteer');
    //stealth
    //const pluginStealth = require("puppeteer-extra-plugin-stealth");
    //puppeteer.use(pluginStealth());
    

   //Page Setup....
   //========================================================================================================================
   //========================================================================================================================
   //======================================================================================================================== 

   const browser = await puppeteer.launch({
    headless: headMode,
    executablePath:chrome_doll_driver_path,
      args: ['--window-size=850,600',
      '--disable-web-security',
      '--disable-features=IsolateOrigins,site-per-process',
      '--ignore-certifcate-errors',
      '--ignore-certifcate-errors-spki-list',
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-infobars'],
      ignoreHTTPSErrors: true
});

    // You can simply run this to get the browser's pid
    const browserPID = browser.process().pid    
    processArray.push(browserPID); //adds the individual process ID to process array incase we need to kill it

    
    const page = await browser.newPage();

    change_stat_Color_and_message(bot_row_number,'Heading To Site\n'); //for changing color and updates text in status td
    //========================================================================================================================
    //========================================================================================================================
    //========================================================================================================================







    //goes to either the direct url or searches for the item...
    //-------------------------------------------------------------------------------------------------------------------------
    if(url == ""){
        //if no url is passed then we search for the item manualy
        await page.goto('https://www.supremenewyork.com/shop/all');

        //FIGURES OUT ITEM TYPE THEN WE CALL THE FUNCTION Search for product...
        //select item type...
        await supportFuncLib.supremeSelectItemType(page,itemType,keywords,bot_row_number);
    }else{
        await page.waitFor(1000)
        await page.goto(url);
    }
    //-------------------------------------------------------------------------------------------------------------------------





    //IF WE REACH DOWN HERE THAT MEANS THAT THE ITEM WAS FOUND AND WE ARE ON THE PAGE FOR THE ITEM
    //if item is found then we need to grab the price and the image url
    await page.waitForXPath('//*[@id="details"]/p[4]',{timeout:4000}); 
    Grabbed_Price_For_Discord_Feedback = await page.evaluate('document.querySelector("#details > p.price > span").textContent');
    console.log(Grabbed_Price_For_Discord_Feedback);

    //now we get the image url
    Grabbed_Image_URL_For_Dicord_Feedback = await page.evaluate('document.querySelector("#img-main").src')
    console.log(Grabbed_Image_URL_For_Dicord_Feedback)

    Grabbed_Item_Name_For_Discord_Feedback = await page.evaluate('document.querySelector("#details > h2").textContent');
    console.log(Grabbed_Item_Name_For_Discord_Feedback);


    //now we should be on product page so we select size and cart the item.....
    //.....
    //-------------------------------------------------------------------------------------------------------------------------
    //add to cart
    change_stat_Color_and_message(bot_row_number,'Carting....\n'); //for changing color and updates text in status td

    //click add to cart BTN
    await page.waitForSelector("#form-buttons",{timeout: 40000}); //wait up to 4 minutes
    await page.click('input[name = "commit"]');

    //CLICK CHECKOUT BTN
    try{
        change_stat_Color_and_message(bot_row_number,'Carting....\n'); //for changing color and updates text in status td
        await page.waitForSelector('[class = "button checkout"]',{timeout:20000});
        await page.click('[class = "button checkout"]')
        
    }catch{
        change_stat_Color_and_message(bot_row_number,'Failed Click Activating counter measures.....\n'); //for changing color and updates text in status td
        await page.waitFor(1000);
        await page.goto('https://www.supremenewyork.com/checkout')
    }
    
    //-------------------------------------------------------------------------------------------------------------------------
  







    //ENTERING SHIPPING INFORMATION
    //-------------------------------------------------------------------------------------------------------------------------
    //FILL IN SHIPPING DETAILS
    change_stat_Color_and_message(bot_row_number,'Entering Shipping Details....\n'); //for changing color and updates text in status td

    //waits for the page to atleast load then enters the detwils
    await page.waitForSelector('input[id="order_billing_name"]',{timeout:10000});

    await page.type('input[id="order_billing_name"]', full_name)

    await page.type('input[id="order_email"]', email)

    await page.type('input[id="order_tel"]', phoneNumber)

    await page.type('input[id="order_billing_address"]', address)

    await page.type('input[id="order_billing_zip"]', zipcode)

    await page.type('input[id="order_billing_city"]', city)

    change_stat_Color_and_message(bot_row_number,'Entering User Card Information...\n'); //for changing color and updates text in status td

    await page.type('input[id="credit_card_number"]', cardnumber)

    await page.select('select#credit_card_month', cardMonth)

    await page.select('select#credit_card_year', cardYear)

    await page.type('input[id="credit_card_verification_value"]', CVV)

    await page.click("#order_terms")
    //-------------------------------------------------------------------------------------------------------------------------
    
   






    //PLACING ORDER
    //-------------------------------------------------------------------------------------------------------------------------
    if(mode ==0){
        await page.click('input[name = "commit"]')
       
        //...CAPTCHA 
        change_stat_Color_and_message(bot_row_number,'Awaiting Captcha Solution...\n'); //for changing color and updates text in status td
        //change_stat_Color_and_message(bot_row_number,'ORDER PLACED✓\n'); //for changing color and updates text in status td

        var DiscPost = require('/Volumes/RAYDRIVE/electronProjects/sneekshotbotv2/src/cloudCom.js')
        DiscPost.communicate_With_Discord("SUPREME",Grabbed_Item_Name_For_Discord_Feedback,Grabbed_Price_For_Discord_Feedback,"Serpent",Grabbed_Image_URL_For_Dicord_Feedback);
       

    }else if(mode==1){
        change_stat_Color_and_message(bot_row_number,'Test Mode ORDER PLACED✓\n'); //for changing color and updates text in status td
        browser.close();
    }
    //-------------------------------------------------------------------------------------------------------------------------
}


runSupremePuppet(headMode,url,keywords,itemType,0,"jack daniel","jack@gmail.com","9734557728","149 hillbilly street","07111","irvington","nj","6580719130865256","03","2026","433","0","noproxy");





/*
async function selectItemType_DEPRECATED(page,type,keywords){

    //clicks the nav bar based on the item type
    if(itemType =="JACKET"){
        await page.evaluate(()=>{
            document.getElementById('nav-categories').getElementsByTagName('li')[x].click()
            //search for product on all pages
        })
        searchForProduct(page,keywords)

    }else if(itemType == "ACCESORIES"){
        await page.evaluate(()=>{
            document.getElementById('nav-categories').getElementsByTagName('li')[x].click()
            //search for product on all pages
        })
        searchForProduct(page,keywords)

    }else if(itemType == "TOP/SWEATERS"){
        await page.evaluate(()=>{
            document.getElementById('nav-categories').getElementsByTagName('li')[x].click()
            //search for product on all pages
        })
        searchForProduct(page,keywords)
    }else{
        for(var x = 0;x<12;x++){
            await page.evaluate(()=>{
                document.getElementById('nav-categories').getElementsByTagName('li')[x].click()
                //search for product on all pages
            })
            searchForProduct(page,keywords)
        }
    }

}
*/











/*

const query = "Supreme®/The North Face® Leather Shoulder Bag";

page.evaluate(query => {
  const elements = [...document.querySelectorAll('a.name-link')];

  // Either use .find or .filter, comment one of these
  // find element with find
  const targetElement = elements.find(e => e.innerText.includes(query));

  // OR, find element with filter
  // const targetElement = elements.filter(e => e.innerText.includes(query))[0];

  // make sure the element exists, and only then click it
  targetElement && targetElement.click();
}, query)
*/