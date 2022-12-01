const { time } = require('console');

//GLOBAL VARIABLES......
var Grabbed_Price_For_Discord_Feedback;
var Grabbed_Image_URL_For_Dicord_Feedback;
var Grabbed_Item_Name_For_Discord_Feedback;
let processArray = [];
var draw = true

//STATE DICTIONARY
var UnitedStatesDict = {
    "AL": "Alabama",
    "AK": "Alaska",
    "AS": "American Samoa",
    "AZ": "Arizona",
    "AR": "Arkansas",
    "CA": "California",
    "CO": "Colorado",
    "CT": "Connecticut",
    "DE": "Delaware",
    "DC": "District Of Columbia",
    "FM": "Federated States Of Micronesia",
    "FL": "Florida",
    "GA": "Georgia",
    "GU": "Guam",
    "HI": "Hawaii",
    "ID": "Idaho",
    "IL": "Illinois",
    "IN": "Indiana",
    "IA": "Iowa",
    "KS": "Kansas",
    "KY": "Kentucky",
    "LA": "Louisiana",
    "ME": "Maine",
    "MH": "Marshall Islands",
    "MD": "Maryland",
    "MA": "Massachusetts",
    "MI": "Michigan",
    "MN": "Minnesota",
    "MS": "Mississippi",
    "MO": "Missouri",
    "MT": "Montana",
    "NE": "Nebraska",
    "NV": "Nevada",
    "NH": "New Hampshire",
    "NJ": "New Jersey",
    "NM": "New Mexico",
    "NY": "New York",
    "NC": "North Carolina",
    "ND": "North Dakota",
    "MP": "Northern Mariana Islands",
    "OH": "Ohio",
    "OK": "Oklahoma",
    "OR": "Oregon",
    "PW": "Palau",
    "PA": "Pennsylvania",
    "PR": "Puerto Rico",
    "RI": "Rhode Island",
    "SC": "South Carolina",
    "SD": "South Dakota",
    "TN": "Tennessee",
    "TX": "Texas",
    "UT": "Utah",
    "VT": "Vermont",
    "VI": "Virgin Islands",
    "VA": "Virginia",
    "WA": "Washington",
    "WV": "West Virginia",
    "WI": "Wisconsin",
    "WY": "Wyoming"
  }
  


//var DiscPost = require('/Volumes/RAYDRIVE/electronProjects/sneekshotbotv2/src/cloudCom.js')


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
const card_number = "4012 8888 8888 1881";
const fullname = "jack thomas";
const exp_date = "03/29"
const cvv = "986";
const sizeList = ["8.5"];
const mode = 3;
const headMode = false
const state = "NJ"
var bot_row_number = 1

var username = "rexdrey@gmail.com";
var password =  "sumsum123"




//delay function
const delay = millis => new Promise((resolve, reject) => {
    setTimeout(_ => resolve(), millis)
});




function change_stat_Color_and_message(dick,dic){
    console.log(dic)
};


