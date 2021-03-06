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
  Alignment,
  AlignmentType,
  WidthType,
  BorderStyle,
  TextRun,
  TableBorders
} from 'docx';
//import { Footer, Header } from 'docx/build/file/header';
//import { TableRow } from 'docx/build/file/TableRow';
//import { TableCell } from 'docx/build/file/TableCell';
//import ReactFileReader from 'react-file-reader';
import { useState } from 'react';
import { HorizontalPositionRelativeFrom } from 'docx/build/file/drawing/floating/floating-position';
//import { AlignmentType } from 'docx/build/file/paragraph/formatting/alignment';
import { Align } from 'docx/build/file/drawing/floating/align';
import * as piecab from './componentes/pieCabecera';
import { TextDirection } from 'docx/build/file/table/table-cell/table-cell-components';

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
    console.log("este es el archivo", e.target.files[0]);
    const archivoTexto = e.target.files[0];

    const escudo = fetch(
      'https://cdn.jsdelivr.net/gh/markgark/react-ts-vuvib@main/imagenes/republica-ecuador-escudo.png'
      ).then((r) => r.blob())
    
    const senescyt = fetch(
      'https://cdn.jsdelivr.net/gh/markgark/react-ts-vuvib@main/imagenes/logo-senescyt.jpeg'
    ).then((r) => r.blob());
    
    const gobiernodetodos = fetch(
        'https://cdn.jsdelivr.net/gh/markgark/react-ts-vuvib@main/imagenes/gobierno-de-todos.png'
    ).then((r) => r.blob());

    var myStr = "The main characters in Harry Potter are:" + "\n\t" + "Harry Potter" + "\n" + "Hermione Grainger" + "\n" + "Ronald Weasley" + "\n" + "Neville Longbottom" + "\n";

    var splitStr = myStr.split(/\r?\n/);
    var file = new FileReader();

    file.readAsText(archivoTexto);
    
    file.onload = (e) => {
      const elContenido = file.result;
      let parrafos = splitContenido(elContenido);
      // console.log(parrafos.length);

      // for(let j = 0; j < parrafos.length; j++){ 
      //   console.log(parrafos[j]); 
      // }

      const docword = new Document({
        sections: [
          {
            headers: {
              default: new Header({
                children: [
                  createLogoHeaderSenescyt(),
                ],
              }),
            },
            footers: {
              default: new Footer({
                children: [
                   createLogoFooterSenescyt(),
                ],
              }),
            },
            children: [

            crearParrafoCentrado("RESOLUCI??N No. SENESCYT-SIITT-ABS-20XX???0XX"),
            crearParrafoCentrado("[ NOMBRE DE LA AUTORIDAD ]"),
            crearParrafoCentrado("SUBSECRETAR??A DE INVESTIGACI??N, INNOVACI??N TRANSFERENCIA DE TECNOLOG??A"),
            crearParrafoCentrado("CONSIDERANDO:"),

            new Paragraph(" "),
            ...parrafos
              .map(parrafo => {
                const arr: Paragraph[] = [];
                arr.push(crearParrafo(parrafo));
                return arr;
              })
              .reduce((prev, curr) => prev.concat(curr), []),

              crearParrafoCentrado("RESUELVE:"),
              
              crearParrafo("Art??culo 1.- Otorgar a [NOMBRE DEL SOLICITANTE] la autorizaci??n para desarrollar la investigaci??n [T??TULO DEL PROYECTO] por el plazo de [PLAZO DEL PROYECTO]."),
              
              crearParrafoCentrado("DISPOSICIONES FINALES"),
              
              crearParrafo("Primera.- De la ejecuci??n de la presente Resoluci??n, enc??rguese a la Direcci??n de Investigaci??n Cient??fica de la Secretar??a de Educaci??n Superior, Ciencia, Tecnolog??a e Innovaci??n."),
              
              crearParrafo("Segunda.- La notificaci??n de la presente Resoluci??n ser?? realizada por la Direcci??n de Investigaci??n Cient??fica, de conformidad a lo dispuesto en el Acuerdo Nro. SENESCYT-."),
              
              crearParrafo("Tercera.- La presente Resoluci??n entrar?? en vigencia a partir de su suscripci??n, sin perjuicio de su publicaci??n en el Registro Oficial."),
            
              crearParrafo("Dado en la ciudad de San Francisco de Quito, D.M. a los  xxxx (xx) d??as del mes de xxxxxx de 20xx."), 
              
              crearParrafo("Comun??quese y Publ??quese."),
              
              crearParrafoFirma("[NOMBRE DEL AUTORIZADOR PRINCIPAL DE SENESCYT]",
              "[CARGO DEL AUTORIZADOR PRINCIPAL DE SENESCYT]"),

            ]
          }
        ]
      }),

      function crearParrafo(texto: string): Paragraph {
        return new Paragraph({
          children: [
            new TextRun({
                break: 1,
                text: texto,
                font: "Arial"
            }),
          ],
          alignment: AlignmentType.JUSTIFIED,
        });
      }

      function crearParrafoCentrado(texto: string): Paragraph {
        return new Paragraph({
          children: [
            new TextRun({
                break: 1,
                text: texto,
                font: "Arial",
                bold: true
            }),
          ],
          alignment: AlignmentType.CENTER,
        });
      }

      function crearParrafoFirma(texto1: string,texto2: string): Paragraph {
        return new Paragraph({
          children: [
            new TextRun({
                break: 5,
                text: texto1,
                font: "Arial",
               // bold: true
            }),
            new TextRun({
              break: 1,
              text: texto2,
              font: "Arial",
              bold: true
          }),
          ],
          alignment: AlignmentType.CENTER,
        });
      }

      function splitContenido(text: string): string[] {
        return text.split("\n\n");
      }

      function createLogoHeaderSenescyt(): Table {
        return new Table({
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
        });
      }
    
      // Colocar los logos en el pie de p??gina del Documento 
      // Direcci??n y logotipo de gobierno
    
      function createLogoFooterSenescyt(): Table {
        return new Table({
          rows: [
            new TableRow({
              children: [
                new TableCell({
                  children: [
                    new Paragraph({
                      children:[
                        new TextRun({
                          text: "Direcci??n: Edificio Matriz: Alpallana E7-183 entre Av. Diego de Almagro y Whymper",
                          font: "Arial",
                          size: 12,
                        }),
                      ],
                    }),
                    new Paragraph({
                      children:[
                        new TextRun({
                          text: "C??digo Postal: 170518 / Quito - Ecuador",
                          font: "Arial",
                          size: 12
                        }),
                      ]
                    }),
                    new Paragraph({
                      children:[
                        new TextRun({
                          text: "Tel??fono: 593-2 3934-300",
                          font: "Arial",
                          size: 12
                        }),
                      ]
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
                          data: gobiernodetodos,
                          transformation: {
                            width: 190,
                            height: 66,
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
        });
      }

      Packer.toBlob(docword).then((blob) => {
          console.log(blob);
          saveAs(blob, 'example.docx');
          console.log('Documento creado exitosamente');
      }); 
  
    };

  };

  async generateFromUrl() {
    // const blob = await fetch(
    //   'https://raw.githubusercontent.com/dolanmiu/docx/master/demo/images/cat.jpg'
    // ).then((r) => r.blob());

    const escudo = await fetch(
      'https://cdn.jsdelivr.net/gh/markgark/react-ts-vuvib@main/imagenes/republica-ecuador-escudo.png'
      ).then((r) => r.blob())
  
    const senescyt = await fetch(
      'https://cdn.jsdelivr.net/gh/markgark/react-ts-vuvib@main/imagenes/logo-senescyt.jpeg'
    ).then((r) => r.blob());
  
    const gobiernodetodos = await fetch(
        'https://cdn.jsdelivr.net/gh/markgark/react-ts-vuvib@main/imagenes/gobierno-de-todos.png'
    ).then((r) => r.blob());
    
    const considerando = "Que el art??culo 14 de la Constituci??n de la Rep??blica del Ecuador, publicada en el Registro Oficial No. 449 de 20 de octubre de 2008, reconoce el derecho a la poblaci??n a vivir en un ambiente sano y ecol??gicamente equilibrado, garantizando sostenibilidad y el buen vivir; adem??s, se declara de inter??s p??blico la biodiversidad y la integridad del patrimonio gen??tico del pa??s;";
    const texto = 'CONSIDERANDO: Que ..... RESUELVE';
    const articulo1 =
      'Art??culo 1.- Otorgar a [NOMBRE DEL SOLICITANTE] la autorizaci??n para desarrollar la investigaci??n [T??TULO DEL PROYECTO] por el plazo de [PLAZO DEL PROYECTO].';
    const disposiciones = 'DISPOSICONES FINALES';
    const nombre = 'NOMBRE';
    const cargo = 'CARGO';
    const sumilla = 'Acci??n Nombre y Apellido Sumilla o firma Fecha';
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

    const tableHeader = new Table({
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
                  //HorizontalPositionAlign: HorizontalPositionAlign.RIGHT,
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

    const tableFooter = new Table({
      rows: [
        new TableRow({
          children: [
            new TableCell({
              children: [
                new Paragraph({
                  children:[
                    new TextRun({
                      text: "Direcci??n: Edificio Matriz: Alpallana E7-183 entre Av. Diego de Almagro y Whymper",
                      font: "Arial",
                      size: 12,
                    }),
                  ],
                }),
                new Paragraph({
                  children:[
                    new TextRun({
                      text: "C??digo Postal: 170518 / Quito - Ecuador",
                      font: "Arial",
                      size: 12
                    }),
                  ]
                }),
                new Paragraph({
                  children:[
                    new TextRun({
                      text: "Tel??fono: 593-2 3934-300",
                      font: "Arial",
                      size: 12
                    }),
                  ]
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
                      data: gobiernodetodos,
                      transformation: {
                        width: 190,
                        height: 66,
                      },
                    }),
                  ],
                  // alineaci??n de la figura a la derecha
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


    const FakeDataJson = [
      {
        "id": 1,
        "name": "Charly",
        "country": "USA",
        "age": 20
      },
      {
        "id": 2,
        "name": "Alejandra",
        "country": "M??xico",
        "age": 22
      },
      {
        "id": 3,
        "name": "Harry",
        "country": "London",
        "age": 26
      }
     ]
  
    const tableColumns = new Table({
      rows: [
          new TableRow({
              children: [
                  new TableCell({
                      children: [
                        new Paragraph("Identificador")
                      ],
                  }),
                  new TableCell({
                      children: [new Paragraph("Nombres y apellidos")
                    ],
                  }),
                  new TableCell({
                      children: [
                        new Paragraph("Nacionalidad")
                      ],
                  }),
                  new TableCell({
                      children: [
                        new Paragraph("Edad")
                      ],
                  }),
              ],
          }),
        ],
        width: {
          size: 100,
          type: WidthType.PERCENTAGE,
        },
    }),

    const startPDf = () => {
    new Paragraph("estoy en la funci??n")
    return
    
    // for(let i = 0; i <  1; i++){
    //     new TableRow({
    //         children: [
    //           new TableCell({
    //             children: [
    //               new Paragraph({
    //                 children:[
    //                   new TextRun({
    //                     text: `id ${FakeDataJson[i].id}`
    //                   })
    //                 ]
    //               })
    //             ]
    //           }),
    //           new TableCell({
    //             children: [
    //               new Paragraph({
    //                 children:[
    //                   new TextRun({
    //                     text: `name ${FakeDataJson[i].name}`
    //                   })
    //                 ]
    //               })
    //             ]
    //           }),
    //           new TableCell({
    //             children: [
    //               new Paragraph({
    //                 children:[
    //                   new TextRun({
    //                     text: `country ${FakeDataJson[i].country}`
    //                   })
    //                 ]
    //               })
    //             ]
    //           }),
    //           new TableCell({
    //             children: [
    //               new Paragraph({
    //                 children:[
    //                   new TextRun({
    //                     text: `age ${FakeDataJson[i].age}`
    //                   })
    //                 ]
    //               })
    //             ]
    //           }),
    //         ]
    //     })
    // }
  }

  const doc = new Document({
      sections: [
        {
          headers: {
            default: new Header({
              children: [
                tableHeader,
              ],
            }),
          },

          footers: {
            default: new Footer({
              children: [
                 tableFooter,
              ],
            }),
          },
          children: [
            new Paragraph(''),
            new Paragraph('CONSIDERANDO:'),
            new Paragraph(''),
            new Paragraph({
              children:[
                new TextRun({
                  text: "QUE en un principio Dios cre?? los cielos y la tierra",
                  font: "Arial",
                  bold: true,
                  size: 24
                }),
              ]
            }),
            new Paragraph(''),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children:[
                new TextRun({
                  text: considerando,
                  font: "Arial",
                  size: 24
                }),
              ]
            }),
            new Paragraph(''),
            new Paragraph(''),
            tableColumns,
            //this.props.startPDf(),

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
