import {useState} from 'react';
import {useSelector} from 'react-redux'
import {selectToken} from '../../features/auth/authSlice'
import {get} from '../../authenticated-fetch'
import {TwoFactorOption} from '../../dto';
import {Pageable} from '../base/Table';
import Table from '../base/Table';

type Properties = {
  goToAdd: () => void,
  goToDelete: (arg0: TwoFactorOption) => void
}

export default function ManageMFA({ goToAdd, goToDelete }: Properties) {
  const token = useSelector(selectToken)

  const doSearch = (search: string, page: number, itemsPerPage: number) => {
    return new Promise<Pageable<TwoFactorOption>>((resolve, reject) => {
      get<TwoFactorOption[]>('/api/settings/mfa', token).then((data) => {
        resolve({
          results: data,
          total: data.length
        })
      })
    });
  }
  
  return (
    <>
      <Table
        entityType="MFA"
        description="Multi-Factor authentication (MFA) is an extra layer of security used when logging into websites or apps. With MFA, you must log in with your username and password and provide another form of authentication that only you know or have access to."
        doSearch={doSearch}
        getIdentity={(x) => `${x.id}`}
        goToAdd={goToAdd}
        perPage={-1}
        columns={[{
          name: "Name",
          getValue: (e) => e.nickname
        }, {
          name: "Type",
          getValue: (e) => `${e.twoFactorType}`
        }, {
          name: "Target",
          getValue: (e) => e.target
        }]}
        actions={[{
          name: "Delete",
          performAction: (e) => goToDelete(e)
        }]}
      />
    </>
  )
}