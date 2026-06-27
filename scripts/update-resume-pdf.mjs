import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { PDFArray, PDFDocument, PDFName, PDFString, StandardFonts, rgb } from 'pdf-lib';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const pdfPath = join(root, 'public/Curriculo_Vitor_Melo.pdf');

const EMAIL = 'vmsvitordev@gmail.com';
const WEBSITE = 'vmsvitor.code-byte.com';
const WEBSITE_URL = 'https://vmsvitor.code-byte.com/';

const bytes = readFileSync(pdfPath);
const pdfDoc = await PDFDocument.load(bytes);
const page = pdfDoc.getPages()[0];
const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
const fontSize = 9.5;
const textColor = rgb(0.17, 0.24, 0.31);
const coverColor = rgb(1, 1, 1);

function coverText(x, y, width, height) {
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
      Rect: [x, y, x + width, y + height],
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

coverText(105, 117, 102, 12);
drawLabel(EMAIL, 107.2, 120.1);
addLink(107.2, 115, font.widthOfTextAtSize(EMAIL, fontSize), 12, `mailto:${EMAIL}`);

coverText(368, 117, 120, 12);
drawLabel(WEBSITE, 370.5, 120.1);
addLink(370.5, 115, font.widthOfTextAtSize(WEBSITE, fontSize), 12, WEBSITE_URL);

writeFileSync(pdfPath, await pdfDoc.save());
console.log(`Updated ${pdfPath}`);
