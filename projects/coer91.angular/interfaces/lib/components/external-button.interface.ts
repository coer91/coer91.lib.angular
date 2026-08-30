export interface IExternalButton {
    showLeft?: boolean;
    typeLeft?: 'icon' | 'icon-filled' | 'icon-outline';
    colorLeft?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'navigation' | 'information' | 'dark';
    iconLeft?: string;
    isReadonlyLeft?: boolean;
    showRight?: boolean;
    typeRight?: 'icon' | 'icon-filled' | 'icon-outline';
    iconRight?: string;
    isReadonlyRight?: boolean;
    colorRight?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'navigation' | 'information' | 'dark';
}