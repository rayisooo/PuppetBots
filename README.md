# PuppetBots


 <div id="badges">
  <a href="https://www.linkedin.com/in/raymond-otoadese-758a2a102/">
    <img src="https://img.shields.io/badge/LinkedIn-blue?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn Badge"/>
  </a>
  <a href="https://www.youtube.com/@JerseyZCloutlordRexdrey">
    <img src="https://img.shields.io/badge/YouTube-red?style=for-the-badge&logo=youtube&logoColor=white" alt="Youtube Badge"/>
  </a>
  <a href="your-twitter-URL">
    <img src="https://img.shields.io/badge/Twitter-blue?style=for-the-badge&logo=twitter&logoColor=white" alt="Twitter Badge"/>
  </a>
</div>
<br>


+ Bots in this repo are designed and made on pupeteer
    ![alt text](https://miro.medium.com/max/800/1*gp-0nobJYjbjES6ev78DRA.png)

+ They are all have the same setup and design example below these are using puppeteer-extra but this is just to be less detectable

``` javascript
    
    const puppeteer = require('puppeteer-extra')
    
    const pluginStealth = require("puppeteer-extra-plugin-stealth");
    
    puppeteer.use(pluginStealth());
    
    // You can simply run this to get the browser's pid
    const browserPID = browser.process().pid    
    
    processArray.push(browserPID); //adds the individual process ID to process array incase we need to kill it
  
    
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
  
  
  ```
  
  ## Killing Bot Process
  Stopping the bot process consist of 
  
  ``` javascript
  process.kill(browserPID)
  browser.close()
  ```
  
  ## Delay Function
   I dont just use the built in wait functions but I also use a delay function that i made and it basically just works great.
   
   ```javascript 
   
    //delay function
    const delay = millis => new Promise((resolve, reject) => {
        setTimeout(_ => resolve(), millis)
    });
   ```
   
   ## Communication In The Bot
   Communication is undertaking through the function change_stat_Color_and_message this function receives a parameter which is a row number and a string which holds the given message. This function checks this message to the already known messages and changes the html color for that specific row depict a specific message if the message is unknown it could mean its an error so it defaults to red and shows the message 
   
   ``` javascript 
   //for changing the color of the status of the specific row TD
function change_stat_Color_and_message(rowNumber ,message){
  var status_text = document.getElementById("botTasksTable").rows[rowNumber].cells[6]//status td for specific row
  
    if(message === 'Heading To Site\n' || message === "Size FOUND !\n" ||message == "Success Passing Frame\n" ||message =="Logging In....\n" || message =="Page Bypass Activated...." || message == "CAPTCHA SOLVED!"){
  
      status_text.style.color = "#D2FE8A"
      status_text.innerHTML = message
  
    }else if(message == "Carting....\n" ||message == "Carting 🛒....\n" || message =="Awaiting Captcha Solution...\n" ||message =="Card Info Entry Completed\n" ||message =="Entering Raffle !\n" ||message === 'Heading To SNKRS'){
      status_text.style.color = "#02FBEC"
      status_text.innerHTML = message
  
    }else if(message == "Viewing product Page....\n" ||message == "Still Searching🤞...\n" ||message =="\n" ||message =="Switched Back To Default Frame\n" || message =="Entering Contanct Info...."){
  
      status_text.style.color = "#2ECCFA" //BLUE
      status_text.innerHTML = message
    }
    else if(message == "Entering User Address Information\n"||message == "Searching Site for Product\n"||message=="Entering Shipping Details....\n"||message == "SNKRS ENTRY \n" ){
  
      status_text.style.color = "#F6C9FE" 
      status_text.innerHTML = message
  
    }else if(message == "Entering User Card Information...\n"||message == "Item Found 😊\n" || message =="Proceeding...\n" || message =="Success Await Raffle Email!"){
  
      status_text.style.color = "#B2FAA2" 
      status_text.innerHTML = message
  
    }else if(message == "CHECKOUT SNIPED ✓\n"||message =="Size FOUND!\n"||message =="ORDER PLACED✓\n" ||message =="Test Mode ORDER PLACED✓\n" || message =="Raffle Entered !\n"){
  
        status_text.style.color = "#00FF00" //GREEN  
        status_text.innerHTML = message
  
    }else if(message == "Standby\n" ||message =="APPLYING USER CUSTOM DELAY IF ANY\n" ||message =="Confirming User Shipping....\n" ||message == "Searching Size....\n"){
  
      status_text.style.color = "#E0FF02"
      status_text.innerHTML = message
  
    }else if(message == "RETRY Viewing Product Page\n" ||message == "--->Retrying Entering User Address Information\n"||message == "-->RE-Entering User Card Information\n"){
  
      status_text.style.color = "#FACC2E" //ORANGE
      status_text.innerHTML = message
      
    }else{
      status_text.style.color = "red"
      status_text.innerHTML = message
    }
}
```



  
  
  

