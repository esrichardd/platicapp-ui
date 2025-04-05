'use client'

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/common/ui/tabs'
import {
  AccountSettingsCard,
  LinkedAccountsCard,
  PasswordChangeCard,
  PersonalInfoCard,
  PreferencesCard,
} from '../organisms'

export function SettingsTemplate() {
  return (
    <main className='flex-1 overflow-auto p-6'>
      <div className='mx-auto max-w-4xl space-y-6'>
        <div className='flex flex-col gap-4 sm:flex-row sm:items-center'>
          <h2 className='text-2xl font-bold tracking-tight'>
            Configuración de Perfil
          </h2>
        </div>

        <Tabs defaultValue='personal' className='w-full'>
          <TabsList className='grid w-full grid-cols-3'>
            <TabsTrigger value='personal'>Personal</TabsTrigger>
            <TabsTrigger value='account'>Cuenta</TabsTrigger>
            <TabsTrigger value='preferences'>Preferencias</TabsTrigger>
          </TabsList>

          <TabsContent value='personal' className='space-y-6 mt-6'>
            <PersonalInfoCard />
          </TabsContent>

          <TabsContent value='account' className='space-y-6 mt-6'>
            <AccountSettingsCard />
            <PasswordChangeCard />
            <LinkedAccountsCard />
          </TabsContent>

          <TabsContent value='preferences' className='space-y-6 mt-6'>
            <PreferencesCard />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
