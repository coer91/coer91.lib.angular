export interface ITitleBreadcrumb {
    page: string;
    path?: string | null;
    queryParams?: any;
    click?: (() => any);
}