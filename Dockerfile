
FROM  node:10.15.3

# 容器中创建一个目录
RUN mkdir -p /usr/src/nest

# 跳转到指定的文件目录
WORKDIR /usr/src/nest

# RUN/COPY 是分层的，package.json 提前，只要没修改，就不会重新安装包

COPY  package.json /usr/src/app/package.json
RUN cd /usr/src/app/
RUN npm i 

# 将当前的文件拷贝到 /usr/src/nest 文件夹下

COPY . /usr/src/nest/

# 暴露的端口号
EXPOSE  4000

CMD [ "nest", "start" ]