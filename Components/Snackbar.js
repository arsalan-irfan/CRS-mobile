import React from 'react'
import { Snackbar } from 'react-native-paper'
import { connect } from 'react-redux';
import { hideSnackbar } from '../actions/snackbarActions'

function SellerSnackbar({ sellerSnackbar, snackbarMessage, hideSellerSnackbar }) {
    return (
        <Snackbar
            visible={sellerSnackbar}
            onDismiss={hideSellerSnackbar}
            duration={5000}
        >
            {snackbarMessage}
        </Snackbar>
    )
}
const mapStateToProps = state => ({
    sellerSnackbar: state.snackbarReducer.sellerSnackbar,
    snackbarMessage: state.snackbarReducer.sellerMessage
})
export default connect(mapStateToProps, { hideSellerSnackbar })(SellerSnackbar)