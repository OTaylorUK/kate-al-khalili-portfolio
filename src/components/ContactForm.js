import React, { createRef, useState } from 'react'
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import emailjs from '@emailjs/browser';
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios"

export const ContactForm = () => {

	const TEST_SITE_KEY = "6Lc6-HkeAAAAAJpjjH9hvayzElY-9znIs3_vBTvx";
	const TEST_SECRET_KEY = "6Lc6-HkeAAAAAIqfSVbFuAaro299sQOepC76_wDE"
	const SignupSchema = Yup.object().shape({
		from_name: Yup.string()
			.min(2, 'Too Short!')
			.max(50, 'Too Long!')
			.required('Required'),
		message: Yup.string()
			.required('Required'),
		gdpr: Yup.boolean()
		.oneOf([true],'You must agree to GDPR policy in order to submit your message'),
		email: Yup.string()
			.email('Invalid email')
			.required('Required'),
	 
	});

	const [buttonState, setButtonState] = useState('Send Message');
	const [formSubmitted, setFormSubmitted] = useState(false);
	const [formErrors, setFormErrors] = useState(false);

	
	const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
	const recaptchaRef = createRef();
	
  return (
	<>
		  <Formik
			initialValues={{
				to_name: 'Kate',
				from_name: '',
				email: '',
				gdpr: false,
				message: '',
			}}
			validationSchema={SignupSchema}
			  
			onSubmit={ async (values,actions) => {
				await sleep(500);

				const token = await recaptchaRef.current.executeAsync();


				await axios({
					method: "POST",
					url: "/api/test",
					data: {
						secretkey: TEST_SECRET_KEY,
						token: token
					},
					withCredentials: false
				  }).then((response) => {
					//response from your API that includes the NASA API image

					  if (response.data.success) {
						emailjs.send("service_5qfjjtl", "template_u77tluc", values, "user_NvFpXyP3FJUdr3jrwgJpj")
						.then((result) => {
							setButtonState('Submission received');
							setFormSubmitted(true)
							actions.resetForm();
						}, (error) => {
							setFormErrors(true)
						});
								
					  } else {
						alert('failed')
					  }
				  })
				
			}}
			  
			  
			  
		  >
			  {(props) => {

				  	const outputError = (selector, props) => {
						const { errors, touched } = props;
						
						if (errors[selector] && touched[selector]) {
							return (
								<div className='error-msg'>{errors[selector]}</div>
							)	
						} else {
							return null;
						}
						
					}
				  
					const errorClass = (selector, props) => {
						const { errors, touched } = props;
						
						if (errors[selector] && touched[selector]) {
							return ' field-error '
						} else {
							return '';
						}
						
					}
				  
					const outputCheckbox = (value) => {
						if (value) {
							return (
								<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path fillRule="evenodd" clipRule="evenodd" d="M11.3905 5.31244L7.0718 10.7108L3.67993 7.8842L4.32012 7.11598L6.92825 9.28942L10.6096 4.68774L11.3905 5.31244Z" fill="black"/>
								</svg>
							)	
						} else {
							return (
								<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path fillRule="evenodd" clipRule="evenodd" d="M6.79281 7.50016L4.76172 5.46907L5.46883 4.76196L7.49992 6.79305L9.53101 4.76196L10.2381 5.46907L8.20702 7.50016L10.2381 9.53125L9.53101 10.2384L7.49992 8.20727L5.46883 10.2384L4.76172 9.53125L6.79281 7.50016Z" fill="black"/>
								</svg>

							)	
						}
						
					}
				  const displayError = (formErrors) => {
					  if (formErrors) {
						return (
							<div className='form-message-main error-message'>
								<h1>Form submission failed</h1>
								<p>It looks like something went wrong. Please try again or contact me directly <a href="mailto:hello@kateal-khalili.co.uk">hello@kateal-khalili.co.uk</a></p>
							</div>
						)	
					} 
					}
					
				  
				  if (formSubmitted) {
					  return (
						  <div className='form-message-main success-message'>
							<h1>Form submission received</h1>
							<p>Thank you for getting in touch, I'll do my best to reply to your enquiry within 48 hours.</p>
						  </div>
					  )
				  }
				  
				  return (
					<>
						{displayError(formErrors)}
						<Form  className="contact-form">
							<div className={`field-group ${errorClass('from_name',props)}`}>
								<label htmlFor="from_name">Name</label>
								<Field id="from_name" name="from_name" placeholder="Your name" />
								{outputError('from_name',props)}
							</div>
							
							<div className={`field-group ${errorClass('email',props)}`}>
								<label htmlFor="email">Email address</label>
								<Field
								id="email"
								name="email"
								placeholder="Your email address"
								type="email"
								/>
								{outputError('email',props)}

							</div>
							
							<div className={`field-group full ${errorClass('message',props)}`}>

								<label htmlFor="message">Message</label>
								<Field
								id="message"
								name="message"
								placeholder="Your reason for getting in touch"
								as="textarea"
								/>
								{outputError('message',props)}
							</div>
							
							<div className={`field-group full ${errorClass('gdpr',props)}`}>

								<div className='label' >GDPR</div>
								<label className="field-wrapper gdpr" htmlFor="gdpr">
									<Field
										id="gdpr"
										name="gdpr"
										type="checkbox"
									/>
									<div className="styled-input">{outputCheckbox(props.values.gdpr)}</div>
									<div className='label' >I agree to the data entered in this form to be stored and used by the owner of this website.</div>
								</label>
								
									{outputError('gdpr',props)}
								</div>
							
							<div className="field-group full">
								<ReCAPTCHA
									ref={recaptchaRef}
									sitekey={TEST_SITE_KEY}
									size="invisible"
								/>
								<button className='submit-btn' disabled={props.isSubmitting} type="submit">{buttonState}</button>
							</div>
						</Form>
					</>
						  
				  )
			  }}
		</Formik>
	</>
  )
}
