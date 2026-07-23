from pathlib import Path
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4, landscape
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import mm
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.lib.enums import TA_CENTER
from xml.sax.saxutils import escape

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / 'modulo-react-usuarios' / 'src' / 'App.jsx'
OUTPUT_DIR = ROOT / 'output' / 'pdf'
OUTPUT = OUTPUT_DIR / 'CODIGO_JSX_COMENTADO_AA3_EV01.pdf'


def explanation(line):
    """Obtiene el comentario incluido en cada linea del componente JSX."""
    if '//' in line:
        return line.split('//', 1)[1].strip()
    if '{/*' in line and '*/}' in line:
        return line.split('{/*', 1)[1].split('*/}', 1)[0].strip()
    if not line.strip():
        return 'Linea en blanco que separa bloques logicos del componente.'
    return 'Instruccion que forma parte de la estructura del componente React.'


def code_paragraph(number, line, style):
    safe_line = escape(line.replace('\t', '  ')) or ' '
    return Paragraph(f'<font color="#2563EB">{number:03}</font>  {safe_line}', style)


def footer(canvas, document):
    canvas.saveState()
    canvas.setStrokeColor(colors.HexColor('#BFDBFE'))
    canvas.line(18 * mm, 12 * mm, 279 * mm, 12 * mm)
    canvas.setFillColor(colors.HexColor('#475569'))
    canvas.setFont('Helvetica', 8)
    canvas.drawString(18 * mm, 7 * mm, 'Finflow - Evidencia GA7-220501096-AA3-EV01')
    canvas.drawRightString(279 * mm, 7 * mm, f'Pagina {document.page}')
    canvas.restoreState()


def main():
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    styles = getSampleStyleSheet()
    title = ParagraphStyle('TitleCustom', parent=styles['Title'], fontName='Helvetica-Bold', fontSize=20, leading=24, textColor=colors.HexColor('#1D4ED8'), alignment=TA_CENTER)
    subtitle = ParagraphStyle('Subtitle', parent=styles['Normal'], fontSize=10, leading=14, textColor=colors.HexColor('#475569'), alignment=TA_CENTER)
    heading = ParagraphStyle('HeadingCustom', parent=styles['Heading2'], fontSize=12, leading=16, textColor=colors.HexColor('#1E3A8A'))
    body = ParagraphStyle('BodyCustom', parent=styles['BodyText'], fontSize=9, leading=12)
    code = ParagraphStyle('Code', parent=styles['Code'], fontName='Courier', fontSize=6.4, leading=8, wordWrap='CJK')
    note = ParagraphStyle('Note', parent=styles['BodyText'], fontSize=7.2, leading=9, textColor=colors.HexColor('#334155'), wordWrap='CJK')

    document = SimpleDocTemplate(str(OUTPUT), pagesize=landscape(A4), leftMargin=18 * mm, rightMargin=18 * mm, topMargin=15 * mm, bottomMargin=18 * mm)
    story = [
        Paragraph('Codigo JSX comentado - Gestion de usuarios Finflow', title),
        Spacer(1, 3 * mm),
        Paragraph('Evidencia GA7-220501096-AA3-EV01. El lado izquierdo muestra App.jsx y el derecho explica la finalidad de cada linea.', subtitle),
        Spacer(1, 8 * mm),
        Paragraph('Componente React: App.jsx', heading),
        Paragraph('La aplicacion emplea useState para manejar el formulario, la lista de usuarios, la edicion y los mensajes. Los comentarios presentes en el archivo fuente se transcriben a continuacion.', body),
        Spacer(1, 4 * mm)
    ]

    lines = SOURCE.read_text(encoding='utf-8').splitlines()
    rows = [[Paragraph('<b>Linea y codigo JSX</b>', note), Paragraph('<b>Explicacion</b>', note)]]
    for index, line in enumerate(lines, start=1):
        rows.append([code_paragraph(index, line, code), Paragraph(escape(explanation(line)), note)])

    table = Table(rows, colWidths=[171 * mm, 90 * mm], repeatRows=1, splitByRow=1)
    table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#DBEAFE')),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.HexColor('#1E3A8A')),
        ('GRID', (0, 0), (-1, -1), 0.25, colors.HexColor('#CBD5E1')),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('LEFTPADDING', (0, 0), (-1, -1), 4),
        ('RIGHTPADDING', (0, 0), (-1, -1), 4),
        ('TOPPADDING', (0, 0), (-1, -1), 3),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 3),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, colors.HexColor('#F8FAFC')])
    ]))
    story.append(table)
    story.append(PageBreak())
    story.append(Paragraph('Conclusiones tecnicas', heading))
    story.append(Paragraph('El componente cumple las operaciones de registrar, consultar, actualizar y eliminar en la interfaz. Se usa un componente Campo para evitar repetir codigo y una validacion para impedir documentos o correos duplicados. La informacion se conserva en el estado de React mientras la aplicacion esta abierta.', body))
    document.build(story, onFirstPage=footer, onLaterPages=footer)
    print(OUTPUT)


if __name__ == '__main__':
    main()
