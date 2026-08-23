import fs from 'node:fs';
for (const f of ['patch5.mjs','patch6.mjs','patch7.mjs','patch8.mjs','patch9.mjs','patch-preds.mjs','patch2.mjs','patch3.mjs','patch4.mjs']) {
  try { fs.unlinkSync('scripts/' + f); console.log('rm', f); } catch {}
}
