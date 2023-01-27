# 나만의 가짜 컴퓨터 만드는 설명서 

# 1. 운영체제 및 프로그램 설치 (하나하나 입력하는 방식)
# FROM ubuntu:22.04

# RUN sudo apt install -y nodejs
# RUN sudo npm install -g yarn 

# 1. 운영체제 및 프로그램 설치(이미 리눅스, node, npm, yarn까지 모두 깔려있는 이미지 다운로드하는 방식)
FROM node:14

# 2. 패키지 먼저 설치하기
COPY ./package.json /myfolder/
COPY ./yarn.lock /myfolder/
WORKDIR /myfolder/
RUN yarn install

# 3. 변경된 소스코드 복사하기
COPY . /myfolder
RUN yarn build

# 4. 도커안에서 프로그램 실행하기
CMD yarn start

# 2. 프로그램 셋팅하기(yarn start로)

# RUN mkdir myfolder => 아래에서 COPY할 때, 자동으로 만들어주므로 굳이 필요없음
# COPY . /myfolder/
# WORKDIR /myfolder/

# # 마우스 자동으로 깜빡깜빡거리게 해줘~
# RUN yarn install --production
# RUN yarn build

# # 3. 도커안에서 프로그램 실행하기 
# CMD yarn start

