import { InputHTMLAttributes } from "react";

export default interface CustomInputType extends InputHTMLAttributes<HTMLInputElement>{
    label?: string
    imagesource?: string
}