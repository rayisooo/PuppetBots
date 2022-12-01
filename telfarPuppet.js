
const { time } = require('console');
const puppeteer = require('puppeteer');


//node telfarpuppet.js https://shop.telfar.net/collections/upcoming-drop/products/logo-belt-silver-corned-beef


//VARS....

const url = process.argv[2] //the argument received is the url to the site we need to bot
const row_number  = 0;
const userAccount = "N/A";// FOR TESTING PURPOSES
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
const size = "M";
const mode = 0;
const headMode = false
const sizeList = [];
let processArray = [];
const billing_Fname = "jack";
const billing_Lname = "thomas";
const billing_addy = "1304 hillbilly drive";
const billing_city = "newark";
const billing_zipcode = "07017";
var _username = "N/A"
var _password = ""


const myproxy_ = "209.127.191.180:9279-|-yopmglat-dest-|-5zbn04gly28y";
var DiscPost = require('/Volumes/RAYDRIVE/electronProjects/sneekshotbotv2/src/cloudCom.js')

//GLOBAL VARIABLES......
var Grabbed_Price_For_Discord_Feedback;
var Grabbed_Image_URL_For_Dicord_Feedback;
var Grabbed_Item_Name_For_Discord_Feedback;
const chrome_doll_driver_path = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

async function searching_For_Captcha(page,bot_row_number){
    //a function to see if i encounter captcha!
    //check if we have a CAPTCHA BUTTON
    let captchaID = (await page.$('#g-recaptcha')) || "";
    if(captchaID == ""){
      change_stat_Color_and_message(bot_row_number,`NO CAPATCHA....`)  
    }else{
  
      var captchaResponse = await page.evaluate('document.querySelector("#g-recaptcha-response").value');
      try{
        var count = 0;
        while(captchaResponse == ''){
            captchaResponse = await page.evaluate('document.querySelector("#g-recaptcha-response").value');
            count +=1
            await delay(1000); //wait for .7 seconds
            change_stat_Color_and_message(bot_row_number,`Awaiting Captcha : (${count})` )
        }
        change_stat_Color_and_message(bot_row_number,`Captcha Solved`) 
   
      }catch(error){
          console.log(error)
      }
    }
  }
  
function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}





