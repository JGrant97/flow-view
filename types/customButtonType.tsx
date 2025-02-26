import { StylePreset } from "@/enums/stylePreset";
import { ButtonHTMLAttributes, ReactNode } from "react";

export default interface CustomButtonType extends ButtonHTMLAttributes<HTMLButtonElement>{
    children: ReactNode,
    stylepreset?: StylePreset
}