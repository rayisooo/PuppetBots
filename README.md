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
  
  
  

