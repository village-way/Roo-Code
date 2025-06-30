<div align="center">
<sub>

<b>English</b> • [Català](locales/ca/README.md) • [Deutsch](locales/de/README.md) • [Español](locales/es/README.md) • [Français](locales/fr/README.md) • [हिंदी](locales/hi/README.md) • [Bahasa Indonesia](locales/id/README.md) • [Italiano](locales/it/README.md) • [日本語](locales/ja/README.md)

</sub>
<sub>

[한국어](locales/ko/README.md) • [Nederlands](locales/nl/README.md) • [Polski](locales/pl/README.md) • [Português (BR)](locales/pt-BR/README.md) • [Русский](locales/ru/README.md) • [Türkçe](locales/tr/README.md) • [Tiếng Việt](locales/vi/README.md) • [简体中文](locales/zh-CN/README.md) • [繁體中文](locales/zh-TW/README.md)

</sub>
</div>
<br>
<div align="center">

<a href="https://marketplace.visualstudio.com/items?itemName=RooVeterinaryInc.roo-cline" target="_blank"><img src="https://img.shields.io/badge/Download%20on%20VS%20Marketplace-blue?style=for-the-badge&logo=visualstudiocode&logoColor=white" alt="Download on VS Marketplace"></a>
<a href="https://github.com/RooCodeInc/Roo-Code/discussions/categories/feature-requests?discussions_q=is%3Aopen+category%3A%22Feature+Requests%22+sort%3Atop" target="_blank"><img src="https://img.shields.io/badge/Feature%20Requests-yellow?style=for-the-badge" alt="Feature Requests"></a>
<a href="https://marketplace.visualstudio.com/items?itemName=RooVeterinaryInc.roo-cline&ssr=false#review-details" target="_blank"><img src="https://img.shields.io/badge/Rate%20%26%20Review-green?style=for-the-badge" alt="Rate & Review"></a>
<a href="https://docs.roocode.com" target="_blank"><img src="https://img.shields.io/badge/Documentation-6B46C1?style=for-the-badge&logo=readthedocs&logoColor=white" alt="Documentation"></a>

</div>

**Roo Code** 是一个AI驱动的**自主编码代理**，它生活在你的编辑器中。它可以：

- 使用自然语言进行交流
- 直接在你的工作区读写文件
- 运行终端命令
- 自动化浏览器操作
- 与任何OpenAI兼容或自定义的API/模型集成
- 通过**自定义模式**调整其“个性”和能力

无论你是寻求一个灵活的编码伙伴，一个系统架构师，还是专门的角色如QA工程师或产品经理，Roo Code都可以帮助你更高效地构建软件。

查看[变更日志](CHANGELOG.md)了解详细更新和修复。

---

## App Version

3.19.6

## API Provider

Anthropic

## Model Used

clouad4 sonet

---

## What Can Roo Code Do?

- 🚀 **从自然语言描述生成代码**
- 🔧 **重构和调试现有代码**
- 📝 **编写和更新文档**
- 🤔 **回答关于代码库的问题**
- 🔄 **自动化重复性任务**
- 🏗️ **创建新文件和项目**

## Quick Start

