### 目录结构

```shell
src/ 工作目录
  api/  接口
  components/  全局组件，命名方式为 `组件名称/组件名称.vue`，可以不需要注册直接在页面使用
  composables/  自定义hooks
  constants/  常量
  pages/  页面
  static/  静态资源
  store/  全局变量pinia
  utils/  工具方法
  App.vue  入口页面文件
  main.ts  入口文件
  manifest.json  配置文件
  pages.json  页面路由配置
  uni.scss  全局样式，！！！此scss会编译到所有页面的样式文件中，所以只可以定义scss变量
types/  类型文件
.env.*  环境变量
```

### 环境

- node>=16
- pnpm>=8.12

### 快速开始
```shell
# 安装依赖
pnpm i

# 启动
pnpm dev

# 打包
pnpm build

# 开发预览
打开微信开发者工具，导入项目，选择 `dist/dev/mp-weixin`，
```

### 规范

##### VSCode相关

- 插件： `ESLint`，`Prettier`，`Vue - Official `
  > [!IMPORTANT]
  > 需要将 `Vuter` disable

- 设置：
  ```JSON
    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": true
    },
  ```

##### 样式相关

- `uni.scss` 文件会编译到所有组件css文件中，所以**务必不要在uni.scss中书写样式文件**，所有的scss变量都可以定义在此文件中

- 全局样式书的位置为 `static/styles` 中，可以在 `index.scss` 中书写，或者新建 scss 文件并在 `index.scss` 中 `@import` 这个文件，`index.scss` 已在 `App.vue` 中导入
  > [!IMPORTANT]
  > 在书写全局样式时注意样式隔离，防止不同组件的样式冲突

- `index.scss` 中已定义一些常见的样式类，在组件中尽量直接使用这些样式，减少组件的样式文件大小，可自行添加

- 保证样式一致，所有单位统一使用 `px`, 组件中的样式需要加上 `scoped`

##### 开发相关

- 所有vue相关的api都通过 `unplugin-auto-import` 库自动引入，开发中不需要手动引用

- 拓展组件库 [uni-ui](https://uniapp.dcloud.net.cn/component/uniui/uni-ui.html)，可以不需要导入直接使用，拓展组件库的 `types` 文件为 `@uni-helper/uni-ui-types`，详见 [uni-ui-types](https://github.com/uni-helper/uni-ui-types)

- `TypeScript` 类型可以和逻辑代码写在一起，也可以在 `types/` 文件夹中新建 `.d.ts` 文件书写
  
- `eslint-plugin-simple-import-sort` 会检查 `import` 的顺序，`ESLint` 报错后直接保存会自动修复

- 提交代码时会校验 `commit message` 的格式，最好通过下面的方法提交，`pnpm commit` 后会自动运行 `ESLint` 检查代码格式和 `Prettier` 格式化代码
  
  ```shell
    git add .
    pnpm commit
    git push
  ```
