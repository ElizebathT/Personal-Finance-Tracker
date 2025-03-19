import * as yup from "yup"

const passwordRules = /^(?=(.*[a-z]))(?=(.*[A-Z]))(?=(.*\d))(?=(.*[\W_]))([A-Za-z\d\W_]{5,})$/;

export const basicSchema=yup.object().shape({
    email:yup.string().email("Please enter valid email").required("Required"),
    username:yup.string().min(5).required('Required'),
    password:yup.string().min(5).matches(passwordRules,{message:'Please enter a password with min 5 characters, 1 uppercase letter, 1 lowercase letter and 1 digit'}).required("Required"),
    phone: yup.string()
    .matches(/^\d{10}$/, "Phone number must be 10 digits")
    .required("Required"),
})

export const advSchema=yup.object().shape({
    email:yup.string().email("Please enter valid email").required("Required"),
    password:yup.string().min(5).matches(passwordRules,{message:'Please enter a password with min 5 characters, 1 uppercase letter, 1 lowercase letter and 1 digit'}).required("Required"),
})

export const transactionSchema = yup.object().shape({
    type: yup.string().oneOf(["income", "expense"], "Type must be either 'income' or 'expense'").required("Type is required"),
    amount: yup.number().positive("Amount must be a positive number").required("Amount is required"),
    category: yup.string().min(3, "Category must be at least 3 characters").required("Category is required"),
    date: yup.date().required("Date is required").max(new Date(), "Future dates are not allowed"),
    description: yup.string().max(200, "Description must be at most 200 characters").optional(),
    isRecurring: yup.boolean(),
    recurrenceInterval: yup.string()
        .when("isRecurring", {
            is: true,
            then: (schema) => schema.required("Recurrence interval is required when the transaction is recurring"),
            otherwise: (schema) => schema.notRequired(),
        })
});

export const budgetSchema = yup.object().shape({
    frequency: yup.string()
      .oneOf(["daily", "weekly", "monthly", "yearly"], "Invalid frequency")
      .required("Frequency is required"),
      startDate: yup.date().required("Date is required"),
      category: yup.string()
      .min(3, "Category must be at least 3 characters")
      .required("Category is required"),
    
    limit: yup.number()
      .positive("Limit must be a positive number")
      .required("Budget limit is required"),

    spent: yup.number()
      .positive("Spent must be a positive number")
      .required("Budget spent is required"),
  });

export const savingsSchema = yup.object().shape({
    title: yup.string()
      .min(3, "Title must be at least 3 characters")
      .required("Title is required"),
  
    goalAmount: yup.number()
      .positive("Goal amount must be a positive number")
      .required("Goal amount is required"),

    savedAmount: yup.number()
      .positive("Goal amount must be a positive number"),
  
    targetDate: yup.date()
      .min(new Date(), "Target date must be in the future")
      .required("Target date is required"),
  });