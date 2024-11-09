import { promises as fs } from "node:fs";
import path from "node:path";

// 假设 i18next.languages 是如下数组（替换为你的实际语言列表）
const i18next = {
  languages: ["zh", "ko"] // 替换为你的语言
};

// 定义 src/pages 目录路径
const pagesDir = path.join(process.cwd(), "src/pages");

// 递归遍历目录中的所有 .astro 文件并修改语言
async function processAstroFilesInDir(dir, lang) {
  const items = await fs.readdir(dir, { withFileTypes: true });

  for (const item of items) {
    const itemPath = path.join(dir, item.name);

    if (item.isDirectory()) {
      // 如果是文件夹，则递归调用自身
      await processAstroFilesInDir(itemPath, lang);
    } else if (item.isFile() && path.extname(item.name) === ".astro") {
      // 如果是 .astro 文件，则读取并替换内容
      let content = await fs.readFile(itemPath, "utf-8");

      // 查找并替换 `export const lang = "en";`
      const regex = /export\s+const\s+lang\s+=\s+"en";/;
      if (regex.test(content)) {
        content = content.replace(regex, `export const lang = "${lang}";`);
        await fs.writeFile(itemPath, content, "utf-8");
        console.log(`Updated language in file: ${itemPath}`);
      }
    }
  }
}

async function updateLanguageInFiles() {
  for (let i = 0; i < i18next.languages.length; ++i) {
    const lang = i18next.languages[i];
    const langDir = path.join(pagesDir, lang);

    try {
      // 检查语言目录是否存在
      const langDirStats = await fs.stat(langDir);
      if (!langDirStats.isDirectory()) continue;

      console.log(`Processing language folder: ${lang}`);

      // 调用递归函数处理语言目录中的所有 .astro 文件
      await processAstroFilesInDir(langDir, lang);
    } catch (error) {
      console.error(`Error processing folder ${langDir}:`, error);
    }
  }
}

// 使用立即调用的异步函数运行主逻辑
(async () => {
  await updateLanguageInFiles();
})();