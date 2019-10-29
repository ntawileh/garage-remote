FROM arm32v7/node:alpine as builder                                                                                         
WORKDIR /app                                                                                                        
COPY ./package.json .                                                                                               
RUN npm install                                                                                                     
COPY . .                                                                                                            
RUN npm run build

FROM arm32v7/nginx
EXPOSE 3000                                                                                                         
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf                                                            
COPY --from=builder /app/build /usr/share/nginx/html 