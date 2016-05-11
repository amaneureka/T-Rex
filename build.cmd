@ECHO off
REM    _____ __________ 
REM   /  _  \\______   \
REM  /  /_\  \|     ___/
REM /    |    \    |    
REM \____|__  /____|    
REM         \/          

REM LICENSE: MIT https://opensource.org/licenses/MIT
REM Copyright Aman Priyadarshi<aman.eureka@gmail.com>, 2016
REM Please find the copy of license under the file 'License.md'
REM Published: https://github.com/amaneureka/T-Rex

rm -f *.class
javac -cp ".;lib\*;" TRex.java
java -cp ".;lib\*;" TRex