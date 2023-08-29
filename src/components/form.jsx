import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import './form.css'

const Form = () => {

    const schema = yup.object().shape({
        fullName: yup.string().required('Your Full Name is Required'),
        email: yup.string().email().required('Your email is Required'),
        age: yup.number().positive().integer().min(18).required(),
        password: yup.string().min(4).max(20).required('Your password is required'),
        confirmPassword: yup.string().oneOf([yup.ref('password'), null]).required('Password did not match'),
    })

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        console.log(data)
    }

    return(
        <form onSubmit={handleSubmit(onSubmit)}>
        <h4>Your Full Name</h4>
        <input type="text" placeholder="Full Name" {...register('fullName')}/>
        <p>{errors.fullName?.message}</p>
        <h4 className='email'>Your Email</h4>
        <input type="email" placeholder="Email" {...register('email')}/>
        <p>{errors.email?.message}</p>
        <h4 className='age'>Your Ages</h4>
        <input type="number" placeholder="Age" {...register('age')}/>
        <p>{errors.age?.message}</p>
        <h4>Your password</h4>
        <input type="password" placeholder="password" {...register('password')}/>
        <p>{errors.password?.message}</p>
        <h4 className='confirmPass'>Confirm Your password</h4>
        <input type="password" placeholder="confirmPassword"{...register('confirmPassword')}/>
        <p>{errors.confirmPassword?.message}</p>
        <text>Not registered yet? <a href='#'>Create an account</a></text>
        <input type='submit' className='submit-btn'/>
        </form>
    )
}

export default Form;