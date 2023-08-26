import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { InformationCircleIcon } from '@heroicons/react/24/outline'
import { useParams, Link } from "react-router-dom";

export default function ModalOfertasPublicas({setShowModal }) {

  const setRedirect = () =>{

  }
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-11/12 sm:w-1/2 lg:w-2/5 my-6 mx-auto max-w-7xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
           
            {/*body*/}
            <div className='my-4 mx-4'>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    <InformationCircleIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <h3 className="text-base font-semibold leading-6 text-gray-900">
                      Paso a paso para postularte
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-700 text-left">
                        <span className='font-bold'>1.</span><a href='/' className='underline cursor-pointer text-blue-700'>Inicia sesión,</a> sino tienes cuenta, presiona crear cuenta y sigue los pasos(Ten en cuenta que debes tener acceso al correo que registres )
                        
                      </p>
                      <p className="text-sm text-gray-700 text-left">
                       
                      <span className='font-bold'>2.</span> Diligencia tu Hoja de Vida.
                        
                      </p>
                      <p className="text-sm text-gray-700 text-left">
                       
                      <span className='font-bold'>3.</span> Se habilita la opcion de ofertas de empleo y podras postularte en la que mas se ajuste a tu perfil
                      </p>
                    </div>
                  </div>
                </div>
                <div className="my-5 sm:my-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3 mx-8">
                  <Link
                    to="/registrar"
                    className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                    
                  >
                    Crea tu cuenta
                  </Link>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                    onClick={() => setShowModal(false)}
                  
                  >
                    Cancelar
                  </button>
                </div>
            {/*footer*/}
           
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
