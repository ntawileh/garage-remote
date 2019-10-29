FROM arm32v7/nginx
# ENV SERVER_NAME=example.org
ARG SERVER_NAME
ENV SERVER_NAME $SERVER_NAME
COPY ./default.conf ./default.tmpl 
COPY ./checkEnv.sh ./
RUN sh ./checkEnv.sh
RUN sed "s/ENV_SERVER_NAME/${SERVER_NAME}/g" ./default.tmpl > /etc/nginx/conf.d/default.conf