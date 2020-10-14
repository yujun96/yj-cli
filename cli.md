## 使用node开发自己的cli工具
### 使用CLI的好处？
减少低级重复劳动、提高开发效率、规范develop workflow
### 开发yj-cli
1. 初始化一个项目
```
1. mkdir yj-cli   
2. cd yj-cli 
3. npm init -y  
```
2. 创建链接
在本地开发npm模块的时候，我们可以使用npm link命令，将npm 模块链接到对应的运行项目中去，方便地对模块进行调试和测试
```
1. 新建文件 index.js

2. 在package.json里面加一个bin: yj-cli: 'index.js'
3. cd yj-cli     npm link     这样就可以全局使用yj-cli   
```
想了解npm link   bin等请看我下一篇文章(还未发布，后续更新)

3. 获取命令行的参数
```

```
