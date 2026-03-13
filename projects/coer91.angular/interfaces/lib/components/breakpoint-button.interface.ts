export interface IBreakpointButton {
    type?: {
        mv?:  'filled' | 'outline' | 'icon' | 'icon-rounded' | 'icon-filled' | 'icon-filled-rounded' | 'icon-outline'  | 'icon-outline-rounded';
        xs?:  'filled' | 'outline' | 'icon' | 'icon-rounded' | 'icon-filled' | 'icon-filled-rounded' | 'icon-outline'  | 'icon-outline-rounded';
        sm?:  'filled' | 'outline' | 'icon' | 'icon-rounded' | 'icon-filled' | 'icon-filled-rounded' | 'icon-outline'  | 'icon-outline-rounded';
        md?:  'filled' | 'outline' | 'icon' | 'icon-rounded' | 'icon-filled' | 'icon-filled-rounded' | 'icon-outline'  | 'icon-outline-rounded';
        lg?:  'filled' | 'outline' | 'icon' | 'icon-rounded' | 'icon-filled' | 'icon-filled-rounded' | 'icon-outline'  | 'icon-outline-rounded';
        xl?:  'filled' | 'outline' | 'icon' | 'icon-rounded' | 'icon-filled' | 'icon-filled-rounded' | 'icon-outline'  | 'icon-outline-rounded';
        xxl?: 'filled' | 'outline' | 'icon' | 'icon-rounded' | 'icon-filled' | 'icon-filled-rounded' | 'icon-outline'  | 'icon-outline-rounded';
    }
    width?: {
        mv?:  string;
        xs?:  string;
        sm?:  string;
        md?:  string;
        lg?:  string;
        xl?:  string;
        xxl?: string;
    }
}