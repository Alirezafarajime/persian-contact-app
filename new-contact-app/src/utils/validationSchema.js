 import * as yup from 'yup';

    export const contactSchema = yup.object().shape({
        name: yup.string()
            .required("وارد کردن نام الزامی است.")
            .min(3, "نام باید حداقل ۳ کاراکتر باشد."),
        
        email: yup.string()
            .email("فرمت ایمیل نامعتبر است.")
            .required("وارد کردن ایمیل الزامی است."),
    });
