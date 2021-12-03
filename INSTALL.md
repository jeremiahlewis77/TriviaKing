## How to setup Trivia King
1. Make sure you have latest version of NodeJS installed on your computer
  * Download can be found here: https://nodejs.org/en/download/
2. After downloading Trivia King source code, open the directory in cmd.exe
3. Type the following:
    cd Client
    npm install
    npm start
4. Open another cmd.exe in root directory and type:
    cd Server
    npm install
    npm start
    
The above commands will start Trivia King.
You should also configure your DB in the **./Server/connection.js** file and use the **DB_Queries.txt** to set up your database.

