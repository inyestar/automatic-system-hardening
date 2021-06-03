#!/usr/bin/env bash
echo -e "Content-type: text/html\n\n"

# print cpu usage 
top -bn1 | head -3 | tail -1 | sed 's/\s\+//g' | tr ':' ','
