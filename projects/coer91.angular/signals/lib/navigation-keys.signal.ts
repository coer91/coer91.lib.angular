import { navigationSIGNAL } from "./navigation.signal"; 
import { IActiveKey } from "coer91.angular/interfaces";
import { Tools } from "coer91.angular/tools";
import { computed } from "@angular/core"; 

export const navigationKeysSIGNAL = computed(() => {
    const NAVIGATION_KEYS = new Map<string, IActiveKey>();

    for(const LV1 of navigationSIGNAL()) {
        
        //Level 1
        if(Tools.IsNotOnlyWhiteSpace(LV1?.Path) && !NAVIGATION_KEYS.has(LV1.Path!)) { 
            NAVIGATION_KEYS.set(LV1.Path!, { 
                ActiveKey: (Tools.IsNotOnlyWhiteSpace(LV1.ActiveKey) ? `${LV1.ActiveKey!}`.toUpperCase() : ''),
                CanCreate: Tools.IsBooleanTrue(LV1?.CanCreate), 
                CanUpdate: Tools.IsBooleanTrue(LV1?.CanUpdate), 
                CanDelete: Tools.IsBooleanTrue(LV1?.CanDelete) 
            });
        }

        else if(Tools.IsNotNull(LV1.Items)) {            
            for(const LV2 of LV1.Items!) {
                //Level 2
                if(Tools.IsNotOnlyWhiteSpace(LV2?.Path) && !NAVIGATION_KEYS.has(LV2.Path!)) { 
                    NAVIGATION_KEYS.set(LV2.Path!, { 
                        ActiveKey: (Tools.IsNotOnlyWhiteSpace(LV2.ActiveKey) ? `${LV2.ActiveKey!}`.toUpperCase() : ''),
                        CanCreate: Tools.IsBooleanTrue(LV2?.CanCreate), 
                        CanUpdate: Tools.IsBooleanTrue(LV2?.CanUpdate), 
                        CanDelete: Tools.IsBooleanTrue(LV2?.CanDelete) 
                    }); 
                }

                else if(Tools.IsNotNull(LV2.Items)) {  
                    for(const LV3 of LV2.Items!) {
                        //Level 3
                        if(Tools.IsNotOnlyWhiteSpace(LV3?.Path) && !NAVIGATION_KEYS.has(LV3.Path!)) { 
                            NAVIGATION_KEYS.set(LV3.Path!, { 
                                ActiveKey: (Tools.IsNotOnlyWhiteSpace(LV3.ActiveKey) ? `${LV3.ActiveKey!}`.toUpperCase() : ''),
                                CanCreate: Tools.IsBooleanTrue(LV3?.CanCreate), 
                                CanUpdate: Tools.IsBooleanTrue(LV3?.CanUpdate), 
                                CanDelete: Tools.IsBooleanTrue(LV3?.CanDelete) 
                            });                          
                        }
                    }
                }
            }
        }
    } 

    return NAVIGATION_KEYS;
}); 