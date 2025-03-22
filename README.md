# unsplash-random-images

本项目是一个随机图片获取项目，通过 unsplash 提供的 api 接口获取 unsplash 上的图片

去 https://unsplash.com/ 注册账号
然后注册自己的 apps
从里面可以获取到 Access Key，用于发起请求图片接口的认证
有配额，一个小时只能发起 50 次请求，是 50 次，不是张数限制

获取到 Access Key 后，在 src/components/Unsplash.vue 文件中，替换掉 accessKey 的值 为自己的 Access Key

node 版本 18.18.2

npm install

npm run serve
