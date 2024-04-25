import * as yup from 'yup'

export default yup.object({
  name: yup.string().min(4).required().label('Name'),
  year_of_release: yup
    .string()
    .matches(/^\d{4}$/, 'Year must be four digits')
    .required()
    .label('Year of release'),
  category: yup.number().required().label('Category'),
  description: yup.string().nullable().label('Description'),
  price: yup.number().required().label('Price'),
  created_at: yup.date().default(() => new Date()),
  hide: yup.boolean(),
  image: yup.string().default('Shri lanka').nullable()
})
