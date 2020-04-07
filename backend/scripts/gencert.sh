openssl req -newkey rsa:2048 -new -nodes -keyout key.pem -out csr.pem 
openssl x509 -req -days 365 -in csr.pem -signkey key.pem -out server.crt
openssl base64 -in key.pem -out mykey_encoded.pem && echo $(<mykey_encoded.pem) | tr -d ' ' > mykey_encoded.pem
