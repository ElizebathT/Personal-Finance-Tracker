import * as yup from "yup"

const passwordRules = /^(?=(.*[a-z]))(?=(.*[A-Z]))(?=(.*\d))(?=(.*[\W_]))([A-Za-z\d\W_]{5,})$/;

export const basicSchema=yup.object().shape({
    email:yup.string().email("Please enter valid email").required("Required"),
    username:yup.string().min(5).required('Required'),
    password:yup.string().min(5).matches(passwordRules,{message:'Please enter a password with min 5 characters, 1 uppercase letter, 1 lowercase letter and 1 digit'}).required("Required"),
  
})

export const advSchema=yup.object().shape({
    email:yup.string().email("Please enter valid email").required("Required"),
    password:yup.string().min(5).matches(passwordRules,{message:'Please enter a password with min 5 characters, 1 uppercase letter, 1 lowercase letter and 1 digit'}).required("Required"),
})

export const transactionSchema = yup.object().shape({
    type: yup.string().oneOf(["income", "expense"], "Type must be either 'income' or 'expense'").required("Type is required"),
    amount: yup.number().positive("Amount must be a positive number").required("Amount is required"),
    category: yup.string().min(3, "Category must be at least 3 characters").required("Category is required"),
    date: yup.date().required("Date is required"),
    description: yup.string().max(200, "Description must be at most 200 characters").optional(),
    isRecurring: yup.boolean(),
    recurrenceInterval: yup.string()
        .when("isRecurring", {
            is: true,
            then: (schema) => schema.required("Recurrence interval is required when the transaction is recurring"),
            otherwise: (schema) => schema.notRequired(),
        })
});