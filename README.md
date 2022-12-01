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

    }else{
      status_text.style.color = "red"
      status_text.innerHTML = message
    }
}
```

## Item Checkout & Discord Communication
when a item is successfully checked out the bot will send a message to discord saying the item was purchased along with any other relevant information.

+ Variables like item name ,item price and item image url are scrapped from the page when going through the process of checking out then all the details will be passed to the discord bot 

``` javascript 

DiscPost.discord_POST("JIMMY JAZZ",Grabbed_Item_Name_For_Discord_Feedback,Grabbed_Price_For_Discord_Feedback,"DollHouse",Grabbed_Image_URL_For_Dicord_Feedback);

```

Then inside of cloudCom.js there is a function which takes in those arguments and makes XMLHttpRequest using xhr2 

``` javascript 
module.exports = {
  
    discord_POST : function(store_for_dicord_feed,item_name_for_dicord_feed,item_price_for_dicord_feed,bot_mode_for_dicord_feed,image_url_for_dicord_feed){
        
        var XMLHttpRequest = require('xhr2');
        
        var xhr = new XMLHttpRequest();

        //POSTING DATA TO MY GOOGLE CLOUD FUNCTION WHICH COMMUNICATES WITH DISCORD

        var url = "https://us-central1-upbeat-sunspot-351919.cloudfunctions.net/discordFeedback";

        var params = `store=${store_for_dicord_feed}&item_name=${item_name_for_dicord_feed}&item_price=${item_price_for_dicord_feed}&bot_mode=${bot_mode_for_dicord_feed}&image_url=${image_url_for_dicord_feed}`;

        xhr.open("POST", url, true);

        //Send the proper header information along with the request
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")

        xhr.send(params);
    }
    
}
```





  
  
  

