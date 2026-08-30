import { CoerAlert } from "./coer-alert/coer-alert.component";
import { Tools } from "./generic";
import { Numbers } from "./numbers";

export class Translatory {

    private _language: 'en_US' | 'es_MX' | 'ko-KR' = 'en_US';
    private _alert = new CoerAlert();

    constructor(language: 'en_US' | 'es_MX' | 'ko-KR' = 'en_US') {
        this._language = language;
    }

     
    /** */
    public label = {
        Project: () => {
            switch(this._language) {
                case 'es_MX': return 'Proyecto';
                case 'ko-KR': return '프로젝트'; 
                default:      return 'Project';
            } 
        },

        Module: () => {
            switch(this._language) {
                case 'es_MX': return 'Módulo';
                case 'ko-KR': return '기준 치수'; 
                default:      return 'Module';
            } 
        },

        Submodule: () => {
            switch(this._language) {
                case 'es_MX': return 'Submódulo';
                case 'ko-KR': return '서브모듈'; 
                default:      return 'Submodule';
            } 
        },

        Page: () => {
            switch(this._language) {
                case 'es_MX': return 'Página';
                case 'ko-KR': return '페이지'; 
                default:      return 'Page';
            } 
        },

        User: () => {
            switch(this._language) {
                case 'es_MX': return 'Usuario';
                case 'ko-KR': return '사용자'; 
                default:      return 'User';
            } 
        },

        Role: () => {
            switch(this._language) {
                case 'es_MX': return 'Rol';
                case 'ko-KR': return '역할'; 
                default:      return 'Role';
            } 
        },

        Active: () => {
            switch(this._language) {
                case 'es_MX': return 'Activo';
                case 'ko-KR': return '활동적인'; 
                default:      return 'Active';
            } 
        },

        Disabled: () => {
            switch(this._language) {
                case 'es_MX': return 'Deshabilitado';
                case 'ko-KR': return '비활성화됨'; 
                default:      return 'Disabled';
            } 
        },

        CaseLabel: () => {
            switch(this._language) {
                case 'es_MX': return 'Etiqueta de Caja';
                case 'ko-KR': return '케이스 라벨'; 
                default:      return 'Case Label';
            } 
        },

        Division: () => {
            switch(this._language) {
                case 'es_MX': return 'División';
                case 'ko-KR': return '구분'; 
                default:      return 'Division';
            } 
        },

        EoNumber: () => {
            switch(this._language) {
                case 'es_MX': return 'Número EO';
                case 'ko-KR': return 'EO 번호'; 
                default:      return 'EO Number';
            } 
        },

        HasDefect: () => {
            switch(this._language) {
                case 'es_MX': return 'Está defectuoso';
                case 'ko-KR': return '결함이 있습니다'; 
                default:      return 'Has Defect';
            } 
        },

        InputDate: () => {
            switch(this._language) {
                case 'es_MX': return 'Fecha de Entrada';
                case 'ko-KR': return '입력 날짜'; 
                default:      return 'Input Date';
            } 
        },

        IsDeleted: () => {
            switch(this._language) {
                case 'es_MX': return 'Eliminado';
                case 'ko-KR': return '삭제됨'; 
                default:      return 'Deleted';
            } 
        },

        Location: () => {
            switch(this._language) {
                case 'es_MX': return 'Localización';
                case 'ko-KR': return '위치'; 
                default:      return 'Location';
            } 
        },

        Lot: () => {
            switch(this._language) {
                case 'es_MX': return 'Lote';
                case 'ko-KR': return '일괄'; 
                default:      return 'Lot';
            } 
        },

        LotNumber: () => {
            switch(this._language) {
                case 'es_MX': return 'Número de Lote';
                case 'ko-KR': return '로트 번호'; 
                default:      return 'Lot Number';
            } 
        },

        ManualScanner: () => {
            switch(this._language) {
                case 'es_MX': return 'Scanner Manual';
                case 'ko-KR': return '수동 스캐너'; 
                default:      return 'Manual Scanner';
            } 
        },

        Material: () => {
            switch(this._language) {
                case 'es_MX': return 'Material';
                case 'ko-KR': return '재료';   
                default:      return 'Material';
            } 
        },

        Product: () => {
            switch(this._language) {
                case 'es_MX': return 'Producto';
                case 'ko-KR': return '제품';    
                default:      return 'Product';
            } 
        },

        PartNumber: () => {
            switch(this._language) {
                case 'es_MX': return 'Número de Parte';
                case 'ko-KR': return '부품 번호'; 
                default:      return 'Part Number';
            } 
        },

        Printer: () => {
            switch(this._language) {
                case 'es_MX': return 'Impresora';
                case 'ko-KR': return '프린터'; 
                default:      return 'Printer';
            } 
        },

        ProductionDate: () => {
            switch(this._language) {
                case 'es_MX': return 'Fecha Producción';
                case 'ko-KR': return '생산 날짜'; 
                default:      return 'Production Date';
            } 
        },

        Qty: () => {
            switch(this._language) {
                case 'es_MX': return 'Cant.';
                case 'ko-KR': return '수량'; 
                default:      return 'Qty';
            } 
        },

        Quantity: () => {
            switch(this._language) {
                case 'es_MX': return 'Cantidad';
                case 'ko-KR': return '수량'; 
                default:      return 'Quantity';
            } 
        },

        Required: () => {
            switch(this._language) {
                case 'es_MX': return 'Requerido';
                case 'ko-KR': return '필수';    
                default:      return 'Required';
            } 
        },

        Scanner: () => {
            switch(this._language) {
                case 'es_MX': return 'Scanner';
                case 'ko-KR': return '스캐너'; 
                default:      return 'Scanner';
            } 
        },

        Scanned: () => {
            switch(this._language) {
                case 'es_MX': return 'Escaneado';
                case 'ko-KR': return '스캔됨';    
                default:      return 'Scanned';
            } 
        },

        Storage: () => {
            switch(this._language) {
                case 'es_MX': return 'Almacén';
                case 'ko-KR': return '저장소'; 
                default:      return 'Storage';
            } 
        },

        StorageCode: () => {
            switch(this._language) {
                case 'es_MX': return 'Código de Almacén';
                case 'ko-KR': return '저장소 코드'; 
                default:      return 'Storage Code';
            } 
        },

        Transaction: () => {
            switch(this._language) {
                case 'es_MX': return 'Transacción';
                case 'ko-KR': return '거래'; 
                default:      return 'Transaction';
            } 
        },

        Unit: () => {
            switch(this._language) {
                case 'es_MX': return 'Unidad';
                case 'ko-KR': return '단위'; 
                default:      return 'Unit';
            } 
        },

        Vendor: () => {
            switch(this._language) {
                case 'es_MX': return 'Vendedor';
                case 'ko-KR': return '공급업체'; 
                default:      return 'Vendor';
            } 
        },

        VendorCode: () => {
            switch(this._language) {
                case 'es_MX': return 'Código de Vendedor';
                case 'ko-KR': return '공급업체 코드'; 
                default:      return 'Vendor Code';
            } 
        },

        Warehouse: () => {
            switch(this._language) {
                case 'es_MX': return 'Bodega';
                case 'ko-KR': return '창고'; 
                default:      return 'Warehouse';
            } 
        },

        WarehouseCode: () => {
            switch(this._language) {
                case 'es_MX': return 'Código de Bodega';
                case 'ko-KR': return '창고 코드'; 
                default:      return 'Warehouse Code';
            } 
        },
    }

    
    /** */
    public alert = {
        LotAlreadyScanned: (code: string) => {
            let message = 'This lot has already been scanned';
            
            switch(this._language) {
                case 'es_MX': {
                    message = 'Este lote ya está escaneado';
                    break;
                }

                case 'ko-KR': {
                    message = '이 로트는 이미 스캔되었습니다';
                    break;
                }
            } 

            this._alert.Warning(message, code, 'barcode');
        },

        LotNotInOrder: (code: string) => {
            let message = 'This lot is not in the order';
            
            switch(this._language) {
                case 'es_MX': {
                    message = 'Este lote no está en la orden';
                    break;
                }

                case 'ko-KR': {
                    message = '이 로트는 주문에 없습니다';
                    break;
                }
            } 

            this._alert.Warning(message, code, 'barcode');
        },

        InvalidCode: (code: string) => {
            let message = 'Invalid code';
            
            switch(this._language) {
                case 'es_MX': {
                    message = 'Código inválido';
                    break;
                }

                case 'ko-KR': {
                    message = '잘못된 코드';
                    break;
                }
            } 

            this._alert.Warning(code, message, 'barcode');
        },

        NoData: (code: string) => {
            let message = 'No data';
            
            switch(this._language) {
                case 'es_MX': {
                    message = 'No hay datos';
                    break;
                }

                case 'ko-KR': {
                    message = '데이터가 없습니다';
                    break;
                }
            } 

            this._alert.Warning(code, message, 'barcode');
        },
 
        NoDataCaseLabel: (code: string) => {
            let message = 'No data for this Case Label';
            
            switch(this._language) {
                case 'es_MX': {
                    message = ' No hay datos para esta etiqueta de caja';
                    break;
                }

                case 'ko-KR': {
                    message = '이 케이스 라벨에 대한 데이터가 없습니다';
                    break;
                }
            } 

            this._alert.Warning(code, message, 'barcode');
        },

        LotDeleted: (code: string) => {
            let message = 'This lot has been deleted';
            
            switch(this._language) {
                case 'es_MX': {
                    message = 'Este lote ha sido eliminado';
                    break;
                }

                case 'ko-KR': {
                    message = '이 로트가 삭제되었습니다';
                    break;
                }
            } 

            this._alert.Warning(code, message, 'barcode');
        },

        LotWithDefect: (code: string) => {
            let message = 'This lot has defects';
            
            switch(this._language) {
                case 'es_MX': {
                    message = 'Este lote tiene defectos';
                    break;
                }

                case 'ko-KR': {
                    message = '이 로트에는 결함이 있습니다';
                    break;
                }
            } 

            this._alert.Warning(code, message, 'barcode');
        },
    }


