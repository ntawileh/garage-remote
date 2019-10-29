#/bin/sh

# make sure SERVER_NAME is set

if [ -z "$SERVER_NAME" ]; then
	echo "Need to set SERVER_NAME environment variable"
	exit 1
fi 

echo $SERVER_NAME

