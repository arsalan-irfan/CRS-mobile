import React from 'react'
import { Snackbar } from 'react-native-paper'
import { connect } from 'react-redux';
import { hideSnackbar } from '../actions/snackbarActions'

function SellerSnackbar({ showSnackbar, snackbarMessage, hideSnackbar }) {
    return (
        <Snackbar
            visible={showSnackbar}
            onDismiss={hideSnackbar}
            duration={5000}
        >
            {snackbarMessage}
        </Snackbar>
    )
}
const mapStateToProps = state => ({
    showSnackbar: state.snackbarReducer.showSnackbar,
    snackbarMessage: state.snackbarReducer.snackbarMessage
})
export default connect(mapStateToProps, { hideSnackbar })(SellerSnackbar)