import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { PDFArray, PDFDocument, PDFName, PDFString, StandardFonts, rgb } from 'pdf-lib';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const pdfPath = join(root, 'public/Curriculo_Vitor_Melo.pdf');

const EMAIL = 'vmsvitordev@gmail.com';
const WEBSITE = 'vmsvitor.code-byte.com';
const WEBSITE_URL = 'https://vmsvitor.code-byte.com/';

const OLD_EMAIL = 'vmsvitor20@gmail.com';
const OLD_WEBSITE = 'www.sitebacana.com.br';

async function findTextPositions(data) {
  const doc = await pdfjsLib.getDocument({ data }).promise;
  const page = await doc.getPage(1);
  const content = await page.getTextContent();
  const found = {};

  for (const item of content.items) {
    const text = item.str.trim();
    if (text === OLD_EMAIL || text === OLD_WEBSITE) {
      found[text] = {
        x: item.transform[4],
        y: item.transform[5],
        width: item.width,
        height: item.height,
      };
    }
  }

  return found;
}

const bytes = readFileSync(pdfPath);
const positions = await findTextPositions(new Uint8Array(bytes));

if (!positions[OLD_EMAIL] || !positions[OLD_WEBSITE]) {
  console.error('Texto original não encontrado. Restaure o PDF ou verifique se já foi atualizado.');
  process.exit(1);
}

const pdfDoc = await PDFDocument.load(bytes);
const page = pdfDoc.getPages()[0];
const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
const fontSize = 9.5;
const textColor = rgb(0.17, 0.24, 0.31);
const coverColor = rgb(1, 1, 1);

function coverText({ x, y, width, height }) {
  page.drawRectangle({
    x: x - 1,
    y: y - 2,
    width: width + 2,
    height: height + 4,
    color: coverColor,
    borderWidth: 0,
  });
}

function drawLabel(text, x, y) {
  page.drawText(text, {
    x,
    y,
    size: fontSize,
    font,
    color: textColor,
  });
}

function addLink(x, y, width, height, url) {
  const linkAnnotation = pdfDoc.context.register(
    pdfDoc.context.obj({
      Type: 'Annot',
      Subtype: 'Link',
      Rect: [x, y - 2, x + width, y + height + 2],
      Border: [0, 0, 0],
      A: {
        Type: 'Action',
        S: 'URI',
        URI: PDFString.of(url),
      },
    }),
  );

  const annots = page.node.lookup(PDFName.of('Annots'), PDFArray);
  if (annots) {
    annots.push(linkAnnotation);
  } else {
    page.node.set(PDFName.of('Annots'), pdfDoc.context.obj([linkAnnotation]));
  }
}

const emailPos = positions[OLD_EMAIL];
const sitePos = positions[OLD_WEBSITE];

coverText({ ...emailPos, width: emailPos.width + 4 });
drawLabel(EMAIL, emailPos.x, emailPos.y);
addLink(emailPos.x, emailPos.y, font.widthOfTextAtSize(EMAIL, fontSize), emailPos.height, `mailto:${EMAIL}`);

coverText({ ...sitePos, width: Math.max(sitePos.width + 8, font.widthOfTextAtSize(WEBSITE, fontSize) + 4) });
drawLabel(WEBSITE, sitePos.x, sitePos.y);
addLink(sitePos.x, sitePos.y, font.widthOfTextAtSize(WEBSITE, fontSize), sitePos.height, WEBSITE_URL);

writeFileSync(pdfPath, await pdfDoc.save());
console.log(`Updated ${pdfPath}`);
