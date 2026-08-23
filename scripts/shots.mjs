import { chromium } from 'playwright-core';
import fs from 'node:fs';

const exePaths = [
  process.env.LOCALAPPDATA + '\\Google\\Chrome\\Application\\chrome.exe',
  process.env['ProgramFiles'] + '\\Google\\Chrome\\Application\\chrome.exe',
  process.env['ProgramFiles(x86)'] + '\\Google\\Chrome\\Application\\chrome.exe',
];
const executablePath = exePaths.find((p) => p && fs.existsSync(p));
if (!executablePath) {
  console.error('no chrome found');
  process.exit(1);
}

fs.mkdirSync('shots', { recursive: true });
const browser = await chromium.launch({
  executablePath,
  headless: true,
  args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--disable-gpu-sandbox'],
});
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });

page.on('console', (m) => {
  if (m.type() === 'error') console.log('PAGE ERR:', m.text().slice(0, 200));
});

await page.goto('http://localhost:4173/', { waitUntil: 'load' });
await page.waitForTimeout(1500);
await page.screenshot({ path: 'shots/01-title.png' });

await page.mouse.click(640, 400);
await page.waitForTimeout(1200);
await page.keyboard.down('KeyW');
await page.waitForTimeout(2500);
await page.keyboard.up('KeyW');
await page.keyboard.down('KeyC');
await page.keyboard.down('KeyW');
await page.waitForTimeout(3500);
await page.keyboard.up('KeyW');
await page.keyboard.up('KeyC');
await page.screenshot({ path: 'shots/02-approach.png' });

await page.keyboard.down('KeyD');
await page.waitForTimeout(2600);
await page.keyboard.up('KeyD');
await page.screenshot({ path: 'shots/03-corridor.png' });

await browser.close();
console.log('shots done');