async function runSocialStatusPuppet(bot_row_number,head,url,username,password,userEmail,user_Fname,user_Lname,addy,city,zipcode,phoneNumber,card_number,fullname,exp_date,cvv,mode,mySizeList,state){
    
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
      //executablePath:chrome_doll_driver_path,
      args: ['--window-size=620,800',
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
  
   
   
  
    //check if its a draw or a regular checkout
    //if mode  equals to 3 or 4 then its a draw
    
    //RAFFLE / DRAW MODE
    if(mode == 3|| mode ==4){
        await delay(2000);
        console.log("DrawMode")
        //upon going to URL we should immediatly be asked to log in.....
        await page.waitForSelector("#login_email");
        await page.evaluate(`document.querySelector("#login_email").value = "${username}"`);
        await delay(1000)
        await page.evaluate(`document.querySelector("#login_password").value = "${password}"`);
        await delay(250)
        await page.evaluate('document.querySelector("#customer_login > div.bottom_row > div:nth-child(2) > button").click()')
  
  
  
        //------------------------------------------------------------------------------------------------------------------------
        //POSSIBLY ENCOUNTER CAPTCHA & pop up
        //pop up close
        try{
            await delay(2000)
            await page.evaluate("document.getElementsByTagName('button')[18].click()") 
        }catch(error){
            change_stat_Color_and_message(bot_row_number,`Pop Up Might not have appeared --> ${error}`);
            await delay(2000)
            await page.evaluate("document.getElementsByClassName('needsclick klaviyo-close-form kl-private-reset-css-Xuajs1')[0].click()") 
        }
        //------------------------------------------------------------------------------------------------------------------------
  
  
  
  
        //------------------------------------------------------------------------------------------------------------------------
        //CAPTCHA POPUP
  
        //click captcha checkbox 
        //await page.waitForSelector('#recaptcha-anchor');
        //await page.evaluate('document.querySelector("#recaptcha-anchor").click()');
  
        //get captcha response element
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
            await delay(500)
            //Click submit  Captcha Button because captcah shouldve been solved....
            await page.evaluate('document.querySelector("#main > div > form > input.shopify-challenge__button.btn").click()')
        }catch(error){
            console.log(error)
        }
  
        
        //------------------------------------------------------------------------------------------------------------------------
  
  
  
  
        //------------------------------------------------------------------------------------------------------------------------
        //ENTER DRAW BUTTON
        
        await page.waitForSelector('.default_btn',{timeout:120000});
        await delay(1500)
        await page.evaluate('document.querySelector("#shopify-section-product-release-template > div > article > div.container > div > div.relProd_user_details > div > button").click()')
        change_stat_Color_and_message(bot_row_number,"Entering Draw...");
        //------------------------------------------------------------------------------------------------------------------------
  
  
  
  
  
  
        //------------------------------------------------------------------------------------------------------------------------
        //SELECT SIZE
        var sizeAmount = await page.evaluate(`document.getElementsByName('size_name').length`)
        for(var position = 1; position<=sizeAmount; position++){
            
            var current_size = await page.evaluate(`document.querySelector('#size_options > div:nth-child(${position})').getElementsByTagName("input")[0].getAttribute('data-variant-name')`)
            //check if size matches
            if(mySizeList.includes(current_size)){
                //if size mathced then we select current position
                await page.evaluate(`document.querySelector('#size_options > div:nth-child(${position})').getElementsByTagName("input")[0].click()`)
            }
        }
        //------------------------------------------------------------------------------------------------------------------------
  
  
        //CONTINUE BUTTON AFTER SELECTING SIZE
        try{
            //select continue button
            await page.waitForSelector('.btn');
            await delay(1000);
            await page.click('button[class="btn"]');
        }catch(error){
            //select continue button
            await delay(1000);
            await page.evaluate('document.querySelector("#sectionSize > div > div > div:nth-child(2) > button").click()')
        }
  
  
  
        //------------------------------------------------------------------------------------------------------------------------
        //ENTER SHIPPING DATA
        await page.type("input[name='shipping_phone']",phoneNumber);
        await page.type("input[name='shipping_address']",addy);
        await page.type("input[name='shipping_city']",city);
        await page.select("#shipping-state",UnitedStatesDict[state]);
        await page.type("input[name='shipping_postcode']",zipcode);
        //------------------------------------------------------------------------------------------------------------------------
        
  
  
        //SELECT CONTINUE TO PAYMENT BUTTON
        await page.click("button[id='fetchStripe']");
  
  
        //------------------------------------------------------------------------------------------------------------------------
        //ENTER CREDIT CARD INFORMATION
        //CARD NUMBER
        change_stat_Color_and_message(bot_row_number,"Entering Card Information....")
        
        //-----------------------------------------------------------------------------------------------------------
        //this gets the value of the name of the iframe not currently used but very valuable                        //|    
        //returns the name for the credit card iframe                                                               //|
        await delay(3500)                                                                                           //|
        const returnCardIframeName = await page.evaluate(`document.getElementsByTagName('iframe')[0].name`)         //|      
        console.log(returnCardIframeName)                                                                                       //|
        //GET CARD IFRAME                                                                                           //|
        const cardframeHandle = await page.$("iframe[name='" +returnCardIframeName +"']");                          //|
        const cardframe = await cardframeHandle.contentFrame();                                                     //|
        //WHEN WE HAVE THE IFRAME WE TYPE INTO IT                                                                   //|
        await cardframe.type('input[name="cardnumber"]', String(card_number), { delay: 100 });   
        //await cardframe.evaluate(`document.querySelector("#root > form > span:nth-child(4) > div > div.CardNumberField-input-wrapper > span > input").value = "${card_number}"`)                                            //|
        //------------------------------------------------------------------------------------------------------------
  
  
  
        //-----------------------------------------------------------------------------------------------------------
        //this gets the value of the name of the iframe not currently used but very valuable                        //|    
        //returns the name for the credit card iframe                                                               //|
        await delay(100)                                                                                           //|
        const returnExpIframeName = await page.evaluate(`document.querySelector("#sectionPayment_form > div.cols > div:nth-child(1) > div > div > div > iframe").name`)
        console.log(returnExpIframeName)                                                                            //|
        //GET CARD IFRAME                                                                                           //|
        const ExpFrameHandle = await page.$("iframe[name='" +returnExpIframeName +"']");                            //|
        const Expframe = await ExpFrameHandle.contentFrame();                                                       //|
        //WHEN WE HAVE THE IFRAME WE TYPE INTO IT                                                                   //|
        await Expframe.type('input[name="exp-date"]', String(exp_date), { delay: 100 });   
       // await Expframe.evaluate(`document.querySelector("#root > form > span:nth-child(4) > span > input").value = "${exp_date}"`);                                      //|
        //------------------------------------------------------------------------------------------------------------
      
        
    
  
        //-----------------------------------------------------------------------------------------------------------
        //this gets the value of the name of the iframe not currently used but very valuable                        //|    
        //returns the name for the credit card iframe   
        await delay(100)                                                            //|                                                                                          //|
        const returnCVVIframeName = await page.evaluate(`document.getElementsByTagName('iframe')[2].name`)          //|                                                                                             //|
        //GET CARD IFRAME                                                                                           //|
        const CVVFrameHandle = await page.$("iframe[name='" +returnCVVIframeName +"']");                            //|
        const CVVframe = await CVVFrameHandle.contentFrame();                                                       //|
        //WHEN WE HAVE THE IFRAME WE TYPE INTO IT                                                                   //|
        await CVVframe.type('input[name="cvc"]', String(cvv), { delay: 100 });   
        //await CVVframe.evaluate(`document.querySelector("#root > form > span:nth-child(4) > span > input").value = ${cvv}`);                                            //|
        //------------------------------------------------------------------------------------------------------------
      
        //RAFFLE finish CLICK BUTTON
        if(mode == 3){
          //FINISH BUTTON....
          try{
              //click Finish Enter Raffle
              change_stat_Color_and_message(bot_row_number,"Raffle Entered !\n")
              await page.evaluate(`document.querySelector("#btn-finish").click()`)
          }catch(error){
              await delay(1000)
              await page.click('#btn-finish')
          }
        }else{
          //click Finish Enter Raffle
          change_stat_Color_and_message(bot_row_number,"Raffle Entered !\n")
        }
        
        
    }else{
        console.log("QuickMode")
  
        //regular checkout
        //------------------------------------------------------------------------------------------------------------------------
        //SELECT SIZE
        var sizeAmount = await page.evaluate(`document.querySelectorAll('[data-variant]').length`)
        var productId  = await page.evaluate("document.getElementsByTagName('form').item(1).getAttribute('id')")
        for(var position = 1; position<=sizeAmount; position++){
  
            //get individal size 
            var current_size = await page.evaluate(`document.querySelector("#${productId} > div > div.options > span:nth-child(${position})").textContent`);
            //check if size matches
            if(mySizeList.includes(current_size)){
                //if size mathced then we select current position
                await page.evaluate(`document.querySelector("#${productId}> div > div.options > span:nth-child(${position})").click()`)
            }
        }
        //------------------------------------------------------------------------------------------------------------------------
  
  
  
        //GRAB DATA FOR DISCORD FEEDBACK
        Grabbed_Image_URL_For_Dicord_Feedback = await page.evaluate(`document.querySelector('#product > div > figure > div.main.slider.slick-initialized.slick-slider > div > div > div.slick-slide.slick-current.slick-active > div > div > a > img').src`)
        Grabbed_Item_Name_For_Discord_Feedback =  await page.evaluate("document.querySelector('#product > div > div > div > div.header > h1').textContent");
        Grabbed_Price_For_Discord_Feedback = await page.evaluate("document.querySelector('#product > div > div > div > div.header > p').textContent");
  
        
  
  
  
  
        //close popup if its there 
        //------------------------------------------------------------------------------------------------------------------------
        //POSSIBLY ENCOUNTER CAPTCHA & pop up
        //pop up close
        try{
            await delay(1000)
            await page.evaluate("document.getElementsByClassName('needsclick klaviyo-close-form kl-private-reset-css-Xuajs1')[0].click()") 
        }catch(error){
            await delay(500)
            change_stat_Color_and_message(bot_row_number,`Pop Up Might not have appeared --> ${error}`);
            await page.evaluate('document.querySelector("body > div:nth-child(28) > div > div > div > div > div > div > button").click()')
        }
        //------------------------------------------------------------------------------------------------------------------------
  
  
  
  
  
  
  
  
  
  
        //------------------------------------------------------------------------------------------------------------------------
        //ADD to cart
        try{
            await delay(500)
            await page.waitForSelector(".add_to_bag");
            await  page.evaluate(`document.querySelector("#${productId} > button").click()`)
        }catch{
            await delay(1000)
            change_stat_Color_and_message(bot_row_number,"Failed Add to cart click retrying NOW!!!!")
            await  page.click('.add_to_bag')
        }
        //------------------------------------------------------------------------------------------------------------------------
    
  
  
  
  
        //------------------------------------------------------------------------------------------------------------------------
        //click checkout 
        try{
            await delay(500)
            await page.waitForSelector(".default_btn");
            await page.click("document.getElementsByTagName('a')[3].click()");
        }catch(error){
            await delay(1500);
            change_stat_Color_and_message(bot_row_number,`Error Selecting Checkout after add to cart ${error}`)
            await page.evaluate(`document.querySelector("#shopify-section-header > div > div.col > section > div > div.content-loader > div > div > div.grid-x.align-middle.align-center > div > a").click()`)
        }
        //------------------------------------------------------------------------------------------------------------------------
  
        
  
  
        if(username == "N/A"){
            //ENTER SHIPPING INFO DUE TO NO USER LOGGED IN
            //ENTER SHIPPING PAGE
            //--------------------------------------------------------------------------------------------------------------
            change_stat_Color_and_message(bot_row_number,'Entering Shipping Details....\n'); //for changing color and updates text in status td
      
            await page.waitForSelector('#checkout_email',{timeout:420000});
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
            var ship_detail_url = await page.url();
            //confirm shipping details
            change_stat_Color_and_message(bot_row_number,'Proceeding...\n')
            await page.click("button[id='continue_button']")
            //--------------------------------------------------------------------------------------------------------------
    
    
    
    
    
    
    
            //CONFIRM SHIPPING SPEED
            //--------------------------------------------------------------------------------------------------------------
            //continue to shipping speed page 
            try{
                //clicks continue button before going to payment page
                if(ship_detail_url != await page.url()){
                    await console.log("Page Switched....")
                    //clicks continue button before going to payment page
                    await delay(1000);
                    await page.waitForXPath('/html/body/div/div/div/main/div[1]/form/div[2]/button');
                    const continue_btn = await page.$x('/html/body/div/div/div/main/div[1]/form/div[2]/button');
                    continue_btn[0].click();
                    console.log("ERROR CONTINUE : " + error)
                }else{
                    //clicks continue button before going to payment page
                    await delay(1000);
                    await page.waitForXPath('/html/body/div/div/div/main/div[1]/form/div[2]/button');
                    const continue_btn = await page.$x('/html/body/div/div/div/main/div[1]/form/div[2]/button');
                    continue_btn[0].click();
                    console.log("ERROR CONTINUE : " + error)
                }
                
                
            }catch(error){
                //clicks continue button before going to payment page
                await delay(3000);
                await page.waitForXPath('/html/body/div/div/div/main/div[1]/form/div[2]/button');
                const continue_btn = await page.$x('/html/body/div/div/div/main/div[1]/form/div[2]/button');
                continue_btn[0].click();
                console.log("ERROR CONTINUE : " + error)
            }
            //--------------------------------------------------------------------------------------------------------------
    
    
    
            //ENTER CARD NUMBER
            //--------------------------------------------------------------------------------------------------------------
            if(await supportFuncLib.SOCIAL_STATUS_Enter_Cardnumber(page,card_number,fullname,exp_date,cvv,mode,bot_row_number) == 1){
                console.log("COMPLETE")
                SOCIAL_STATUS_complete_payment(page,bot_row_number,mode);
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
        
                await page.waitForXPath('/html/body/div[1]/div/div/main/div[1]/form/div[1]/div[1]/div[1]/div/p/a')
                const have_account_btn = await page.$x('/html/body/div[1]/div/div/main/div[1]/form/div[1]/div[1]/div[1]/div/p/a')
                have_account_btn[0].click()
        
                
                //USERNAME
                await page.type('#CustomerEmail',username)
                //PASSWORD
                await page.type('#CustomerPassword',password)
                
                
                //CLICK LOGIN
                //possible captcha ahead of this login.....
                await page.waitForXPath('/html/body/div[2]/main/div/section[1]/form[1]/div/input',{timeout:120000});
                const login_btn = await page.$x('/html/body/div[2]/main/div/section[1]/form[1]/div/input');
                login_btn[0].click();
                change_stat_Color_and_message(bot_row_number,'Proceeding...\n'); //for changing color and updates text in status td
    
            }
    
    
            //ENTER CARD NUMBER
            //--------------------------------------------------------------------------------------------------------------
            if(await supportFuncLib.SOCIAL_STATUS_Enter_Cardnumber(page,card_number,fullname,exp_date,cvv,mode,bot_row_number) == 1){
                console.log("COMPLETE")
                SOCIAL_STATUS_complete_payment(page,bot_row_number,mode);
            }else{
              console.log("returned FALSE 0000-007")
            }
            //--------------------------------------------------------------------------------------------------------------
    
        }
  
  
       
    }
}


