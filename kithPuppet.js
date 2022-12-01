

let processArray = [];


//GLOBAL VARIABLES......
var Grabbed_Price_For_Discord_Feedback;
var Grabbed_Image_URL_For_Dicord_Feedback;
var Grabbed_Item_Name_For_Discord_Feedback;

const { discord_POST } = require('/Volumes/RAYDRIVE/electronProjects/sneekshotbotv2/src/cloudCom.js');
var DiscHook = require('/Volumes/RAYDRIVE/electronProjects/sneekshotbotv2/src/cloudCom.js')


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
const sizeList = ["7.5"];
const mode = 0;
const headMode = false
const chrome_doll_driver_path = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
const username = "N/A"
const password = "N/A"



const delay = millis => new Promise((resolve, reject) => {
    setTimeout(_ => resolve(), millis)
});


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

//RUN KITH
async function runKithPuppet(bot_row_number,head,url,username,password,userEmail,user_Fname,user_Lname,addy,city,zipcode,phoneNumber,card_number,fullname,exp_date,cvv,mode,mySizeList){
  
  const puppeteer = require('puppeteer-extra')
  //stealth
  const pluginStealth = require("puppeteer-extra-plugin-stealth");
  puppeteer.use(pluginStealth());

  //const puppeteer = require('puppeteer');

  if(!url){
      throw console.log('Missing Url....'); 
      //launches the browser....
  }else{
    //search product coming soon
    console.log("search product")
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
  //console.log('Heading To Site\n');
  //---------------------------------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------------------------------






  
  //FIRST PAGE
  //----------------------------------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------------------------------

  //node kithpuppet.js https://kith.com/collections/mens-footwear/products/cn172936c


   //CLOSE POPUPS....
  try{
    change_stat_Color_and_message(bot_row_number,'Closing Popup\n'); //for changing color and updates text in status td
    supportFuncLib.kithClosePopup(page);
  }catch{
      console.log("error closing pop up")
      await delay(300);
      supportFuncLib.kithClosePopup(page);
  }finally{
    change_stat_Color_and_message(bot_row_number,'Continue...\n'); //for changing color and updates text in status td
  }
  
  
  //SELECT SIZE CALL
  supportFuncLib.kithSelectSize(bot_row_number,page,mySizeList);
 

  
  Grabbed_Image_URL_For_Dicord_Feedback = await page.evaluate("document.querySelector('#shopify-section-product > section > div.product-images__wrapper > div.product__images > div > div > div > div.product-image-carousel__slide.is-selected > div > img').src")
  Grabbed_Item_Name_For_Discord_Feedback =  await page.evaluate('document.querySelector("#shopify-section-product > section > div.product__shop > h1").textContent');
  Grabbed_Price_For_Discord_Feedback = await page.evaluate("document.querySelector('#shopify-section-product > section > div.product__shop > div.product__price > span').textContent");


  //waits for the element to load
  //await page.waitForXPath('/html/body/div[2]/main/div[2]/section/div[2]/form/button');
  //selects the add to cart btn
  await delay(300);
  const addToCartBtn = await page.$x('/html/body/div[2]/main/div[2]/section/div[2]/form/button');
  await addToCartBtn[0].click();
  console.log('Carting....\n');
  change_stat_Color_and_message(bot_row_number,'Carting....\n'); //for changing color and updates text in status td



  //selects checkout button that pops up
  await delay(500);
  await page.waitForXPath('/html/body/section[1]/div/form/div[2]/button');
  const checkoutBtn = await page.$x('/html/body/section[1]/div/form/div[2]/button');
  await checkoutBtn[0].click()
  //----------------------------------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------------------------------
  





  //----------------------------------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------------------------------

  console.log(username)

  if(username == "N/A"){
      //ENTER SHIPPING INFO DUE TO NO USER LOGGED IN
      change_stat_Color_and_message(bot_row_number,'Entering Shipping Details....\n'); //for changing color and updates text in status td

      await page.waitForSelector('#checkout_email',{timeout:200000});

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
          await delay(10)
          await page.type('#checkout_shipping_address_phone',phoneNumber[x]);
      }


      /*
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
      }*/

      //a function to see if a captcha exists on a page.....
      await searching_For_Captcha(page,bot_row_number)
      

      //await page.type('#checkout_shipping_address_city',city)


      //click BTN CONTINUE TO SHIPPING 
      await page.waitForXPath('/html/body/div[2]/div/div[1]/div[2]/div[1]/form/div[2]/button')
      const continue_to_shipping = await page.$x('/html/body/div[2]/div/div[1]/div[2]/div[1]/form/div[2]/button')
      continue_to_shipping[0].click()
      


      change_stat_Color_and_message(bot_row_number,'Proceeding...\n')
      //passes the page driver or instance whatever you call it into the function

  
      if(await supportFuncLib.kith_Enter_Cardnumber(page,card_number,fullname,exp_date,cvv,mode,bot_row_number) == 1){
          kith_complete_payment(page,bot_row_number,mode);
      }else{
        console.log("returned FALSE 0000-007")
      }
      

  }else{
    //ENTER LOGIN INFO 
    change_stat_Color_and_message(bot_row_number,'Logging In....\n'); //for changing color and updates text in status td
  
    await page.waitForSelector('.order-summary-toggle__inner');
    await page.evaluate(`document.querySelector("body > div.content > div > div.main > div.main__content > div.step > form > div.step__sections > div.section.section--contact-information > div.section__header > div > p > a").click()`)
    
    
    try{
      //USERNAME
      await page.waitForSelector('#CustomerEmail',{timeout:200000});
      await page.evaluate(`document.querySelector("#CustomerEmail").value = "${username}"`);
      await page.evaluate(`document.querySelector("#CustomerPassword").value = "${password}"`);
      //CLICK LOGIN
      await page.evaluate('document.querySelector("#customer_login > div > input").click()');

    }catch(error){
      //USERNAME
      await page.waitForSelector('#CustomerEmail',{timeout:200000})
      await page.type('#CustomerEmail',username)
      //PASSWORD
      await page.type('#CustomerPassword',password)
  
      //CLICK LOGIN
      //possible captcha ahead of this login.....
      await page.waitForXPath('/html/body/div[2]/main/div/section[1]/form[1]/div/input');
      const login_btn = await page.$x('/html/body/div[2]/main/div/section[1]/form[1]/div/input');
      login_btn[0].click();
    }
    

    //clicks continue button before going shipping confirmation page
    await delay(1000);
    await page.waitForXPath('/html/body/div[2]/div/div[1]/div[2]/div[1]/form/div[2]/button');
    const continue_btn = await page.$x('/html/body/div[2]/div/div[1]/div[2]/div[1]/form/div[2]/button');
    continue_btn[0].click();
   

    change_stat_Color_and_message(bot_row_number,'Proceeding...\n'); //for changing color and updates text in status td



    if(await supportFuncLib.kith_Enter_Cardnumber(page,card_number,fullname,exp_date,cvv,mode,bot_row_number) == 1){
        kith_complete_payment(page,bot_row_number,mode);
    }else{
      console.log("returned FALSE 0000-007")
    }
}
//----------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------
};

  


