"use client"
import { useModals } from '@/stores/modal'
import React from 'react'
import RegisterModal from './auth/register'
import SignInModal from './auth/sign-in'
import ForgotPassword from './auth/forgot-password'
import AddWatchListModal from './watchlist/add-watchlist'
import ManageWatchListModal from './watchlist/manage-watchlist'
import AddStockModal from './stock/add-stock'

const Modals = () => {
    const { register, signIn, forgotPassword, addWatchList, manageWatchList, addStock } = useModals()
    return (
        <>
            {register && < RegisterModal />}
            {signIn && <SignInModal />}
            {forgotPassword && <ForgotPassword />}
            {addWatchList && <AddWatchListModal />}
            {manageWatchList && <ManageWatchListModal />}
            {addStock && <AddStockModal />}
        </>
    )
}

export default Modals