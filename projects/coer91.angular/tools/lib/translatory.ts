import { CoerAlert } from "./coer-alert/coer-alert.component";
import { Tools } from "./generic";
import { Numbers } from "./numbers";

export class Translatory {

    private _language: 'en' | 'es' | 'fr' | 'ko' | 'zh';
    private _alert = new CoerAlert();

    constructor(language: 'en' | 'es' | 'fr' | 'ko' | 'zh' = 'en') {
        this._language = language;
    }

     
    /** */
    public label = {
        Project: () => {
            switch(this._language) {
                case 'es': return 'Proyecto';
                case 'ko': return '프로젝트'; 
                default:      return 'Project';
            } 
        },

        Module: () => {
            switch(this._language) {
                case 'es': return 'Módulo';
                case 'ko': return '기준 치수'; 
                default:      return 'Module';
            } 
        },

        Submodule: () => {
            switch(this._language) {
                case 'es': return 'Submódulo';
                case 'ko': return '서브모듈'; 
                default:      return 'Submodule';
            } 
        },

        Page: () => {
            switch(this._language) {
                case 'es': return 'Página';
                case 'ko': return '페이지'; 
                default:      return 'Page';
            } 
        },

        User: () => {
            switch(this._language) {
                case 'es': return 'Usuario';
                case 'ko': return '사용자'; 
                default:      return 'User';
            } 
        },

        Role: () => {
            switch(this._language) {
                case 'es': return 'Rol';
                case 'ko': return '역할'; 
                default:      return 'Role';
            } 
        },

        Active: () => {
            switch(this._language) {
                case 'es': return 'Activo';
                case 'ko': return '활동적인'; 
                default:      return 'Active';
            } 
        },

        Disabled: () => {
            switch(this._language) {
                case 'es': return 'Deshabilitado';
                case 'ko': return '비활성화됨'; 
                default:      return 'Disabled';
            } 
        },

        CaseLabel: () => {
            switch(this._language) {
                case 'es': return 'Etiqueta de Caja';
                case 'ko': return '케이스 라벨'; 
                default:      return 'Case Label';
            } 
        },

        Division: () => {
            switch(this._language) {
                case 'es': return 'División';
                case 'ko': return '구분'; 
                default:      return 'Division';
            } 
        },

        EoNumber: () => {
            switch(this._language) {
                case 'es': return 'Número EO';
                case 'ko': return 'EO 번호'; 
                default:      return 'EO Number';
            } 
        },

        HasDefect: () => {
            switch(this._language) {
                case 'es': return 'Está defectuoso';
                case 'ko': return '결함이 있습니다'; 
                default:      return 'Has Defect';
            } 
        },

        InputDate: () => {
            switch(this._language) {
                case 'es': return 'Fecha de Entrada';
                case 'ko': return '입력 날짜'; 
                default:      return 'Input Date';
            } 
        },

        IsDeleted: () => {
            switch(this._language) {
                case 'es': return 'Eliminado';
                case 'ko': return '삭제됨'; 
                default:      return 'Deleted';
            } 
        },

        Location: () => {
            switch(this._language) {
                case 'es': return 'Localización';
                case 'ko': return '위치'; 
                default:      return 'Location';
            } 
        },

        Lot: () => {
            switch(this._language) {
                case 'es': return 'Lote';
                case 'ko': return '일괄'; 
                default:      return 'Lot';
            } 
        },

        LotNumber: () => {
            switch(this._language) {
                case 'es': return 'Número de Lote';
                case 'ko': return '로트 번호'; 
                default:      return 'Lot Number';
            } 
        },

        ManualScanner: () => {
            switch(this._language) {
                case 'es': return 'Scanner Manual';
                case 'ko': return '수동 스캐너'; 
                default:      return 'Manual Scanner';
            } 
        },

        Material: () => {
            switch(this._language) {
                case 'es': return 'Material';
                case 'ko': return '재료';   
                default:      return 'Material';
            } 
        },

        Product: () => {
            switch(this._language) {
                case 'es': return 'Producto';
                case 'ko': return '제품';    
                default:      return 'Product';
            } 
        },

        PartNumber: () => {
            switch(this._language) {
                case 'es': return 'Número de Parte';
                case 'ko': return '부품 번호'; 
                default:      return 'Part Number';
            } 
        },

        Printer: () => {
            switch(this._language) {
                case 'es': return 'Impresora';
                case 'ko': return '프린터'; 
                default:      return 'Printer';
            } 
        },

        ProductionDate: () => {
            switch(this._language) {
                case 'es': return 'Fecha Producción';
                case 'ko': return '생산 날짜'; 
                default:      return 'Production Date';
            } 
        },

        Qty: () => {
            switch(this._language) {
                case 'es': return 'Cant.';
                case 'ko': return '수량'; 
                default:      return 'Qty';
            } 
        },

        Quantity: () => {
            switch(this._language) {
                case 'es': return 'Cantidad';
                case 'ko': return '수량'; 
                default:      return 'Quantity';
            } 
        },

        Required: () => {
            switch(this._language) {
                case 'es': return 'Requerido';
                case 'ko': return '필수';    
                default:      return 'Required';
            } 
        },

        Scanner: () => {
            switch(this._language) {
                case 'es': return 'Scanner';
                case 'ko': return '스캐너'; 
                default:      return 'Scanner';
            } 
        },

        Scanned: () => {
            switch(this._language) {
                case 'es': return 'Escaneado';
                case 'ko': return '스캔됨';    
                default:      return 'Scanned';
            } 
        },

        Storage: () => {
            switch(this._language) {
                case 'es': return 'Almacén';
                case 'ko': return '저장소'; 
                default:      return 'Storage';
            } 
        },

        StorageCode: () => {
            switch(this._language) {
                case 'es': return 'Código de Almacén';
                case 'ko': return '저장소 코드'; 
                default:      return 'Storage Code';
            } 
        },

        Transaction: () => {
            switch(this._language) {
                case 'es': return 'Transacción';
                case 'ko': return '거래'; 
                default:      return 'Transaction';
            } 
        },

        Unit: () => {
            switch(this._language) {
                case 'es': return 'Unidad';
                case 'ko': return '단위'; 
                default:      return 'Unit';
            } 
        },

        Vendor: () => {
            switch(this._language) {
                case 'es': return 'Vendedor';
                case 'ko': return '공급업체'; 
                default:      return 'Vendor';
            } 
        },

        VendorCode: () => {
            switch(this._language) {
                case 'es': return 'Código de Vendedor';
                case 'ko': return '공급업체 코드'; 
                default:      return 'Vendor Code';
            } 
        },

        Warehouse: () => {
            switch(this._language) {
                case 'es': return 'Bodega';
                case 'ko': return '창고'; 
                default:      return 'Warehouse';
            } 
        },

        WarehouseCode: () => {
            switch(this._language) {
                case 'es': return 'Código de Bodega';
                case 'ko': return '창고 코드'; 
                default:      return 'Warehouse Code';
            } 
        },
    }

    
    /** */
    public alert = {
        LotAlreadyScanned: (code: string) => {
            let message = 'This lot has already been scanned';
            
            switch(this._language) {
                case 'es': {
                    message = 'Este lote ya está escaneado';
                    break;
                }

                case 'ko': {
                    message = '이 로트는 이미 스캔되었습니다';
                    break;
                }
            } 

            this._alert.Warning(message, code, 'barcode');
        },

        LotNotInOrder: (code: string) => {
            let message = 'This lot is not in the order';
            
            switch(this._language) {
                case 'es': {
                    message = 'Este lote no está en la orden';
                    break;
                }

                case 'ko': {
                    message = '이 로트는 주문에 없습니다';
                    break;
                }
            } 

            this._alert.Warning(message, code, 'barcode');
        },

        InvalidCode: (code: string) => {
            let message = 'Invalid code';
            
            switch(this._language) {
                case 'es': {
                    message = 'Código inválido';
                    break;
                }

                case 'ko': {
                    message = '잘못된 코드';
                    break;
                }
            } 

            this._alert.Warning(code, message, 'barcode');
        },

        NoData: (code: string) => {
            let message = 'No data';
            
            switch(this._language) {
                case 'es': {
                    message = 'No hay datos';
                    break;
                }

                case 'ko': {
                    message = '데이터가 없습니다';
                    break;
                }
            } 

            this._alert.Warning(code, message, 'barcode');
        },
 
        NoDataCaseLabel: (code: string) => {
            let message = 'No data for this Case Label';
            
            switch(this._language) {
                case 'es': {
                    message = ' No hay datos para esta etiqueta de caja';
                    break;
                }

                case 'ko': {
                    message = '이 케이스 라벨에 대한 데이터가 없습니다';
                    break;
                }
            } 

            this._alert.Warning(code, message, 'barcode');
        },

        LotDeleted: (code: string) => {
            let message = 'This lot has been deleted';
            
            switch(this._language) {
                case 'es': {
                    message = 'Este lote ha sido eliminado';
                    break;
                }

                case 'ko': {
                    message = '이 로트가 삭제되었습니다';
                    break;
                }
            } 

            this._alert.Warning(code, message, 'barcode');
        },

        LotWithDefect: (code: string) => {
            let message = 'This lot has defects';
            
            switch(this._language) {
                case 'es': {
                    message = 'Este lote tiene defectos';
                    break;
                }

                case 'ko': {
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
                case 'es': {
                    message1 = 'Confirmar transacción';
                    message2 = 'lote' + (isPlural ? 's' : '');
                    break;
                }

                case 'ko': {
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
                case 'es': {
                    message1 = 'Cancelar transacción';
                    message2 = 'lote' + (isPlural ? 's' : '');
                    break;
                }

                case 'ko': {
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
                case 'es': {
                    message1 = 'Confirmar transacción';
                    message2 = 'lote' + (isPlural ? 's' : '');
                    message3 = 'Almacén';
                    message4 = 'Ubicación';
                    break;
                }

                case 'ko': {
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
                case 'es': {
                    message1 = 'Cancelar transacción';
                    message2 = 'lote' + (isPlural ? 's' : '');
                    message3 = 'Almacén';
                    message4 = 'Ubicación';
                    break;
                }

                case 'ko': {
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
                case 'es': {
                    message = `Remover lote<br>#<b>${lotNumber}</b>?`; 
                    break;
                }

                case 'ko': { 
                    message = `로트<br>#<b>${lotNumber}</b><br>삭제하시겠습니까?`
                    break;
                }
            }  

            return await this._alert.SuccessConfirm(message, 'i91-trash-can');
        },
    }
}