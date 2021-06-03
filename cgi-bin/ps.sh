#!/usr/bin/env bash
echo -e "Content-type: text/html\n\n"

# print all process
START=$(echo $QUERY_STRING | cut -d'&' -f1 | sed 's/start=//g')
END=$(echo $QUERY_STRING | cut -d'&' -f2 | sed 's/end=//g')

if [ $START -eq 1 ]
then
    ps -o uid:1= -o pid:1= -o ppid:1= -o stime:1= -o tty:1= -o time:1= -o cmd:1= -e > ./result/ps.result;
    echo "count="$(wc -l < ./result/ps.result);
fi
sed -n ${START},${END}p ./result/ps.result;