async function runTelfarPuppet(bot_row_number,head,url,username,password,userEmail,user_Fname,user_Lname,addy,city,zipcode,phoneNumber,card_number,fullname,exp_date,cvv,mode,mySizeList){

    //const puppeteer = require('puppeteer-extra')
    //stealth
    //const pluginStealth = require("puppeteer-extra-plugin-stealth");
    //puppeteer.use(pluginStealth());
  
    if(!url){
        alert("User didnt pass URL !");
    }
  
    //Page Setup.........
    //----------------------------------------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------------------------------------
    //---------------------------------------------------------------------------------------------------------------
    //launches the browser....
    const browser = await puppeteer.launch({
        headless: false,
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
  
    // You can simply run this to get the browser's pid
    const browserPID = browser.process().pid    
    processArray.push(browserPID); //adds the individual process ID to process array incase we need to kill it
  
  
    //creates a page
    const page = await browser.newPage();
  
    //heads to the passed url.....
    await page.goto(url);
    //---------------------------------------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------------------------------------
  
    
  
  
  
  
  
    //FIRST PAGE
    //----------------------------------------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------------------------------------
    //SELECT SIZE
    /*
    if(size == 'XS'){
        await page.select('.single-option-selector','XS');
    }else if(size =="S"){
        await page.select('.single-option-selector','S');
    }else if(size =="M"){
        await page.select('.single-option-selector',"M");
    }else if(size =="L"){
        await page.select('.single-option-selector',"L");
    }else if(size =="XL"){
        await page.select('.single-option-selector',"XL");
    }else{
        console.log("Random....")
    }*/
    

    try{
      //popup migh slide and animate on screen we need to kill it
      //waits 3 seconds then kills it.....
      await page.waitForXPath('/html/body',{timeout:3000})
      var item_name_id = await page.evaluate(`document.getElementsByTagName('body')[0].getAttribute("id")`)
      console.log(item_name_id)
      await page.evaluate(`document.querySelector("#${item_name_id} > div:nth-child(23) > div > div > div > div > div > div > button").click()`)
    }catch{
      console.log("Pop up never showed up!")
    }
    
    //waits for the element to load
    await page.waitForXPath('//*[@id="AddToCart"]');
    //selects the add to cart btn
    const addToCartBtn = await page.$x('//*[@id="AddToCart"]');
    await addToCartBtn[0].click();
  
  
    //clicks the add to cart btn
    await page.waitForXPath("/html/body/div[5]/main/div[1]/div/div/div[2]/div/div[1]/form/div[3]/button[2]");
    const viewCartBtn = await page.$x("/html/body/div[5]/main/div[1]/div/div/div[2]/div/div[1]/form/div[3]/button[2]");
    await viewCartBtn[0].click();
    console.log('Carting....\n');
    change_stat_Color_and_message(bot_row_number,'Carting....\n'); //for changing color and updates text in status td
  
    //----------------------------------------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------------------------------------
  
  
  
  
  
  
  
    //CART PAGE -- SECOND PAGE
    //---------------------------------------------------------------------------------------------------------------- 
    //----------------------------------------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------------------------------------
    try{
        await page.waitForXPath('/html/body/div[4]/main/div[6]/div/form/footer/div/div[2]/p[4]/button');
        const checkoutBtn = await page.$x('/html/body/div[4]/main/div[6]/div/form/footer/div/div[2]/p[4]/button');
        await checkoutBtn[0].click();
    }catch{
        change_stat_Color_and_message(bot_row_number,'Error In Checkout Click....\n'); //for changing color and updates text in status td
        console.log("Error In Checkout Click....")
  
        //tries again....
        await page.waitForSelector(".btn cart-checkout-btn");
        await page.click('[name="checkout"]')
    }
    //----------------------------------------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------------------------------------
  
    
    
  
    //----------------------------------------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------------------------------------
    if(username == "N/A"){
        //ENTER SHIPPING INFO DUE TO NO USER LOGGED IN
        change_stat_Color_and_message(bot_row_number,'Entering Shipping Details....\n'); //for changing color and updates text in status td
  
        await page.waitForSelector('#checkout_email',{timeout:200000});
        await page.type('#checkout_email',userEmail)
  
        await page.type('#checkout_shipping_address_first_name',user_Fname)
  
        await page.type('#checkout_shipping_address_last_name',user_Lname)
  
        await page.type('#checkout_shipping_address_address1',addy)
  
        await page.type('#checkout_shipping_address_city',city)
  
        await page.type('#checkout_shipping_address_zip',zipcode)
  
        //loops through the phone number
        for(let x = 0; x<phoneNumber.length; x++){
            await delay(10)
            await page.type('#checkout_shipping_address_phone',phoneNumber[x]);
        }

        searching_For_Captcha(page,bot_row_number)

        
        
  
        //await page.type('#checkout_shipping_address_city',city)
  
  
        //click BTN CONTINUE TO SHIPPING 
        await page.waitForXPath('/html/body/div/div/div/main/div[1]/form/div[2]/button')
        const continue_to_shipping = await page.$x('/html/body/div/div/div/main/div[1]/form/div[2]/button')
        continue_to_shipping[0].click()
  
        //pop up will come asking you to confirm shipping address
        await page.waitForXPath('/html/body/div/div/div/div/div/div[2]/button[2]');
        const proceed_btn = await page.$x('/html/body/div/div/div/div/div/div[2]/button[2]');
        proceed_btn[0].click();
        
        change_stat_Color_and_message(bot_row_number,'Proceeding...\n'); //for changing color and updates text in status td
  
  
        const supportFuncLib = require('../supportFuncs.js');
        //passes the page driver or instance whatever you call it into the function
        //ENTERS CREDIT CARD NUMBER
        if(await supportFuncLib.telfar_Enter_Card_Number(page,card_number,fullname,exp_date,cvv,mode,bot_row_number) == 1){
          try{
              //waits till credit card number has succefully been entered then runs 
              telfar_Complete_Payment(page,userEmail,billing_Fname,billing_Lname,billing_addy,billing_city,billing_zipcode,mode,bot_row_number)
            }catch{
              change_stat_Color_and_message(bot_row_number,"Finish Manually !");
              await delay(50000)
            }
        }
    }else{
       
      //ENTER LOGIN INFO 
      change_stat_Color_and_message(bot_row_number,'Logging In....\n'); //for changing color and updates text in status td
    
      await page.waitForSelector('.order-summary-toggle__inner');
      await page.evaluate(`document.querySelector("body > div > div > div > main > div.step > form > div.step__sections > div.section.section--contact-information > div.section__header > div > p > a").click()`)
      
      
      try{
        //USERNAME
        await page.waitForSelector('#CustomerEmail',{timeout:200000});
        await page.evaluate(`document.querySelector("#CustomerEmail").value = "${username}"`);
        await page.evaluate(`document.querySelector("#CustomerPassword").value = "${password}"`);
        //CLICK LOGIN
        await page.evaluate('document.querySelector("#customer_login > p:nth-child(8) > input").click()');
  
      }catch(error){
        await page.reload();
        console.log(error)
        //USERNAME
        await page.waitForSelector('#CustomerEmail',{timeout:200000})
        await page.type('#CustomerEmail',username)
        //PASSWORD
        await page.type('#CustomerPassword',password)
    
        //CLICK LOGIN
        //possible captcha ahead of this login.....
        await page.waitForXPath('/html/body/div[4]/main/div/div/div[2]/form/p[1]/input');
        const login_btn = await page.$x('/html/body/div[4]/main/div/div/div[2]/form/p[1]/input');
        login_btn[0].click();
      }
  
  
  
        //contnue payment runs after it completes it returns and we can continue to complete payment 
        const supportFuncLib = require('../supportFuncs.js');
        //ENTERS CREDIT CARD NUMBER
        if(await supportFuncLib.telfar_Enter_Card_Number(page,card_number,fullname,exp_date,cvv,mode,bot_row_number) == 1){
          try{
                //waits till credit card number has succefully been entered then runs 
                telfar_Complete_Payment(page,userEmail,billing_Fname,billing_Lname,billing_addy,billing_city,billing_zipcode,mode,bot_row_number)
              }catch{
                change_stat_Color_and_message("Finish Manually !",bot_row_number);
                await delay(50000)
          }
        }
  
    }
    //----------------------------------------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------------------------------------
  
    
}



async function telfar_Complete_Payment(page,userEmail,billing_f_name,billing_l_name,billing_addy,billing_city,billing_zipcode,mode,bot_row_number){

    
    await page.waitForSelector('#checkout_billing_address_first_name')
    //await page.type('#checkout_email',userEmail)
    await page.type('#checkout_billing_address_first_name',billing_f_name)
    await page.type('#checkout_billing_address_last_name',billing_l_name)
    await page.type('#checkout_billing_address_address1',billing_addy)
    await page.type('#checkout_billing_address_city',billing_city)
    await page.type('#checkout_billing_address_zip',billing_zipcode)
  
    //loops through the phone number
    for(let x = 0; x<phoneNumber.length; x++){
        await page.type('#checkout_billing_address_phone',phoneNumber[x])
    }
  
    if(mode == 1){
        console.log("Test Mode ORDER PLACED✓\n")
        change_stat_Color_and_message(bot_row_number,'Test Mode ORDER PLACED✓\n'); //for changing color and updates text in status td
        page.close();
  
    }else if(mode ==0){
  
        await page.waitForXPath('/html/body/div/div/div/main/div[1]/div/form/div[3]/div[1]/button')
        const purchaseBTN = await page.$x('/html/body/div/div/div/main/div[1]/div/form/div[3]/div[1]/button')
        purchaseBTN[0].click()
  
        //Posting to discord webhook throguh communication with cloud functions
        DiscPost.discord_POST("TELFAR",Grabbed_Item_Name_For_Discord_Feedback,Grabbed_Price_For_Discord_Feedback,"DollHouse",Grabbed_Image_URL_For_Dicord_Feedback);
        console.log("ORDER PLACED✓\n")
        change_stat_Color_and_message(bot_row_number,'ORDER PLACED✓\n'); //for changing color and updates text in status td
    }else{
        console.log("Test Mode ORDER PLACED✓\n")
        change_stat_Color_and_message(bot_row_number,'Test Mode ORDER PLACED✓\n'); //for changing color and updates text in status td
    }
    
  
  }  


runTelfarPuppet(row_number,headMode,url,_username,_password,userEmail,user_Fname,user_Lname,addy,city,zipcode,phoneNumber,card_number,fullname,exp_date,cvv,mode,sizeList,myproxy_)




function change_stat_Color_and_message(dick,dic){
    console.log(" ")
}

//https://shop.telfar.net/collections/upcoming-drop/products/logo-embossed-hat-red