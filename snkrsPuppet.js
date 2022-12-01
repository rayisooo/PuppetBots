
var   processArray  = [];
var _url = "https://www.nike.com/launch/t/air-jordan-6-low-lunar-new-year";
var _sizeList
const size = 'M 8.5 / W 10';




const delay = millis => new Promise((resolve, reject) => {
    setTimeout(_ => resolve(), millis)
});


async function runSnkrsPuppet(url,headMode,proxy,acc_email,acc_password,size,cvv){

    if(headMode == true){
        change_stat_Color_and_message(bot_row_number,'Entered Raffle!\n'); //for changing color and updates text in status td
    }

    
    const supportFuncLib = require('../supportFuncs.js')
    
    const puppeteer = require('puppeteer-extra')
    const pluginStealth = require("puppeteer-extra-plugin-stealth");
    puppeteer.use(pluginStealth());

    const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker');
    puppeteer.use(AdblockerPlugin({ blockTrackers: true }));
    


    const browser  = await puppeteer.launch({
        headless: headMode, //false or true
        executablePath:"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
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
    //await page.waitFor(500);
    //await page.setUserAgent('Mozilla/5 (Mac Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Safari/605.1.15');

    //heads to the passed url.....
    await page.goto(url);


    //makesure im actually on a item page before showing any messages
    if(await page.$('.buying-tools-container ') !== null){
        //JUST TO MAKE USERS THINK SOMETHING IS HAPPENING...
        if(headMode == false){
            change_stat_Color_and_message(bot_row_number,'Logging in...\n'); //for changing color and updates text in status td
        }else{
            change_stat_Color_and_message(bot_row_number,'Logging in...\n'); //for changing color and updates text in status td
            delay(3000)
            change_stat_Color_and_message(bot_row_number,'Proceeding SNKRS Entry...\n'); //for changing color and updates text in status td
        }
    }
    else{console.log('not found')};
    
        
    

    //login function
    await snkrsLogin(page,acc_email,acc_password);
      

    //cart item
   // await page.waitFor(500);

   
   if(headMode == false){
        change_stat_Color_and_message(bot_row_number,'Searching Size....\n'); //for changing color and updates text in status td
   }

   //SELECT SIZE
   await snkrsSize_and_cart(page,size);
   change_stat_Color_and_message(bot_row_number,'Size FOUND!\n'); //for changing color and updates text in status td

   //CLICK CHECKOUT BUTTON MEMBER BUTTON AND ENTER CREDENTIAL AS CVV SINCE WE ARE USING ACCOUNTS WE EXPECT USER TO HAVE EVERYTHING ELSE DONE
   await completeSNKRS_checkout(page,cvv)
   change_stat_Color_and_message(bot_row_number,'Success Await Raffle Email!\n'); //for changing color and updates text in status td


  



}

//=======================================================================================================================
async function snkrsLogin(page,email,password){
    // #### Login to Account
    await page.waitForSelector('button[data-qa="top-nav-join-or-login-button"]');
    console.log('Login button loaded')

    await page.evaluate(() => 
    document.querySelectorAll('button[data-qa="top-nav-join-or-login-button"]')[0].click())
    console.log("Testing login")

    var myid = await page.evaluate(()=>{
        return document.getElementsByName('emailAddress')[0].id
    });
    
    
    console.log(myid)
    
    //await page.waitForSelector(`#${myid}`);
    await page.waitForSelector(`.emailAddress > input`);
    await page.waitFor(500);

    delay(2000)
    await page.focus('.emailAddress > input');
    await page.keyboard.type(email);
    await page.waitFor(200);
    
    
    // Password
    //await page.waitForSelector(`#${myid}`);
    await page.waitForSelector(`.password > input`);
    await page.waitFor(500);

    delay(1000)
    await page.focus('.password > input')
    await page.keyboard.type(password);
    await page.waitFor(200);
        

    //submit
    await page.waitFor(500);
    delay(1000)
    await page.evaluate(() =>
        document.querySelectorAll(".loginSubmit > input")[0].click()
    );		
}

//=======================================================================================================================
async function snkrsSize_and_cart(page,passed_size){
    //converts the passsed size value into a actual size value that works with snkrs
    var size;
    if(String(passed_size)=="7"){
        size ="M 7 / W 8.5"
    }else if(String(passed_size)=="7.5"){
        size ="M 7.5 / W 9"
    }else if(String(passed_size)=="8"){
        size ="M 8 / W 9.5"
    }else if(String(passed_size)=="8.5"){
        size="M 8.5 / W 10"
    }else if(String(passed_size)=="9"){
        size="M 9 / W 10.5"
    }else if(String(passed_size)=="9.5"){
        size="M 9.5 / W 11"
    }else if(String(passed_size)=="10"){
        size="M 10 / W 11.5"
    }else if(String(passed_size)=="10.5"){
        size="M 10.5 / W 12"
    }else if(String(passed_size)=="11"){
        size="M 11 / W 12.5"
    }else if(String(passed_size)=="11.5"){
        size="M 11.5 / W 13"
    }else if(String(passed_size)=="12"){
        size="M 12 / W 13.5"
    }else if(String(passed_size)=="12.5"){
        size="M 12.5 / W 14"
    }else if(String(passed_size)=="13"){
        size="M 13 / W 14.5"
    }else if(String(passed_size)=="13.5"){
        size="M 14 / W 15.5"
    }else if(String(passed_size)=="14"){
        size="M 14 / W 15.5"
    }else if(String(passed_size)=="14.5"){
        size="M 15 / W 16.5"
    }



    await page.waitFor(500);
    await page.waitForSelector('.size-grid-dropdown');

    await page.waitFor(500);
    await page.evaluate(() =>
        document.querySelectorAll(".size-grid-dropdown")[0].scrollIntoView()
    );


    await page.waitFor(500);
    await page.evaluate(async(size) => {
        
        let sizes = Array.from(document.querySelectorAll(".size-grid-dropdown"));

        let sizeIndex = sizes
            .map((s, i) => (s.innerHTML === size ? i : false))
            .filter(Boolean)[0];
        return sizes[sizeIndex].click();
    }, size);

    //select buy button...
    await page.waitFor(500);
    await page.waitForSelector('button[class="ncss-btn-primary-dark btn-lg  "]');
    await page.evaluate(() =>
        document.querySelectorAll('button[class="ncss-btn-primary-dark btn-lg  "]')[0].scrollIntoView()
    );


    await page.waitFor(500);
    await page.evaluate(() =>
		document.querySelectorAll('button[class="ncss-btn-primary-dark btn-lg  "]')[0].click()
	);   
}

//not obfuscatable
async function completeSNKRS_checkout(page,CVV){
    //finish SNKRS CHECKOUT
    //cart item
    await page.evaluate(() =>
		document.querySelectorAll('button[class="shopping-cart-button"]')[0].click()
	);
    //checkout 
    await page.evaluate(() =>
		document.querySelectorAll('button[data-automation="go-to-checkout-button"]')[0].click()
	);
    //member checkout
    await page.evaluate(() =>
		document.querySelectorAll('button[data-automation="member-checkout-button"]')[0].click()
	);



    //ENTER CREDIT CARD INFORMATION
    // Enter credit card info
    await page.waitForSelector('.credit-card-iframe');
    await page.waitForSelector('.credit-card-iframe');
    
    await page.evaluate(() =>
        document.querySelectorAll(".credit-card-iframe")[0].scrollIntoView()
    );
    await page.waitFor(200);
    
    const target_frame = page.frames().find(frame => frame.url().includes('paymentcc.nike.com'));
    
    await target_frame.evaluate(
        () => (document.getElementById("cvNumber").focus())
    );	
    await target_frame.waitFor(1000);
    await page.keyboard.type(CVV, {delay: 10});
    

    try{
        await page.waitForSelector('.save-button');
		const buttons = await page.$$('.save-button');
		await buttons[1].click()
    }catch{
        console.log("minor error")
    }


    const buttons = await page.$$('.save-button');
    await page.waitFor(500);	

    if(mode ==0){
        await buttons[2].click();
        change_stat_Color_and_message(bot_row_number,'\n'); //for changing color and updates text in status td
    }

}




runSnkrsPuppet('https://www.nike.com/launch/t/air-jordan-6-low-lunar-new-year',false,"","jackdanies@gmail.com","vysqi9pazbYtpyttah",size)



/*
		// Username
        var email_id = await page.evaluate(()=>{
            return document.getElementsByName('emailAddress')[0].id
        });
        await page.waitFor(500);
        await page.evaluate((email,email_id)=>{
            document.getElementById(`${email_id}`).value = "jackdanies@gmail.com"
        },email,email_id)


        //Password
        
        var password_id = await page.evaluate(()=>{
            return document.getElementsByName('password')[0].id
        });
        await page.waitFor(500);
        await page.evaluate((password,password_id)=>{
            document.getElementById(`${password_id}`).value = "vysqi9pazbYtpyttah"
        },email,password_id)
        */