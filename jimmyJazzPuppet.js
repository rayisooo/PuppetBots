
//GLOBAL VARIABLES......
var Grabbed_Price_For_Discord_Feedback;
var Grabbed_Image_URL_For_Dicord_Feedback;
var Grabbed_Item_Name_For_Discord_Feedback;
let processArray = [];



var DiscPost= require('/Volumes/RAYDRIVE/electronProjects/sneekshotbotv2/src/cloudCom.js')


//VARS....
const row_number = 1;
const url = process.argv[2] //the argument received is the url to the site we need to bot
const userEmail = "rexdre4y@gmail.com";
const user_Fname = "jack";
const user_Lname = "thomas";
const addy = "1304 hillbilly drive";
const city = "newark";
const zipcode = "07017";
const phoneNumber = "8622974444"
const card_number = "4012888888881881";
const fullname = "jack thomas";
const exp_date = "0329"
const cvv = "392";
const sizeList = ["8"];
const mode = 0;
const headMode = false
const _username  ="N/A"
const _password = ""
const chrome_doll_driver_path = ""
const bot_row_number = 1

//delay function
const delay = millis => new Promise((resolve, reject) => {
    setTimeout(_ => resolve(), millis)
});


function change_stat_Color_and_message(dick,dic){
    console.log(dic)
};


