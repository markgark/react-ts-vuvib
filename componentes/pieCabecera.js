import {
  Document,
  ImageRun,
  Table,
  TableCell,
  TableRow,
  VerticalAlign,
  AlignmentType,
  WidthType,
  BorderStyle
} from 'docx';
import { Footer, Header } from 'docx/build/file/header';

class pcSenescyt extends React.Component {

  escudo = await fetch(
    'https://cdn.jsdelivr.net/gh/markgark/react-ts-vuvib@main/imagenes/republica-ecuador-escudo.png'
    ).then((r) => r.blob())

  senescyt = await fetch(
    'https://cdn.jsdelivr.net/gh/markgark/react-ts-vuvib@main/imagenes/logo-senescyt.jpeg'
  ).then((r) => r.blob());

  gobiernodetodos = await fetch(
      'https://cdn.jsdelivr.net/gh/markgark/react-ts-vuvib@main/imagenes/gobierno-de-todos.png'
  ).then((r) => r.blob());

  tableHeader = new Table({
    rows: [
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new ImageRun({
                    data: escudo,
                    transformation: {
                      width: 175,
                      height: 94,
                    },
                  }),
                ],
              }),
            ],
            verticalAlign: VerticalAlign.CENTER,
          }),
          new TableCell({
            children: [
              new Paragraph({
                alignment: AlignmentType.END,
                children: [
                  new ImageRun({
                    data: senescyt,
                    transformation: {
                      width: 300,
                      height: 32,
                    },
                  }),
                ],
              }),
            ],
            verticalAlign: VerticalAlign.CENTER,
          }),
        ],
      }),
    ],
    width: {
      size: 100,
      type: WidthType.PERCENTAGE,
    },
    borders: {
      top: {
        style: BorderStyle.NONE,
      },
      bottom: {
        style: BorderStyle.NONE,
      },
      left: {
        style: BorderStyle.NONE,
      },
      right: {
        style: BorderStyle.NONE,
      },
      insideVertical: {
        style: BorderStyle.NONE,
      }
    },
  }),

  render() {
    return <h1>Hello, {this.props.nombre}</h1>;
  }
}