1. [安装Roo Code](https://docs.roocode.com/getting-started/installing)
2. [连接你的API提供商](https://docs.roocode.com/getting-started/connecting-api-provider)
3. [尝试你的第一个任务](https://docs.roocode.com/getting-started/your-first-task)

## Key Features

### 多种模式

Roo Code通过专门的[模式](https://docs.roocode.com/basic-usage/using-modes)适应你的需求：

- **代码模式：** 适用于通用编码任务
- **架构师模式：** 适用于计划和技术领导
- **询问模式：** 适用于回答问题和提供信息
- **调试模式：** 适用于系统问题诊断
- **[自定义模式](https://docs.roocode.com/advanced-usage/custom-modes)：** 创建无限量的专用角色用于安全审计、性能优化、文档编写或其他任何任务

### 智能工具

Roo Code附带了强大的[工具](https://docs.roocode.com/basic-usage/how-tools-work)，可以：

- 在你的项目中读写文件
- 执行VS Code终端命令
- 控制网络浏览器
- 通过[MCP（模型上下文协议）](https://docs.roocode.com/advanced-usage/mcp)集成外部工具

MCP通过允许你添加无限自定义工具扩展了Roo Code的功能。你可以集成外部API，连接数据库，或创建专用开发工具——MCP提供了框架来扩展Roo Code的功能以满足你的特定需求。

### 自定义设置

通过以下方式使Roo Code符合你的使用习惯：

- [自定义指令](https://docs.roocode.com/advanced-usage/custom-instructions)实现个性化行为
- [自定义模式](https://docs.roocode.com/advanced-usage/custom-modes)实现专门任务处理
- [本地模型](https://docs.roocode.com/advanced-usage/local-models)实现离线使用
- [自动批准设置](https://docs.roocode.com/advanced-usage/auto-approving-actions)实现更快的工作流程

## 资源

### 文档

- [基本使用指南](https://docs.roocode.com/basic-usage/the-chat-interface)
- [高级功能](https://docs.roocode.com/advanced-usage/auto-approving-actions)
- [常见问题解答](https://docs.roocode.com/faq)

### 社区

- **Discord：** [加入我们的Discord服务器](https://discord.gg/roocode)获取实时帮助和讨论
- **Reddit：** [访问我们的子版块](https://www.reddit.com/r/RooCode)分享经验和技巧
- **GitHub：** 报告[问题](https://github.com/RooCodeInc/Roo-Code/issues)或请求[功能](https://github.com/RooCodeInc/Roo-Code/discussions/categories/feature-requests?discussions_q=is%3Aopen+category%3A%22Feature+Requests%22+sort%3Atop)

---

## 本地设置与开发

1. **克隆**仓库：

```sh
git clone https://github.com/RooCodeInc/Roo-Code.git
```

2. **安装依赖项**：

```sh
pnpm install
```

3. **运行扩展**：

在VSCode中按下`F5`（或**运行** → **开始调试**）打开一个新窗口，其中运行着Roo Code。

对webview的更改会立即生效。对核心扩展的更改需要重新启动扩展主机。

或者，你可以构建一个.vsix文件并直接在VSCode中安装：

```sh
pnpm vsix
```

这将在`bin/`目录中生成一个`.vsix`文件，可以通过以下命令安装：

```sh
code --install-extension bin/roo-cline-<version>.vsix
```

我们使用[changesets](https://github.com/changesets/changesets)进行版本管理和发布。查看`CHANGELOG.md`获取发行说明。

---

## 免责声明

请注意，Roo Code, Inc不对通过Roo Code提供的或与其相关的任何代码、模型或其他工具，以及任何第三方工具或结果输出做出任何形式的陈述或保证。你承担使用此类工具或输出的所有风险；这些工具按“原样”和“可用”基础提供。此类风险可能包括但不限于知识产权侵权、网络安全漏洞或攻击、偏见、不准确性、错误、缺陷、病毒、停机、财产损失或损害，以及/或人身伤害。你对你使用此类工具或输出（包括但不限于其合法性和适用性及其结果）负全部责任。

---

## 贡献

我们热爱社区贡献！请阅读我们的[CONTRIBUTING.md](CONTRIBUTING.md)开始贡献。

---

## 贡献者

感谢所有帮助改进Roo Code的贡献者！

<!-- START CONTRIBUTORS SECTION - AUTO-GENERATED, DO NOT EDIT MANUALLY -->

|                 <a href="https://github.com/mrubens"><img src="https://avatars.githubusercontent.com/u/2600?v=4" width="100" height="100" alt="mrubens"/><br /><sub><b>mrubens</b></sub></a>                 |         <a href="https://github.com/saoudrizwan"><img src="https://avatars.githubusercontent.com/u/7799382?v=4" width="100" height="100" alt="saoudrizwan"/><br /><sub><b>saoudrizwan</b></sub></a>         |                            <a href="https://github.com/cte"><img src="https://avatars.githubusercontent.com/u/16332?v=4" width="100" height="100" alt="cte"/><br /><sub><b>cte</b></sub></a>                             |            <a href="https://github.com/samhvw8"><img src="https://avatars.githubusercontent.com/u/12538214?v=4" width="100" height="100" alt="samhvw8"/><br /><sub><b>samhvw8</b></sub></a>            |     <a href="https://github.com/daniel-lxs"><img src="https://avatars.githubusercontent.com/u/57051444?v=4" width="100" height="100" alt="daniel-lxs"/><br /><sub><b>daniel-lxs</b></sub></a>     |          <a href="https://github.com/hannesrudolph"><img src="https://avatars.githubusercontent.com/u/49103247?v=4" width="100" height="100" alt="hannesrudolph"/><br /><sub><b>hannesrudolph</b></sub></a>           |
| :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|                <a href="https://github.com/KJ7LNW"><img src="https://avatars.githubusercontent.com/u/93454819?v=4" width="100" height="100" alt="KJ7LNW"/><br /><sub><b>KJ7LNW</b></sub></a>                 |              <a href="https://github.com/a8trejo"><img src="https://avatars.githubusercontent.com/u/62401433?v=4" width="100" height="100" alt="a8trejo"/><br /><sub><b>a8trejo</b></sub></a>               |                <a href="https://github.com/ColemanRoo"><img src="https://avatars.githubusercontent.com/u/117104599?v=4" width="100" height="100" alt="ColemanRoo"/><br /><sub><b>ColemanRoo</b></sub></a>                |      <a href="https://github.com/canrobins13"><img src="https://avatars.githubusercontent.com/u/20544372?v=4" width="100" height="100" alt="canrobins13"/><br /><sub><b>canrobins13</b></sub></a>      |        <a href="https://github.com/stea9499"><img src="https://avatars.githubusercontent.com/u/4163795?v=4" width="100" height="100" alt="stea9499"/><br /><sub><b>stea9499</b></sub></a>         |            <a href="https://github.com/joemanley201"><img src="https://avatars.githubusercontent.com/u/8299960?v=4" width="100" height="100" alt="joemanley201"/><br /><sub><b>joemanley201</b></sub></a>             |
|            <a href="https://github.com/System233"><img src="https://avatars.githubusercontent.com/u/20336040?v=4" width="100" height="100" alt="System233"/><br /><sub><b>System233</b></sub></a>            |             <a href="https://github.com/jquanton"><img src="https://avatars.githubusercontent.com/u/88576563?v=4" width="100" height="100" alt="jquanton"/><br /><sub><b>jquanton</b></sub></a>             |                <a href="https://github.com/nissa-seru"><img src="https://avatars.githubusercontent.com/u/119150866?v=4" width="100" height="100" alt="nissa-seru"/><br /><sub><b>nissa-seru</b></sub></a>                |             <a href="https://github.com/NyxJae"><img src="https://avatars.githubusercontent.com/u/52313587?v=4" width="100" height="100" alt="NyxJae"/><br /><sub><b>NyxJae</b></sub></a>              |                   <a href="https://github.com/jr"><img src="https://avatars.githubusercontent.com/u/5629?v=4" width="100" height="100" alt="jr"/><br /><sub><b>jr</b></sub></a>                   |                  <a href="https://github.com/MuriloFP"><img src="https://avatars.githubusercontent.com/u/50873657?v=4" width="100" height="100" alt="MuriloFP"/><br /><sub><b>MuriloFP</b></sub></a>                  |
|             <a href="https://github.com/elianiva"><img src="https://avatars.githubusercontent.com/u/51877647?v=4" width="100" height="100" alt="elianiva"/><br /><sub><b>elianiva</b></sub></a>              |                  <a href="https://github.com/d-oit"><img src="https://avatars.githubusercontent.com/u/6849456?v=4" width="100" height="100" alt="d-oit"/><br /><sub><b>d-oit</b></sub></a>                  |                   <a href="https://github.com/punkpeye"><img src="https://avatars.githubusercontent.com/u/108313943?v=4" width="100" height="100" alt="punkpeye"/><br /><sub><b>punkpeye</b></sub></a>                   |        <a href="https://github.com/wkordalski"><img src="https://avatars.githubusercontent.com/u/3035587?v=4" width="100" height="100" alt="wkordalski"/><br /><sub><b>wkordalski</b></sub></a>        |     <a href="https://github.com/sachasayan"><img src="https://avatars.githubusercontent.com/u/1666034?v=4" width="100" height="100" alt="sachasayan"/><br /><sub><b>sachasayan</b></sub></a>      | <a href="https://github.com/Smartsheet-JB-Brown"><img src="https://avatars.githubusercontent.com/u/171734120?v=4" width="100" height="100" alt="Smartsheet-JB-Brown"/><br /><sub><b>Smartsheet-JB-Brown</b></sub></a> |
|        <a href="https://github.com/monotykamary"><img src="https://avatars.githubusercontent.com/u/1130103?v=4" width="100" height="100" alt="monotykamary"/><br /><sub><b>monotykamary</b></sub></a>        |              <a href="https://github.com/cannuri"><img src="https://avatars.githubusercontent.com/u/91494156?v=4" width="100" height="100" alt="cannuri"/><br /><sub><b>cannuri</b></sub></a>               |                   <a href="https://github.com/xyOz-dev"><img src="https://avatars.githubusercontent.com/u/195602624?v=4" width="100" height="100" alt="xyOz-dev"/><br /><sub><b>xyOz-dev</b></sub></a>                   |         <a href="https://github.com/feifei325"><img src="https://avatars.githubusercontent.com/u/46489071?v=4" width="100" height="100" alt="feifei325"/><br /><sub><b>feifei325</b></sub></a>         | <a href="https://github.com/zhangtony239"><img src="https://avatars.githubusercontent.com/u/157202938?v=4" width="100" height="100" alt="zhangtony239"/><br /><sub><b>zhangtony239</b></sub></a>  |                       <a href="https://github.com/qdaxb"><img src="https://avatars.githubusercontent.com/u/4157870?v=4" width="100" height="100" alt="qdaxb"/><br /><sub><b>qdaxb</b></sub></a>                       |
|        <a href="https://github.com/shariqriazz"><img src="https://avatars.githubusercontent.com/u/196900129?v=4" width="100" height="100" alt="shariqriazz"/><br /><sub><b>shariqriazz</b></sub></a>         |     <a href="https://github.com/pugazhendhi-m"><img src="https://avatars.githubusercontent.com/u/132246623?v=4" width="100" height="100" alt="pugazhendhi-m"/><br /><sub><b>pugazhendhi-m</b></sub></a>     |       <a href="https://github.com/vigneshsubbiah16"><img src="https://avatars.githubusercontent.com/u/51325334?v=4" width="100" height="100" alt="vigneshsubbiah16"/><br /><sub><b>vigneshsubbiah16</b></sub></a>        |        <a href="https://github.com/lloydchang"><img src="https://avatars.githubusercontent.com/u/1329685?v=4" width="100" height="100" alt="lloydchang"/><br /><sub><b>lloydchang</b></sub></a>        |        <a href="https://github.com/dtrugman"><img src="https://avatars.githubusercontent.com/u/2451669?v=4" width="100" height="100" alt="dtrugman"/><br /><sub><b>dtrugman</b></sub></a>         |                    <a href="https://github.com/Szpadel"><img src="https://avatars.githubusercontent.com/u/1857251?v=4" width="100" height="100" alt="Szpadel"/><br /><sub><b>Szpadel</b></sub></a>                    |
|         <a href="https://github.com/chrarnoldus"><img src="https://avatars.githubusercontent.com/u/12196001?v=4" width="100" height="100" alt="chrarnoldus"/><br /><sub><b>chrarnoldus</b></sub></a>         | <a href="https://github.com/diarmidmackenzie"><img src="https://avatars.githubusercontent.com/u/16045703?v=4" width="100" height="100" alt="diarmidmackenzie"/><br /><sub><b>diarmidmackenzie</b></sub></a> |               <a href="https://github.com/olweraltuve"><img src="https://avatars.githubusercontent.com/u/39308405?v=4" width="100" height="100" alt="olweraltuve"/><br /><sub><b>olweraltuve</b></sub></a>               |            <a href="https://github.com/psv2522"><img src="https://avatars.githubusercontent.com/u/87223770?v=4" width="100" height="100" alt="psv2522"/><br /><sub><b>psv2522</b></sub></a>            |           <a href="https://github.com/ashktn"><img src="https://avatars.githubusercontent.com/u/6723913?v=4" width="100" height="100" alt="ashktn"/><br /><sub><b>ashktn</b></sub></a>            |                    <a href="https://github.com/franekp"><img src="https://avatars.githubusercontent.com/u/9804230?v=4" width="100" height="100" alt="franekp"/><br /><sub><b>franekp</b></sub></a>                    |
|             <a href="https://github.com/yt3trees"><img src="https://avatars.githubusercontent.com/u/57471763?v=4" width="100" height="100" alt="yt3trees"/><br /><sub><b>yt3trees</b></sub></a>              |            <a href="https://github.com/benzntech"><img src="https://avatars.githubusercontent.com/u/4044180?v=4" width="100" height="100" alt="benzntech"/><br /><sub><b>benzntech</b></sub></a>            |                <a href="https://github.com/axkirillov"><img src="https://avatars.githubusercontent.com/u/32141102?v=4" width="100" height="100" alt="axkirillov"/><br /><sub><b>axkirillov</b></sub></a>                 |       <a href="https://github.com/anton-otee"><img src="https://avatars.githubusercontent.com/u/149477749?v=4" width="100" height="100" alt="anton-otee"/><br /><sub><b>anton-otee</b></sub></a>       |        <a href="https://github.com/bramburn"><img src="https://avatars.githubusercontent.com/u/11090413?v=4" width="100" height="100" alt="bramburn"/><br /><sub><b>bramburn</b></sub></a>        |               <a href="https://github.com/olearycrew"><img src="https://avatars.githubusercontent.com/u/6044920?v=4" width="100" height="100" alt="olearycrew"/><br /><sub><b>olearycrew</b></sub></a>                |
|              <a href="https://github.com/snoyiatk"><img src="https://avatars.githubusercontent.com/u/3056569?v=4" width="100" height="100" alt="snoyiatk"/><br /><sub><b>snoyiatk</b></sub></a>              |      <a href="https://github.com/GitlyHallows"><img src="https://avatars.githubusercontent.com/u/136527758?v=4" width="100" height="100" alt="GitlyHallows"/><br /><sub><b>GitlyHallows</b></sub></a>       |                      <a href="https://github.com/jcbdev"><img src="https://avatars.githubusercontent.com/u/17152092?v=4" width="100" height="100" alt="jcbdev"/><br /><sub><b>jcbdev</b></sub></a>                       | <a href="https://github.com/Chenjiayuan195"><img src="https://avatars.githubusercontent.com/u/30591313?v=4" width="100" height="100" alt="Chenjiayuan195"/><br /><sub><b>Chenjiayuan195</b></sub></a>  |        <a href="https://github.com/julionav"><img src="https://avatars.githubusercontent.com/u/45607850?v=4" width="100" height="100" alt="julionav"/><br /><sub><b>julionav</b></sub></a>        |               <a href="https://github.com/SplittyDev"><img src="https://avatars.githubusercontent.com/u/4216049?v=4" width="100" height="100" alt="SplittyDev"/><br /><sub><b>SplittyDev</b></sub></a>                |
|                       <a href="https://github.com/mdp"><img src="https://avatars.githubusercontent.com/u/2868?v=4" width="100" height="100" alt="mdp"/><br /><sub><b>mdp</b></sub></a>                       |                <a href="https://github.com/napter"><img src="https://avatars.githubusercontent.com/u/6260841?v=4" width="100" height="100" alt="napter"/><br /><sub><b>napter</b></sub></a>                 |                           <a href="https://github.com/ross"><img src="https://avatars.githubusercontent.com/u/12789?v=4" width="100" height="100" alt="ross"/><br /><sub><b>ross</b></sub></a>                           |           <a href="https://github.com/philfung"><img src="https://avatars.githubusercontent.com/u/1054593?v=4" width="100" height="100" alt="philfung"/><br /><sub><b>philfung</b></sub></a>           |         <a href="https://github.com/dairui1"><img src="https://avatars.githubusercontent.com/u/183250644?v=4" width="100" height="100" alt="dairui1"/><br /><sub><b>dairui1</b></sub></a>         |                    <a href="https://github.com/dqroid"><img src="https://avatars.githubusercontent.com/u/192424994?v=4" width="100" height="100" alt="dqroid"/><br /><sub><b>dqroid</b></sub></a>                     |
|            <a href="https://github.com/forestyoo"><img src="https://avatars.githubusercontent.com/u/2929056?v=4" width="100" height="100" alt="forestyoo"/><br /><sub><b>forestyoo</b></sub></a>             |          <a href="https://github.com/GOODBOY008"><img src="https://avatars.githubusercontent.com/u/13617900?v=4" width="100" height="100" alt="GOODBOY008"/><br /><sub><b>GOODBOY008</b></sub></a>          |                     <a href="https://github.com/hatsu38"><img src="https://avatars.githubusercontent.com/u/16137809?v=4" width="100" height="100" alt="hatsu38"/><br /><sub><b>hatsu38</b></sub></a>                     |            <a href="https://github.com/hongzio"><img src="https://avatars.githubusercontent.com/u/11085613?v=4" width="100" height="100" alt="hongzio"/><br /><sub><b>hongzio</b></sub></a>            |           <a href="https://github.com/im47cn"><img src="https://avatars.githubusercontent.com/u/67424112?v=4" width="100" height="100" alt="im47cn"/><br /><sub><b>im47cn</b></sub></a>           |                  <a href="https://github.com/shoopapa"><img src="https://avatars.githubusercontent.com/u/45986634?v=4" width="100" height="100" alt="shoopapa"/><br /><sub><b>shoopapa</b></sub></a>                  |
|                <a href="https://github.com/jwcraig"><img src="https://avatars.githubusercontent.com/u/241358?v=4" width="100" height="100" alt="jwcraig"/><br /><sub><b>jwcraig</b></sub></a>                |            <a href="https://github.com/kinandan"><img src="https://avatars.githubusercontent.com/u/186135699?v=4" width="100" height="100" alt="kinandan"/><br /><sub><b>kinandan</b></sub></a>             |                <a href="https://github.com/nevermorec"><img src="https://avatars.githubusercontent.com/u/22953064?v=4" width="100" height="100" alt="nevermorec"/><br /><sub><b>nevermorec</b></sub></a>                 |            <a href="https://github.com/bannzai"><img src="https://avatars.githubusercontent.com/u/10897361?v=4" width="100" height="100" alt="bannzai"/><br /><sub><b>bannzai</b></sub></a>            |              <a href="https://github.com/axmo"><img src="https://avatars.githubusercontent.com/u/2386344?v=4" width="100" height="100" alt="axmo"/><br /><sub><b>axmo</b></sub></a>               |                   <a href="https://github.com/asychin"><img src="https://avatars.githubusercontent.com/u/178776568?v=4" width="100" height="100" alt="asychin"/><br /><sub><b>asychin</b></sub></a>                   |
|              <a href="https://github.com/amittell"><img src="https://avatars.githubusercontent.com/u/1388680?v=4" width="100" height="100" alt="amittell"/><br /><sub><b>amittell</b></sub></a>              | <a href="https://github.com/Yoshino-Yukitaro"><img src="https://avatars.githubusercontent.com/u/67864326?v=4" width="100" height="100" alt="Yoshino-Yukitaro"/><br /><sub><b>Yoshino-Yukitaro</b></sub></a> |                <a href="https://github.com/Yikai-Liao"><img src="https://avatars.githubusercontent.com/u/110762732?v=4" width="100" height="100" alt="Yikai-Liao"/><br /><sub><b>Yikai-Liao</b></sub></a>                |                <a href="https://github.com/zxdvd"><img src="https://avatars.githubusercontent.com/u/107175?v=4" width="100" height="100" alt="zxdvd"/><br /><sub><b>zxdvd</b></sub></a>                |      <a href="https://github.com/vladstudio"><img src="https://avatars.githubusercontent.com/u/914320?v=4" width="100" height="100" alt="vladstudio"/><br /><sub><b>vladstudio</b></sub></a>      |                  <a href="https://github.com/tmsjngx0"><img src="https://avatars.githubusercontent.com/u/40481136?v=4" width="100" height="100" alt="tmsjngx0"/><br /><sub><b>tmsjngx0</b></sub></a>                  |
|                  <a href="https://github.com/tgfjt"><img src="https://avatars.githubusercontent.com/u/2628239?v=4" width="100" height="100" alt="tgfjt"/><br /><sub><b>tgfjt</b></sub></a>                   |     <a href="https://github.com/PretzelVector"><img src="https://avatars.githubusercontent.com/u/95664360?v=4" width="100" height="100" alt="PretzelVector"/><br /><sub><b>PretzelVector</b></sub></a>      |                   <a href="https://github.com/zetaloop"><img src="https://avatars.githubusercontent.com/u/36418285?v=4" width="100" height="100" alt="zetaloop"/><br /><sub><b>zetaloop</b></sub></a>                    |            <a href="https://github.com/cdlliuy"><img src="https://avatars.githubusercontent.com/u/17263036?v=4" width="100" height="100" alt="cdlliuy"/><br /><sub><b>cdlliuy</b></sub></a>            |     <a href="https://github.com/user202729"><img src="https://avatars.githubusercontent.com/u/25191436?v=4" width="100" height="100" alt="user202729"/><br /><sub><b>user202729</b></sub></a>     |            <a href="https://github.com/student20880"><img src="https://avatars.githubusercontent.com/u/74263488?v=4" width="100" height="100" alt="student20880"/><br /><sub><b>student20880</b></sub></a>            |
|       <a href="https://github.com/shohei-ihaya"><img src="https://avatars.githubusercontent.com/u/25131938?v=4" width="100" height="100" alt="shohei-ihaya"/><br /><sub><b>shohei-ihaya</b></sub></a>        |                <a href="https://github.com/shaybc"><img src="https://avatars.githubusercontent.com/u/8535905?v=4" width="100" height="100" alt="shaybc"/><br /><sub><b>shaybc</b></sub></a>                 |                   <a href="https://github.com/seedlord"><img src="https://avatars.githubusercontent.com/u/20932878?v=4" width="100" height="100" alt="seedlord"/><br /><sub><b>seedlord</b></sub></a>                    |    <a href="https://github.com/samir-nimbly"><img src="https://avatars.githubusercontent.com/u/112695483?v=4" width="100" height="100" alt="samir-nimbly"/><br /><sub><b>samir-nimbly</b></sub></a>    | <a href="https://github.com/robertheadley"><img src="https://avatars.githubusercontent.com/u/1780455?v=4" width="100" height="100" alt="robertheadley"/><br /><sub><b>robertheadley</b></sub></a> |            <a href="https://github.com/refactorthis"><img src="https://avatars.githubusercontent.com/u/3012240?v=4" width="100" height="100" alt="refactorthis"/><br /><sub><b>refactorthis</b></sub></a>             |
|        <a href="https://github.com/qingyuan1109"><img src="https://avatars.githubusercontent.com/u/841732?v=4" width="100" height="100" alt="qingyuan1109"/><br /><sub><b>qingyuan1109</b></sub></a>         |              <a href="https://github.com/pokutuna"><img src="https://avatars.githubusercontent.com/u/57545?v=4" width="100" height="100" alt="pokutuna"/><br /><sub><b>pokutuna</b></sub></a>               |                <a href="https://github.com/philipnext"><img src="https://avatars.githubusercontent.com/u/81944499?v=4" width="100" height="100" alt="philipnext"/><br /><sub><b>philipnext</b></sub></a>                 |      <a href="https://github.com/village-way"><img src="https://avatars.githubusercontent.com/u/11625846?v=4" width="100" height="100" alt="village-way"/><br /><sub><b>village-way</b></sub></a>      |        <a href="https://github.com/oprstchn"><img src="https://avatars.githubusercontent.com/u/16177972?v=4" width="100" height="100" alt="oprstchn"/><br /><sub><b>oprstchn</b></sub></a>        |                    <a href="https://github.com/nobu007"><img src="https://avatars.githubusercontent.com/u/8529529?v=4" width="100" height="100" alt="nobu007"/><br /><sub><b>nobu007</b></sub></a>                    |
|             <a href="https://github.com/mosleyit"><img src="https://avatars.githubusercontent.com/u/189396442?v=4" width="100" height="100" alt="mosleyit"/><br /><sub><b>mosleyit</b></sub></a>             |        <a href="https://github.com/moqimoqidea"><img src="https://avatars.githubusercontent.com/u/39821951?v=4" width="100" height="100" alt="moqimoqidea"/><br /><sub><b>moqimoqidea</b></sub></a>         |                     <a href="https://github.com/mlopezr"><img src="https://avatars.githubusercontent.com/u/8202027?v=4" width="100" height="100" alt="mlopezr"/><br /><sub><b>mlopezr</b></sub></a>                      |               <a href="https://github.com/mecab"><img src="https://avatars.githubusercontent.com/u/1580772?v=4" width="100" height="100" alt="mecab"/><br /><sub><b>mecab</b></sub></a>                |              <a href="https://github.com/olup"><img src="https://avatars.githubusercontent.com/u/13785588?v=4" width="100" height="100" alt="olup"/><br /><sub><b>olup</b></sub></a>              |              <a href="https://github.com/lightrabbit"><img src="https://avatars.githubusercontent.com/u/1521765?v=4" width="100" height="100" alt="lightrabbit"/><br /><sub><b>lightrabbit</b></sub></a>              |
|                  <a href="https://github.com/kohii"><img src="https://avatars.githubusercontent.com/u/6891780?v=4" width="100" height="100" alt="kohii"/><br /><sub><b>kohii</b></sub></a>                   |               <a href="https://github.com/linegel"><img src="https://avatars.githubusercontent.com/u/1746296?v=4" width="100" height="100" alt="linegel"/><br /><sub><b>linegel</b></sub></a>               | <a href="https://github.com/edwin-truthsearch-io"><img src="https://avatars.githubusercontent.com/u/211044285?v=4" width="100" height="100" alt="edwin-truthsearch-io"/><br /><sub><b>edwin-truthsearch-io</b></sub></a> |    <a href="https://github.com/EamonNerbonne"><img src="https://avatars.githubusercontent.com/u/803518?v=4" width="100" height="100" alt="EamonNerbonne"/><br /><sub><b>EamonNerbonne</b></sub></a>    |       <a href="https://github.com/dbasclpy"><img src="https://avatars.githubusercontent.com/u/139889137?v=4" width="100" height="100" alt="dbasclpy"/><br /><sub><b>dbasclpy</b></sub></a>        |                <a href="https://github.com/dflatline"><img src="https://avatars.githubusercontent.com/u/60121893?v=4" width="100" height="100" alt="dflatline"/><br /><sub><b>dflatline</b></sub></a>                 |
|               <a href="https://github.com/Deon588"><img src="https://avatars.githubusercontent.com/u/12716437?v=4" width="100" height="100" alt="Deon588"/><br /><sub><b>Deon588</b></sub></a>               |                  <a href="https://github.com/dleen"><img src="https://avatars.githubusercontent.com/u/1297964?v=4" width="100" height="100" alt="dleen"/><br /><sub><b>dleen</b></sub></a>                  |                   <a href="https://github.com/devxpain"><img src="https://avatars.githubusercontent.com/u/170700110?v=4" width="100" height="100" alt="devxpain"/><br /><sub><b>devxpain</b></sub></a>                   |         <a href="https://github.com/chadgauth"><img src="https://avatars.githubusercontent.com/u/2413356?v=4" width="100" height="100" alt="chadgauth"/><br /><sub><b>chadgauth</b></sub></a>          |   <a href="https://github.com/brunobergher"><img src="https://avatars.githubusercontent.com/u/328388?v=4" width="100" height="100" alt="brunobergher"/><br /><sub><b>brunobergher</b></sub></a>   |             <a href="https://github.com/thecolorblue"><img src="https://avatars.githubusercontent.com/u/13137?v=4" width="100" height="100" alt="thecolorblue"/><br /><sub><b>thecolorblue</b></sub></a>              |
|           <a href="https://github.com/bogdan0083"><img src="https://avatars.githubusercontent.com/u/7077307?v=4" width="100" height="100" alt="bogdan0083"/><br /><sub><b>bogdan0083</b></sub></a>           |              <a href="https://github.com/Atlogit"><img src="https://avatars.githubusercontent.com/u/86947554?v=4" width="100" height="100" alt="Atlogit"/><br /><sub><b>Atlogit</b></sub></a>               |                  <a href="https://github.com/atlasgong"><img src="https://avatars.githubusercontent.com/u/68199735?v=4" width="100" height="100" alt="atlasgong"/><br /><sub><b>atlasgong</b></sub></a>                  | <a href="https://github.com/andreastempsch"><img src="https://avatars.githubusercontent.com/u/117991125?v=4" width="100" height="100" alt="andreastempsch"/><br /><sub><b>andreastempsch</b></sub></a> |         <a href="https://github.com/alasano"><img src="https://avatars.githubusercontent.com/u/14372930?v=4" width="100" height="100" alt="alasano"/><br /><sub><b>alasano</b></sub></a>          |               <a href="https://github.com/QuinsZouls"><img src="https://avatars.githubusercontent.com/u/40646096?v=4" width="100" height="100" alt="QuinsZouls"/><br /><sub><b>QuinsZouls</b></sub></a>               |
|     <a href="https://github.com/HadesArchitect"><img src="https://avatars.githubusercontent.com/u/1742301?v=4" width="100" height="100" alt="HadesArchitect"/><br /><sub><b>HadesArchitect</b></sub></a>     |                <a href="https://github.com/alarno"><img src="https://avatars.githubusercontent.com/u/4355547?v=4" width="100" height="100" alt="alarno"/><br /><sub><b>alarno</b></sub></a>                 |                     <a href="https://github.com/nexon33"><img src="https://avatars.githubusercontent.com/u/47557266?v=4" width="100" height="100" alt="nexon33"/><br /><sub><b>nexon33</b></sub></a>                     |       <a href="https://github.com/adilhafeez"><img src="https://avatars.githubusercontent.com/u/13196462?v=4" width="100" height="100" alt="adilhafeez"/><br /><sub><b>adilhafeez</b></sub></a>        |    <a href="https://github.com/adamwlarson"><img src="https://avatars.githubusercontent.com/u/1392315?v=4" width="100" height="100" alt="adamwlarson"/><br /><sub><b>adamwlarson</b></sub></a>    |                   <a href="https://github.com/adamhill"><img src="https://avatars.githubusercontent.com/u/188638?v=4" width="100" height="100" alt="adamhill"/><br /><sub><b>adamhill</b></sub></a>                   |
|               <a href="https://github.com/AMHesch"><img src="https://avatars.githubusercontent.com/u/4777192?v=4" width="100" height="100" alt="AMHesch"/><br /><sub><b>AMHesch</b></sub></a>                |       <a href="https://github.com/maekawataiki"><img src="https://avatars.githubusercontent.com/u/26317009?v=4" width="100" height="100" alt="maekawataiki"/><br /><sub><b>maekawataiki</b></sub></a>       |       <a href="https://github.com/AlexandruSmirnov"><img src="https://avatars.githubusercontent.com/u/210187997?v=4" width="100" height="100" alt="AlexandruSmirnov"/><br /><sub><b>AlexandruSmirnov</b></sub></a>       |     <a href="https://github.com/samsilveira"><img src="https://avatars.githubusercontent.com/u/109295696?v=4" width="100" height="100" alt="samsilveira"/><br /><sub><b>samsilveira</b></sub></a>      |          <a href="https://github.com/01Rian"><img src="https://avatars.githubusercontent.com/u/109045233?v=4" width="100" height="100" alt="01Rian"/><br /><sub><b>01Rian</b></sub></a>           |                          <a href="https://github.com/RSO"><img src="https://avatars.githubusercontent.com/u/139663?v=4" width="100" height="100" alt="RSO"/><br /><sub><b>RSO</b></sub></a>                           |
| <a href="https://github.com/SECKainersdorfer"><img src="https://avatars.githubusercontent.com/u/155164204?v=4" width="100" height="100" alt="SECKainersdorfer"/><br /><sub><b>SECKainersdorfer</b></sub></a> |                  <a href="https://github.com/R-omk"><img src="https://avatars.githubusercontent.com/u/1633879?v=4" width="100" height="100" alt="R-omk"/><br /><sub><b>R-omk</b></sub></a>                  |                        <a href="https://github.com/Sarke"><img src="https://avatars.githubusercontent.com/u/2719310?v=4" width="100" height="100" alt="Sarke"/><br /><sub><b>Sarke</b></sub></a>                         |             <a href="https://github.com/kvokka"><img src="https://avatars.githubusercontent.com/u/15954013?v=4" width="100" height="100" alt="kvokka"/><br /><sub><b>kvokka</b></sub></a>              |          <a href="https://github.com/ecmasx"><img src="https://avatars.githubusercontent.com/u/135958728?v=4" width="100" height="100" alt="ecmasx"/><br /><sub><b>ecmasx</b></sub></a>           |                     <a href="https://github.com/mollux"><img src="https://avatars.githubusercontent.com/u/3983285?v=4" width="100" height="100" alt="mollux"/><br /><sub><b>mollux</b></sub></a>                      |
|       <a href="https://github.com/marvijo-code"><img src="https://avatars.githubusercontent.com/u/82562019?v=4" width="100" height="100" alt="marvijo-code"/><br /><sub><b>marvijo-code</b></sub></a>        |      <a href="https://github.com/mamertofabian"><img src="https://avatars.githubusercontent.com/u/7698436?v=4" width="100" height="100" alt="mamertofabian"/><br /><sub><b>mamertofabian</b></sub></a>      |        <a href="https://github.com/monkeyDluffy6017"><img src="https://avatars.githubusercontent.com/u/9354193?v=4" width="100" height="100" alt="monkeyDluffy6017"/><br /><sub><b>monkeyDluffy6017</b></sub></a>        |    <a href="https://github.com/libertyteeth"><img src="https://avatars.githubusercontent.com/u/32841567?v=4" width="100" height="100" alt="libertyteeth"/><br /><sub><b>libertyteeth</b></sub></a>     |           <a href="https://github.com/shtse8"><img src="https://avatars.githubusercontent.com/u/8020099?v=4" width="100" height="100" alt="shtse8"/><br /><sub><b>shtse8</b></sub></a>            |                <a href="https://github.com/Rexarrior"><img src="https://avatars.githubusercontent.com/u/25753287?v=4" width="100" height="100" alt="Rexarrior"/><br /><sub><b>Rexarrior</b></sub></a>                 |
|         <a href="https://github.com/KanTakahiro"><img src="https://avatars.githubusercontent.com/u/64513424?v=4" width="100" height="100" alt="KanTakahiro"/><br /><sub><b>KanTakahiro</b></sub></a>         |                    <a href="https://github.com/ksze"><img src="https://avatars.githubusercontent.com/u/381556?v=4" width="100" height="100" alt="ksze"/><br /><sub><b>ksze</b></sub></a>                    |                      <a href="https://github.com/Jdo300"><img src="https://avatars.githubusercontent.com/u/67338327?v=4" width="100" height="100" alt="Jdo300"/><br /><sub><b>Jdo300</b></sub></a>                       |              <a href="https://github.com/hesara"><img src="https://avatars.githubusercontent.com/u/1335918?v=4" width="100" height="100" alt="hesara"/><br /><sub><b>hesara</b></sub></a>              |      <a href="https://github.com/DeXtroTip"><img src="https://avatars.githubusercontent.com/u/21011087?v=4" width="100" height="100" alt="DeXtroTip"/><br /><sub><b>DeXtroTip</b></sub></a>       |                       <a href="https://github.com/pfitz"><img src="https://avatars.githubusercontent.com/u/3062911?v=4" width="100" height="100" alt="pfitz"/><br /><sub><b>pfitz</b></sub></a>                       |
|   <a href="https://github.com/celestial-vault"><img src="https://avatars.githubusercontent.com/u/58194240?v=4" width="100" height="100" alt="celestial-vault"/><br /><sub><b>celestial-vault</b></sub></a>   |                                                                                                                                                                                                             |                                                                                                                                                                                                                          |                                                                                                                                                                                                        |                                                                                                                                                                                                   |                                                                                                                                                                                                                       |

<!-- END CONTRIBUTORS SECTION -->

## 许可证

[Apache 2.0 © 2025 Roo Code, Inc.](./LICENSE)

---

**享受Roo Code！** 无论是让它紧随你的指令还是自由探索，我们都迫不及待想看看你会创造出什么。如果你有任何疑问或功能建议，请光临我们的[Reddit社区](https://www.reddit.com/r/RooCode/)或[Discord](https://discord.gg/roocode)。编程愉快！
