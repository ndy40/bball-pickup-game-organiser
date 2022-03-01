// eslint-disable-next-line import/no-extraneous-dependencies
import tw from 'tailwind-styled-components';

export const Container = tw.div`
w-full max-w-lg mx-auto
`;
export const Text = tw.h2`
text-2xl capitalize text-center mb-1 mt-5
`;
export const Form = tw.form`
   bg-white rounded px-8 pt-6 pb-8 mb-4
`;
export const Input = tw.input`
appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 shadow
`;
export const TextArea = tw.textarea`
resize-none
shadow appearance-none border  bg-gray-200 rounded w-full py-2 px-3 text-gray-700 cursor-pointer leading-tight focus:bg-white focus:border-gray-500 shadow focus:outline-none
`;
export const Label = tw.label`
block capitalize tracking-wide text-gray-700 text-xs font-bold mb-2
`;
export const FormGroup = tw.div`
mb-4
`;
export const Error = tw.span`
text-red-500 text-xs italic
`;
export const Button = tw.button`
w-full bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none
`;
