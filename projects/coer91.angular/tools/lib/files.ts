import { Tools } from "./generic";
import { Strings } from "./strings";
import * as XLSX from 'xlsx';

export class Files {

    public static readonly IMAGE_EXTENSIONS = new Map<string, string>([
        ['png' , 'image/png'          ], 
        ['jpg' , 'image/jpeg'         ], 
        ['jpeg', 'image/jpeg'         ], 
        ['gif' , 'image/gif'          ], 
        ['svg' , 'image/image/svg+xml'], 
        ['ico' , 'image/x-icon'       ] 
    ]); 


    public static readonly EXCEL_EXTENSIONS = new Map<string, string>([
        ['xls' , 'application/vnd.ms-excel' ],
        ['xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ],
        ['csv' , 'text/csv' ]
    ]);



    /** Get Extension File */
    public static GetExtension(file: File): string {
        if (file.name.includes('.')) {
            let worlds = file.name.split('.') as string[];

            if (worlds.length > 0) {
                let extension = worlds.pop()!;
                extension = extension.trim().toLowerCase();
                if (extension.length > 0) return extension;
            }
        }

        return '';
    }



    /** */
    public static IsExcel(file: File): boolean {
        const EXTENSION = Files.GetExtension(file);

        return Tools.IsNotNull(EXTENSION)
            ? [...this.EXCEL_EXTENSIONS.keys()].includes(EXTENSION!)
            : false;
    }


    /** Read excel file */
    public static ReadExcel<T>(file: File) {
        return new Promise<{ columns: string[]; rows: T[]; }>(Resolve => {
            let columns: string[] = [];
            let rows: T[] = [];

            const reader = new FileReader();
            reader.readAsArrayBuffer(file);

            reader.onload = () => {
                const dataBytes = new Uint8Array(reader.result as any);

                if (dataBytes) {
                    const workbook = XLSX.read(dataBytes, {});
                    const sheet = workbook.Sheets[workbook.SheetNames[0]];
                    let dataSheet: any[] = XLSX.utils.sheet_to_json(sheet, {
                        header: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
                    });

                    //Get Headers
                    for(const column in dataSheet[0]) {
                        columns.push(Strings.FirstCharToLower(String(dataSheet[0][column]).replaceAll(' ', '')));
                    }

                    //Get Rows
                    rows = XLSX.utils.sheet_to_json(sheet, { header: columns });
                    rows.shift();

                    rows = rows.map(row => {
                        const item = Tools.BreakReference<any>(row);
                        delete item['__rowNum__'];
                        return item;
                    });
                }

                Resolve({ columns, rows });
            }

            reader.onerror = () => { Resolve({ columns, rows }) }
        });
    }


    /** Export to excel file */
    public static ExportExcel<T>(data: T[], fileName: string = '', sheetName: string = 'Sheet1'): void {
        sheetName = Strings.CleanUpBlanks(sheetName);
        fileName = Strings.CleanUpBlanks(fileName);

        if(fileName.endsWith('.xls') || fileName.endsWith('.xlsx') || fileName.endsWith('.csv')) {
            if (fileName.endsWith('.xls')) {
                fileName = fileName.replaceAll('.xls', '.xlsx');
            }

            if (fileName.endsWith('.csv')) {
                fileName = fileName.replaceAll('.csv', '.xlsx');
            }
        }

        else {
            fileName += '.xlsx';
        }

        const WORK_SHEET = XLSX.utils.json_to_sheet(data);
        const WORK_BOOK = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(WORK_BOOK, WORK_SHEET, sheetName);
        XLSX.writeFile(WORK_BOOK, fileName);
    }


    /** Convert file to string base64 */
    public static ToBase64(file: File): Promise<string> {
        return new Promise<string>(Resolve => {
            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = () => {
                Resolve(reader.result?.toString() || '');
            }

            reader.onerror = () => Resolve('');
        });
    }
} 