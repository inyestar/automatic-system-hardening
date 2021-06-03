#!/usr/bin/env bash
echo -e "Content-type: text/html\n\n"

# print disk usage 
df -Th | tail -n +2 | sed 's/\s\+/,/g'