async function kith_complete_payment(page,bot_row_number,mode){
  if(mode == 1){
      console.log("Test Mode ORDER PLACED✓\n")
      change_stat_Color_and_message(bot_row_number,'Test Mode ORDER PLACED✓\n'); //for changing color and updates text in status td

  }else if(mode ==0){
      try{
          await page.waitForXPath('/html/body/div[2]/div/div[1]/div[2]/div[1]/div/form/div[4]/div[1]/button')
          const purchaseBTN = await page.$x('/html/body/div[2]/div/div[1]/div[2]/div[1]/div/form/div[4]/div[1]/button')
          purchaseBTN[0].click();
          change_stat_Color_and_message(bot_row_number,'ORDER PLACED✓\n'); //for changing color and updates text in status td

          //Posting to discord webhook throguh communication with cloud functions
          DiscPost.discord_POST("KITH",Grabbed_Item_Name_For_Discord_Feedback,Grabbed_Price_For_Discord_Feedback,"DollHouse",Grabbed_Image_URL_For_Dicord_Feedback)

          console.log("ORDER PLACED✓\n")
      }catch{
          console.log("Error finalizing Payment")
      } 
  }
}



function change_stat_Color_and_message(dick,dic){
    console.log(dic)
};


runKithPuppet(row_number,headMode,url,username,password,userEmail,user_Fname,user_Lname,addy,city,zipcode,phoneNumber,card_number,fullname,exp_date,cvv,mode,sizeList)




//to kill process
// Or just kill the process
//process.kill(browserPID);







/*
//for changing the color of the status of the specific row TD
function change_stat_Color_and_message(rowNumber ,message){
    var status_text = document.getElementById("botTasksTable").rows[rowNumber].cells[6]//status td for specific row
    
      if(message === 'Heading To Site\n' || message === "Size FOUND !\n" ||message == "Success Passing Frame\n" ||message =="Logging In....\n"){
    
        status_text.style.color = "#D2FE8A"
        status_text.innerHTML = message
    
      }else if(message == "Carting....\n" ||message == "Carting 🛒....\n" || message =="Awaiting Captcha Solution...\n" ||message =="Card Info Entry Completed\n" ){
        status_text.style.color = "#02FBEC"
        status_text.innerHTML = message
    
      }else if(message == "Viewing product Page....\n" ||message == "Still Searching🤞...\n" ||message =="\n" ||message =="Switched Back To Default Frame\n"){
    
        status_text.style.color = "#2ECCFA" //BLUE
        status_text.innerHTML = message
      }
      else if(message == "Entering User Address Information\n"||message == "Searching Site for Product\n"||message=="Entering Shipping Details....\n"){
    
        status_text.style.color = "#F6C9FE" 
        status_text.innerHTML = message
    
      }else if(message == "Entering User Card Information...\n"||message == "Item Found 😊\n" || message =="Proceeding...\n"){
    
        status_text.style.color = "#B2FAA2" 
        status_text.innerHTML = message
    
      }else if(message == "CHECKOUT SNIPED ✓\n"||message =="Size FOUND!\n"||message =="ORDER PLACED✓\n" ||message =="Test Mode ORDER PLACED✓\n"){
    
          status_text.style.color = "#00FF00" //GREEN  
          status_text.innerHTML = message
    
      }else if(message == "Standby\n" ||message =="APPLYING USER CUSTOM DELAY IF ANY\n" ||message =="Confirming User Shipping....\n" ||message == "Searching Size....\n"){
    
        status_text.style.color = "#E0FF02"
        status_text.innerHTML = message
    
      }else if(message == "RETRY Viewing Product Page\n" ||message == "--->Retrying Entering User Address Information\n"||message == "-->RE-Entering User Card Information\n"){
    
        status_text.style.color = "#FACC2E" //ORANGE
        status_text.innerHTML = message
        
      }
      else{
        status_text.style.color = "red"
        status_text.innerHTML = message
      }
}*/


