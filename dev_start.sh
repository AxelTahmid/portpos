#!/bin/bash

GREEN='\033[0;32m'

echo -e "${GREEN}********************************"
echo -e "*                              *"
echo -e "*        PORTPOST TEST         *"
echo -e "*                              *"
echo -e "********************************${NC}"
echo ""

export npmMinVersion=8
if echo -e "$(npm -v|awk '{print $2}')\n${npmMinVersion}" | sort -V | head -1 | grep -q ^${npmMinVersion}$;then
  echo "npm valid"

else
  echo "npm version > 8 needed."
fi

echo "starting development server"
echo "serving server at localhost:3000"

cd server
npm run dev

echo "serving client at localhost:3001"

cd ../client/
npm run dev
