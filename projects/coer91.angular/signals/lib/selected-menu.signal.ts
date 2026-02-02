import { signal } from "@angular/core";
import { IMenuSelected } from "coer91.angular/interfaces";
export const selectedMenuSIGNAL = signal<IMenuSelected | null>(null);