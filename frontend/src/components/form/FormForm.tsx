import {useCallback} from 'react';
import {useForm} from "react-hook-form";
import {yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import {useSelector} from 'react-redux'
import {selectToken} from '../../features/auth/authSlice'
import {CheckAvailabilityResponse, ApiForm} from '../../types';
import {get, put, post} from '../../authenticated-fetch'
import {toast} from 'react-toastify';

type Properties = {
  goToTable: () => void,
  goToView: (arg0: ApiForm) => void,
  formToBeEdited: ApiForm | null
}

const schema = yup.object({
  name: yup.string().required(),
  slug: yup.string().required(),
}).required();

export default function UserForm({ goToTable, goToView, formToBeEdited }: Properties) {
  const token = useSelector(selectToken)

  const { register, handleSubmit, formState:{ errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: formToBeEdited?.name || '',
      slug: formToBeEdited?.slug || '',
    }
  });

  const onSubmit = useCallback((data: { name: string, slug: string }) => {
    get<CheckAvailabilityResponse>(`/api/forms/check-name/${formToBeEdited?.id || 0}/${data.name}`, token).then((resp) => {
      if(resp.available) {
        get<CheckAvailabilityResponse>(`/api/forms/check-slug/${formToBeEdited?.id || 0}/${data.slug}`, token).then((resp) => {
          if(resp.available) {
            if(formToBeEdited) {
              formToBeEdited.name = data.name;
              formToBeEdited.slug = data.slug;
              put('/api/forms/', formToBeEdited, token).then(() => {
                toast.success("Form Updated");
                goToTable();
              });
            } else {
              post('/api/forms/', {
                name: data.name,
                slug: data.slug,
              }, token).then(() => {
                toast.success("Form Created");
                goToTable();
              });
            }
          } else {
            toast.error("This slug is not available");
          }
        });
      } else {
        toast.error("This name is not available");
      }
    });
  }, [goToTable, token, formToBeEdited]);

  return (
    <>
      <form className="grid grid-cols-1" onSubmit={handleSubmit(onSubmit)}>
        <div className="py-1.5">
          <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
            Name
          </label>
          <div className="mt-2">
            <input
              {...register("name")}
              type="text"
              required
              className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <p className="text-red-600">{errors.name?.message}</p>
          </div>
        </div>
        <div className="py-1.5">
          <label htmlFor="slug" className="block text-sm font-medium leading-6 text-gray-900">
            Slug
          </label>
          <div className="mt-2">
            <input
              {...register("slug")}
              type="text"
              required
              className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <p className="text-red-600">{errors.slug?.message}</p>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          {
            (formToBeEdited?.id || -1) >= 0 ? (
              <button type="button" className="text-sm font-semibold leading-6 text-gray-900" onClick={() => goToView(formToBeEdited || {} as ApiForm)}>
                View Submissions
              </button>
            ) : (
              <></>
            )
          }
          <button type="button" className="text-sm font-semibold leading-6 text-gray-900" onClick={() => goToTable()}>
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
            Save
          </button>
        </div>
      </form>
    </>
  )
}