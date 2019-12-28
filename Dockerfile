
FROM  node

RUN mkdir -p /u 



# 暴露的端口号
EXPOSE  4000

CMD [ "nest start" ]