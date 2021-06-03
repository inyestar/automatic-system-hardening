#!/usr/bin/env bash
echo -e "Content-type: text/html\n\n"

# print memory usage 
free -h | tr '\n' ',' | tr -s '[:blank:]' ','

