import { CoerAlert } from "./coer-alert/coer-alert.component";
import { Tools } from "./generic";
import { Numbers } from "./numbers";

export class Translatory {

    private _language: 'en' | 'es' | 'fr' | 'ko' | 'zh';
    private _alert = new CoerAlert();

    constructor(language: 'en' | 'es' | 'fr' | 'ko' | 'zh') {
        this._language = language;

        switch(language) {
            case 'es': this.SetLabelES(); return;
            case 'fr': this.SetLabelFR(); return;
            case 'ko': this.SetLabelKO(); return;
            case 'zh': this.SetLabelZH(); return;
        } 
    }


    /** */
    public label = {
        Project    : 'Project',
        Module     : 'Module',
        Submodule  : 'Submodule',
        Page       : 'Page',
        User       : 'User',
        Role       : 'Role',
        Active     : 'Active',
        Disabled   : 'Disabled', 
        Required   : 'Required',
        Transaction: 'Transaction',       
        Warehouse  : 'Warehouse',
        Quantity   : 'Quantity' 
    }


    //Function
    private SetLabelES() {
        this.label.Project     = 'Proyecto';
        this.label.Module      = 'Módulo';
        this.label.Submodule   = 'Submódulo';
        this.label.Page        = 'Página';
        this.label.User        = 'Usuario';
        this.label.Role        = 'Rol';
        this.label.Active      = 'Activo';
        this.label.Disabled    = 'Deshabilitado';
        this.label.Required    = 'Requerido';
        this.label.Transaction = 'Transacción';
        this.label.Warehouse   = 'Almacén';
        this.label.Quantity    = 'Cantidad';
    }


    //Function
    private SetLabelFR() {
        this.label.Project     = 'Projet';
        this.label.Module      = 'Module';
        this.label.Submodule   = 'Sous-module';
        this.label.Page        = 'Page';
        this.label.User        = 'Utilisateur';
        this.label.Role        = 'Rôle';
        this.label.Active      = 'Actif';
        this.label.Disabled    = 'Désactivé';
        this.label.Required    = 'Requis';
        this.label.Transaction = 'Transaction';
        this.label.Warehouse   = 'Entrepôt';
        this.label.Quantity    = 'Quantité';
    }


    //Function
    private SetLabelKO() {
        this.label.Project     = '프로젝트';
        this.label.Module      = '기준 치수';
        this.label.Submodule   = '서브모듈';
        this.label.Page        = '페이지';
        this.label.User        = '사용자';
        this.label.Role        = '역할';
        this.label.Active      = '활동적인';
        this.label.Disabled    = '비활성화됨';
        this.label.Required    = '필수';
        this.label.Transaction = '거래';
        this.label.Warehouse   = '창고';
        this.label.Quantity    = '수량';
    }


    //Function
    private SetLabelZH() {
        this.label.Project     = '项目';
        this.label.Module      = '模块';
        this.label.Submodule   = '子模块';
        this.label.Page        = '页面';
        this.label.User        = '用户';
        this.label.Role        = '角色';
        this.label.Active      = '启用';
        this.label.Disabled    = '禁用';
        this.label.Required    = '必填';
        this.label.Transaction = '交易';
        this.label.Warehouse   = '仓库';
        this.label.Quantity    = '数量';
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