    /** */
    public confirm = {
        SaveTransaction: async (transaction: string | null = null, quantity: string | number | null = null) => {
            let message1 = 'Confirm transaction';
            
            let isPlural = Tools.IsNotOnlyWhiteSpace(quantity) && Numbers.IsNumber(quantity) && Number(quantity) != 1;
            let message2 = 'lot' + (isPlural ? 's' : '');
             
            
            switch(this._language) {
                case 'es_MX': {
                    message1 = 'Confirmar transacción';
                    message2 = 'lote' + (isPlural ? 's' : '');
                    break;
                }

                case 'ko-KR': {
                    message1 = '거래 확인';
                    message2 = '로트' + (isPlural ? '들' : '');
                    break;
                }
            } 

            let message = message1;
            if(Tools.IsNotOnlyWhiteSpace(transaction)) message += `<br>#<b>${transaction}</b>`;
            if(Tools.IsNotOnlyWhiteSpace(quantity))    message += `<br>${quantity} ${message2}`;
            message += `?`;

            return await this._alert.SuccessConfirm(message, 'save');
        }, 


        CancelTransaction: async (transaction: string | null = null, quantity: string | number | null = null) => {
            let message1 = 'Cancel transaction';
            
            let isPlural = Tools.IsNotOnlyWhiteSpace(quantity) && Numbers.IsNumber(quantity) && Number(quantity) != 1;
            let message2 = 'lot' + (isPlural ? 's' : '');
             
            
            switch(this._language) {
                case 'es_MX': {
                    message1 = 'Cancelar transacción';
                    message2 = 'lote' + (isPlural ? 's' : '');
                    break;
                }

                case 'ko-KR': {
                    message1 = '거래 취소';
                    message2 = '로트' + (isPlural ? '들' : '');
                    break;
                }
            } 

            let message = message1;
            if(Tools.IsNotOnlyWhiteSpace(transaction)) message += `<br>#<b>${transaction}</b>`;
            if(Tools.IsNotOnlyWhiteSpace(quantity))    message += `<br>${quantity} ${message2}`;
            message += `?`;

            return await this._alert.WarningConfirm(message, '');
        },


        SaveLotsInLocation: async (storage: string | null = null, location: string | null = null, quantity: string | number | null = null) => {
            let message1 = 'Confirm transaction';
            
            let isPlural = Tools.IsNotOnlyWhiteSpace(quantity) && Numbers.IsNumber(quantity) && Number(quantity) != 1;
            let message2 = 'lot' + (isPlural ? 's' : '');
             
            let message3 = 'Storage'
            let message4 = 'Location'
            
            switch(this._language) {
                case 'es_MX': {
                    message1 = 'Confirmar transacción';
                    message2 = 'lote' + (isPlural ? 's' : '');
                    message3 = 'Almacén';
                    message4 = 'Ubicación';
                    break;
                }

                case 'ko-KR': {
                    message1 = '거래 확인';
                    message2 = '로트' + (isPlural ? '들' : '');
                    message3 = '창고';
                    message4 = '위치';
                    break;
                }
            } 

            let message = message1;
            if(Tools.IsNotOnlyWhiteSpace(storage))  message += `<br>${message3}: <b>${storage}</b>`;
            if(Tools.IsNotOnlyWhiteSpace(location)) message += `<br>${message4}: <b>${location}</b>`;
            if(Tools.IsNotOnlyWhiteSpace(quantity)) message += `<br>${quantity} ${message2}`;
            message += `?`;

            return await this._alert.SuccessConfirm(message, 'save');
        }, 


        CancelLotsInLocation: async (storage: string | null = null, location: string | null = null, quantity: string | number | null = null) => {
            let message1 = 'Cancel transaction';
            
            let isPlural = Tools.IsNotOnlyWhiteSpace(quantity) && Numbers.IsNumber(quantity) && Number(quantity) != 1;
            let message2 = 'lot' + (isPlural ? 's' : '');
             
            let message3 = 'Storage'
            let message4 = 'Location'
            
            switch(this._language) {
                case 'es_MX': {
                    message1 = 'Cancelar transacción';
                    message2 = 'lote' + (isPlural ? 's' : '');
                    message3 = 'Almacén';
                    message4 = 'Ubicación';
                    break;
                }

                case 'ko-KR': {
                    message1 = '거래 취소';
                    message2 = '로트' + (isPlural ? '들' : '');
                    message3 = '창고';
                    message4 = '위치';
                    break;
                }
            } 

            let message = message1;
            if(Tools.IsNotOnlyWhiteSpace(storage))  message += `<br>${message3}: <b>${storage}</b>`;
            if(Tools.IsNotOnlyWhiteSpace(location)) message += `<br>${message4}: <b>${location}</b>`;
            if(Tools.IsNotOnlyWhiteSpace(quantity)) message += `<br>${quantity} ${message2}`;
            message += `?`;

            return await this._alert.WarningConfirm(message, '');
        }, 


        RemoveLot: async (lotNumber: string | null = null) => {
            let message = `Remove<br>#<b>${lotNumber}</b><br>lot?`;              
            
            switch(this._language) {
                case 'es_MX': {
                    message = `Remover lote<br>#<b>${lotNumber}</b>?`; 
                    break;
                }

                case 'ko-KR': { 
                    message = `로트<br>#<b>${lotNumber}</b><br>삭제하시겠습니까?`
                    break;
                }
            }  

            return await this._alert.SuccessConfirm(message, 'i91-trash-can');
        },
    }
}