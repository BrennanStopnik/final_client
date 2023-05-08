import React from 'react'

const SignUpbutton = () => {

  return (
    <button
              className='w-full py-3 mt-8 bg-indigo-600 hover:bg-transparent dark:hover:text-zinc-300 relative text-white rounded-lg'
              onClick={async () => {
                {signUpButton ? 
                const registerResult = await auth.register(email, password);
                if (registerResult.success) {
                  setSignUpButton(false);
                }
                if (!registerResult.success) {
                  setRegisterMessage(registerResult.message);
                }
              }
              }}
            >
              Sign up
            </button>
  )
}

export default SignUpbutton