async function runJimmyJazzPuppet(bot_row_number,head,url,username,password,userEmail,user_Fname,user_Lname,addy,city,zipcode,phoneNumber,card_number,fullname,exp_date,cvv,mode,mySizeList){
  
    //const puppeteer = require('puppeteer');
    //stealth
    const puppeteer = require('puppeteer-extra')
    const pluginStealth = require("puppeteer-extra-plugin-stealth");
    puppeteer.use(pluginStealth());
  
    
  
    if(!url){
        throw console.log('Missing Url....'); 
        //launches the browser....
    }else{
      //search product coming soon
      change_stat_Color_and_message(bot_row_number,'Heading To Site\n'); //for changing color and updates text in status td
    }
  
  
  
    //Page Setup.........
    //----------------------------------------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------------------------------------
    //---------------------------------------------------------------------------------------------------------------
    //launches the browser....
    const browser = await puppeteer.launch({
      headless: head, //false or true
      executablePath:chrome_doll_driver_path,
      args: ['--window-size=600,600',
      '--disable-web-security',
      '--disable-features=IsolateOrigins,site-per-process',
      '--ignore-certifcate-errors',
      '--ignore-certifcate-errors-spki-list',
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-infobars'],
      ignoreHTTPSErrors: true
  });
  
    //quick fix...
    //was not able to obfuscate those functions with this file due to evaluate so we need to move it to a file where we wont obfuscate
    //we call any function using  page.evaluate in the from the file supportFuncs.js
    const supportFuncLib = require('../supportFuncs.js');
  
    // You can simply run this to get the browser's pid
    const browserPID = browser.process().pid    
    
    processArray.push(browserPID); //adds the individual process ID to process array incase we need to kill it
  
    //creates a page
    const page = await browser.newPage();
    
    //heads to the passed url.....
    await page.goto(url);
  
    change_stat_Color_and_message(bot_row_number,'Heading To Site\n'); //for changing color and updates text in status td
    
    try{
        Grabbed_Item_Name_For_Discord_Feedback =  await page.evaluate("document.getElementsByClassName('h2 product-single__title')[0].textContent");
        Grabbed_Price_For_Discord_Feedback =  await page.evaluate("document.getElementsByClassName('product__price')[0].textContent");
        Grabbed_Image_URL_For_Dicord_Feedback = await page.evaluate(`document.getElementsByClassName('photoswipe__image')[0].getAttribute('data-srcset')`);
    }catch(error){
        console.log(error)
    }
  
    console.log(Grabbed_Image_URL_For_Dicord_Feedback,Grabbed_Item_Name_For_Discord_Feedback,Grabbed_Price_For_Discord_Feedback)
      
    
    // need to get the id of the item so we can properly select the field set
    var item_id = await page.evaluate("document.getElementsByTagName('fieldset')[0].getAttribute('id')");
    console.log(item_id)
  
    //------------------------------------------------------------------------------------------------------------------------------
    //select size 
    //get amount of sizes still in stock length
    var amount_of_available_sizes = await page.evaluate("document.getElementsByClassName('variant-input').length");
    try{
        for(var position = 1; position<amount_of_available_sizes; position++){
          
            //var picked_size = await page.evaluate(`document.getElementsByClassName('variant-input')[${position}].getAttribute('data-value')`)
            var picked_size = await page.evaluate(`document.getElementsByTagName('label')[${position}].textContent`)
            console.log(picked_size +" "+ mySizeList[position]);
            
            if(sizeList.includes(picked_size)){
                //size matched so we select that one.....
                await page.evaluate(`document.getElementsByTagName('label')[${position}].click()`)
            }else{
                //size not matched so we move along on the size list
                change_stat_Color_and_message(bot_row_number,"Size Not Found")
                continue
            }
        }
    }catch (error){
        change_stat_Color_and_message(bot_row_number,`ERROR OCCURED IN SIZE SELECTION....  ${error})`)
    }
    //------------------------------------------------------------------------------------------------------------------------------
    
  
  
    //add to cart
    await page.waitForSelector("button[name='add'")
    await page.click("button[name='add']");
  
    try{
        //checkout
        await delay(1000)
        await page.evaluate("document.getElementsByClassName('btn btn--full cart__checkout')[0].click()")
    }catch{
        await delay(2000)
        change_stat_Color_and_message(bot_row_number,"Checkout Didnt POP!")
        await page.evaluate("document.getElementsByClassName('btn btn--full cart__checkout')[0].click()")
    }
  
  
    if(username == "N/A"){
        //ENTER SHIPPING INFO DUE TO NO USER LOGGED IN
        //ENTER SHIPPING PAGE
        //--------------------------------------------------------------------------------------------------------------
        change_stat_Color_and_message(bot_row_number,'Entering Shipping Details....\n'); //for changing color and updates text in status td
  
        await page.waitForSelector('#checkout_email',{timeout:120000});
        for(var x =0;x<userEmail.length; x++){
            await delay(20);
            await page.type('#checkout_email',userEmail[x]);
        } 
        await page.type('#checkout_shipping_address_first_name',user_Fname)
        await page.type('#checkout_shipping_address_last_name',user_Lname)
        for(var i = 0; i<addy.length;i++){
            await page.type('#checkout_shipping_address_address1',addy[i])
        }
        await page.type('#checkout_shipping_address_city',city)
        await page.type('#checkout_shipping_address_zip',zipcode)
        //loops through the phone number
        for(let x = 0; x<phoneNumber.length; x++){
            await page.type('#checkout_shipping_address_phone',phoneNumber[x]);
        }
        //confirm shipping details
        change_stat_Color_and_message(bot_row_number,'Proceeding...\n')
        await page.click("button[id='continue_button']")
        //--------------------------------------------------------------------------------------------------------------
  
  
  
  
  
  
  
        //CONFIRM SHIPPING SPEED
        //--------------------------------------------------------------------------------------------------------------
        //continue to shipping speed page 
        try{
            //clicks continue button before going to payment page
            await delay(1000);
            await page.evaluate('document.querySelector("#continue_button").click()');
        }catch(error){
            //clicks continue button before going to payment page
            await delay(3000);
            await page.waitForXPath('/html/body/div[2]/div/div[1]/div[2]/div[1]/form/div[2]/button');
            const continue_btn = await page.$x('/html/body/div[2]/div/div[1]/div[2]/div[1]/form/div[2]/button');
            continue_btn[0].click();
            console.log("ERROR CONTINUE : " + error)
        }
        //--------------------------------------------------------------------------------------------------------------
  
  
  
        //ENTER CARD NUMBER
        //--------------------------------------------------------------------------------------------------------------
        if(await supportFuncLib.JIMMY_Enter_Cardnumber(page,card_number,fullname,exp_date,cvv,mode,bot_row_number) == 1){
            console.log("Complete Card Entry...")
            JIMMY_complete_payment(page,bot_row_number,mode);
        }else{
          console.log("returned FALSE 0000-007")
        }
        //--------------------------------------------------------------------------------------------------------------
  
  
  
        
  
    }else{
        try{
            //ENTER LOGIN INFO 
            change_stat_Color_and_message(bot_row_number,'Logging In....\n'); //for changing color and updates text in status td
            //click log in button
            await page.evaluate(`document.querySelector('body > div.content > div > div.main > div.main__content > div.step > form > div.step__sections > div.section.section--contact-information > div.section__header > div > p > a').click()`);
  
            //enter email
            //wait for page to load then enter credential
            await page.waitForSelector('#CustomerEmail',{timeout:90000});
            await page.type("#CustomerEmail",username);
            await page.type("#CustomerPassword",password);
  
            await page.evaluate("document.querySelector('#customer_login > p:nth-child(7) > input').click()")
  
        }catch(error){
            //ENTER LOGIN INFO 
            change_stat_Color_and_message(bot_row_number,'Logging In....\n'); //for changing color and updates text in status td
    
            await page.waitForXPath('/html/body/div[2]/div/div[1]/div[2]/div[1]/form/div[1]/div[1]/div[1]/div/p/a')
            const have_account_btn = await page.$x('/html/body/div[2]/div/div[1]/div[2]/div[1]/form/div[1]/div[1]/div[1]/div/p/a')
            have_account_btn[0].click()
    
            
            //USERNAME
            await page.type('#CustomerEmail',username)
            //PASSWORD
            await page.type('#CustomerPassword',password)
            
            
            //CLICK LOGIN
            //possible captcha ahead of this login.....
            await page.waitForXPath('/html/body/div[2]/main/div/section[1]/form[1]/div/input');
            const login_btn = await page.$x('/html/body/div[2]/main/div/section[1]/form[1]/div/input');
            login_btn[0].click();
            change_stat_Color_and_message(bot_row_number,'Proceeding...\n'); //for changing color and updates text in status td
  
        }
  
  
        //ENTER CARD NUMBER
        //--------------------------------------------------------------------------------------------------------------
        if(await supportFuncLib.JIMMY_Enter_Cardnumber(page,card_number,fullname,exp_date,cvv,mode,bot_row_number) == 1){
            console.log("COMPLETE")
            JIMMY_complete_payment(page,bot_row_number,mode);
        }else{
          console.log("returned FALSE 0000-007")
        }
        //--------------------------------------------------------------------------------------------------------------
  
    }
}
  
  
async function JIMMY_complete_payment(page,bot_row_number,mode){
    if(mode == 1){
        console.log("Test Mode ORDER PLACED✓\n")
        change_stat_Color_and_message(bot_row_number,'Test Mode ORDER PLACED✓\n'); //for changing color and updates text in status td
  
    }else if(mode ==0){
        try{
            DiscPost.discord_POST("JIMMY JAZZ",Grabbed_Item_Name_For_Discord_Feedback,Grabbed_Price_For_Discord_Feedback,"DollHouse",Grabbed_Image_URL_For_Dicord_Feedback);
  
            await page.waitForXPath('/html/body/div[2]/div/div[1]/div[2]/div[1]/div/form/div[4]/div[1]/button')
            const purchaseBTN = await page.$x('/html/body/div[2]/div/div[1]/div[2]/div[1]/div/form/div[4]/div[1]/button')
            purchaseBTN[0].click();

            change_stat_Color_and_message(bot_row_number,'ORDER PLACED✓\n'); //for changing color and updates text in status td
  
        }catch(error){
            //await page.waitForSelector(".step__footer__continue-btn btn")
            //await page.click(".step__footer__continue-btn btn")
            console.log("Error finalizing Payment", error)
        } 
    }
}

runJimmyJazzPuppet(row_number,headMode,url,_username,_password,userEmail,user_Fname,user_Lname,addy,city,zipcode,phoneNumber,card_number,fullname,exp_date,cvv,mode,sizeList)