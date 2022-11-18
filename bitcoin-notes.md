# Private key

# generate private key in PEM format
openssl ecparam -genkey -name secp256k1 -rand /dev/urandom -out test-private.pem

# print out private key in hex
openssl ec -in test-private.pem -outform DER | tail -c +8 | head -c 32 | xxd -p -c 32

# another way of getting private key in hex, look for corresponding section
echo 'encoded-PEM-text' | openssl asn1parse

# Public key

## print out public key
openssl ec -in test-private.pem -pubout

## get public key in hex
openssl ec -in test-private.pem -pubout -outform DER | tail -c 65| xxd -p -c 65

# another way of getting public key in hex, look for corresponding section
echo 'encoded-public-PEM-text' | openssl asn1parse -offset 20 -dump

## public key format
### scheme?
04
### xcoord
de82bffb8be15d94db5712efe6745505fb5ebb8490af92330d5f4f8eb3552121
### ycoord
90ad60178992f7be84f202d6f1b9ca1d8a48c1c0793027d12eea48b2da6553ab





