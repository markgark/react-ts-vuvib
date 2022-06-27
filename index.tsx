import React, { Component } from 'react';
import { render } from 'react-dom';
import Hello from './Hello';
import './style.css';
import { saveAs } from 'file-saver';
import {
  Document,
  ImageRun,
  Packer,
  Paragraph,
  Header,
  Footer,
  Table,
  TableCell,
  TableRow,
  VerticalAlign,
  WidthType,
} from 'docx';
import { Footer, Header } from 'docx/build/file/header';
import { TableRow } from 'docx/build/file/TableRow';
import { TableCell } from 'docx/build/file/TableCell';
import ReactFileReader from 'react-file-reader';

interface AppProps {}
interface AppState {
  name: string;
}

class App extends Component<AppProps, AppState> {
  constructor(props) {
    super(props);
    this.state = {
      name: 'VUVib',
    };
  }

  onFileChange = (e) => {
    const archivoTexto = e.target.files[0];
    var file = new FileReader();
    console.log(file);
    file.onload = (e) => {
      console.log(file.result);
    };
    file.readAsText(archivoTexto);
  };

  async generateFromUrl() {
    const blob = await fetch(
      'https://raw.githubusercontent.com/dolanmiu/docx/master/demo/images/cat.jpg'
    ).then((r) => r.blob());

    const texto = 'CONSIDERANDO: Que ..... RESUELVE';
    const articulo1 =
      'Artículo 1.- Otorgar a [NOMBRE DEL SOLICITANTE] la autorización para desarrollar la investigación [TÍTULO DEL PROYECTO] por el plazo de [PLAZO DEL PROYECTO].';
    const disposiciones = 'DISPOSICONES FINALES';
    const nombre = 'NOMBRE';
    const cargo = 'CARGO';
    const sumilla = 'Acción Nombre y Apellido Sumilla o firma Fecha';
    const elaboradopor = 'Elaborado por';
    const revisadopor = 'Elaborado por';
    const aprobadopor = 'Elaborado por';
    const myTexto = 'HOLA A TODOS';

    const archivoTexto = (event) => {
      var file = new FileReader();
      console.log(file);
      file.onload = (e) => {
        console.log(file.result);
      };
      file.readAsText(archivoTexto);
    };

    const doc = new Document({
      sections: [
        {
          headers: {
            default: new Header({
              children: [
                new Table({
                  rows: [
                    new TableRow({
                      children: [
                        new TableCell({
                          //verticalAlign: VerticalAlign.LEFT,
                          //width: { size: 150 }, //, type: WidthType.PERCENTAGE },
                          children: [
                            // new Paragraph({
                            //   children: [
                            //     new ImageRun({
                            //       data: blob,
                            //       transformation: {
                            //         width: 100,
                            //         height: 100,
                            //       },
                            //     }),
                            //   ],
                            // }),
                            new Paragraph('Aqui va el escudo nacional'),
                          ],
                          //children: [new Paragraph("Aqui va el escudo nacional")],
                        }),
                        new TableCell({
                          //verticalAlign: VerticalAlign.RIGHT,
                          //width: { size: 150 }, //, type: WidthType.PERCENTAGE },
                          children: [
                            // new Paragraph({
                            //   children: [
                            //     new ImageRun({
                            //       data: blob,
                            //       transformation: {
                            //         width: 100,
                            //         height: 100,
                            //       },
                            //     }),
                            //   ],
                            // }),
                            new Paragraph('Aqui va el logo de senescyt'),
                          ],
                          //children: [new Paragraph("Aquí va el logo de senescyt")],
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          },
          footers: {
            default: new Footer({
              children: [
                new Paragraph(
                  'Dirección: Edificio Matriz: Alpallana E7-183 entre Av. Diego de Almagro y Whymper'
                ),
                new Paragraph('Código Postal: 170518 / Quito - Ecuador'),
                new Paragraph('Teléfono: 593-2 3934-300'),
              ],
            }),
          },
          children: [
            new Paragraph(''),
            new Paragraph(''),
            new Paragraph(''),
            new Paragraph(archivoTexto),
            new Paragraph(''),
            new Paragraph(''),
            new Paragraph(articulo1),
            new Paragraph(''),
            new Paragraph(''),
            new Paragraph(disposiciones),
            new Paragraph(''),
            new Paragraph(''),
            new Paragraph(nombre),
            new Paragraph(''),
            new Paragraph(''),
            new Paragraph(cargo),
            new Paragraph(''),
            new Paragraph(''),
            new Paragraph(sumilla),
            new Paragraph(''),
            new Paragraph(''),
            new Paragraph(elaboradopor),
            new Paragraph(''),
            new Paragraph(''),
            new Paragraph(revisadopor),
            new Paragraph(''),
            new Paragraph(''),
            new Paragraph(aprobadopor),

            // new Paragraph({
            //   children: [
            //     new ImageRun({
            //       data: blob,
            //       transformation: {
            //         width: 100,
            //         height: 100
            //       }
            //     })
            //   ]
            // })
          ],
        },
      ],
    });

    Packer.toBlob(doc).then((blob) => {
      console.log(blob);
      saveAs(blob, 'example.docx');
      console.log('Documento creado exitosamente');
    });

    function tablaDatos(props) {
      const table = new Table({
        rows: [
          new TableRow({
            children: [
              new TableCell({
                children: [new Paragraph(props.cabeceradepagina)],
              }),
              new TableCell({
                children: [],
              }),
            ],
          }),
          new TableRow({
            children: [
              new TableCell({
                children: [],
              }),
              new TableCell({
                children: [new Paragraph(props.piedepagina)],
              }),
            ],
          }),
        ],
      });

      return;
    }
  }

  render() {
    return (
      <div>
        <Hello name={this.state.name} />
        <p>
          {/* <button onClick={this.generate}>
            Generate doc with base64 image!
          </button> */}

          <form>
            <p>Subir archivo :</p>
            <input onChange={this.onFileChange} type="file" />
          </form>

          {/* <form>
            <p>Subir imagen</p>
            <input type="file" id="image" onChange={this.onImageChange}accept=".png, .jpg, .jpeg'"/>
            <img src={img} alt="" />
          </form> */}

          <button onClick={this.generateFromUrl}>Generar documento</button>
        </p>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