async function SOCIAL_STATUS_complete_payment(page,bot_row_number,mode){

    if(mode == 1 || mode == 4){
        console.log("Test Mode ORDER PLACED✓\n")
        change_stat_Color_and_message(bot_row_number,'Test Mode ORDER PLACED✓\n'); //for changing color and updates text in status td
  
    }else if(mode ==0 || mode == 3) {
        try{
            //await page.waitForXPath('/html/body/div/div/div/main/div[1]/div/form/div[4]/div[1]/button')
            const purchaseBTN = await page.$x('/html/body/div/div/div/main/div[1]/div/form/div[3]/div[1]/button')
            purchaseBTN[0].click();
            change_stat_Color_and_message(bot_row_number,'ORDER PLACED✓\n'); //for changing color and updates text in status td
  
            //DiscPost.discord_POST("SOCIAL STATUS (www.socialstatuspgh.com)",Grabbed_Item_Name_For_Discord_Feedback,Grabbed_Price_For_Discord_Feedback,"DollHouse",Grabbed_Image_URL_For_Dicord_Feedback);
  
  
            console.log("ORDER PLACED✓\n")
        }catch(error){
            console.log("Error finalizing Payment",error)
        } 
    }
}

runSocialStatusPuppet(row_number,headMode,url,username,password,userEmail,user_Fname,user_Lname,addy,city,zipcode,phoneNumber,card_number,fullname,exp_date,cvv,mode,sizeList,state)